/**
 * Treat a thin-line mask (ink pixels) as an 8-connected graph and trace along chains to build a single-stroke path.
 * Does not use TSP on the pixel set.
 */

import {
  distanceMatrix,
  nearestNeighbourOrder,
  nearestNeighbourOrderFromPoints,
  twoOpt,
  TSP_DISTANCE_MATRIX_MAX_POINTS,
} from './tsp.js';
import { MinHeapF } from './minHeap.js';

/** Default expansion limit for bridge A* (capped to prevent freezing at high resolutions where width × height × 4 would be too large) */
const DEFAULT_MAX_BRIDGE_EXPANSIONS = 750_000;

/** When the number of chains exceeds this, 2-opt is skipped due to O(m²) cost (nearest-neighbor only) */
const MAX_CHAINS_FOR_TWO_OPT = 400;

const DX = [-1, 0, 1, -1, 1, -1, 0, 1];
const DY = [-1, -1, -1, 0, 0, 1, 1, 1];

/**
 * @param {number} i
 * @param {number} w
 * @returns {{ x: number, y: number }}
 */
function fromIdx(i, w) {
  return { x: i % w, y: (i / w) | 0 };
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @returns {number}
 */
function toIdx(x, y, w) {
  return y * w + x;
}

/**
 * @param {number} i
 * @param {number} w
 * @param {number} h
 * @param {Uint8ClampedArray} mask
 * @returns {number[]}
 */
function neighbors8(i, w, h, mask) {
  const { x, y } = fromIdx(i, w);
  const out = [];
  for (let k = 0; k < 8; k++) {
    const nx = x + DX[k];
    const ny = y + DY[k];
    if (nx >= 0 && nx < w && ny >= 0 && ny < h && mask[ny * w + nx] > 0) {
      out.push(ny * w + nx);
    }
  }
  return out;
}

/**
 * @param {number} i
 * @param {number} j
 * @returns {string}
 */
function edgeKey(i, j) {
  return i < j ? `${i}_${j}` : `${j}_${i}`;
}

/**
 * @param {number} i
 * @param {number} w
 * @param {number} h
 * @param {Uint8ClampedArray} mask
 * @returns {number}
 */
function degree8(i, w, h, mask) {
  return neighbors8(i, w, h, mask).length;
}

/**
 * At a degree-2 vertex, advance to the neighbor other than prev. Returns -1 when degree is not 2 or no neighbor is found.
 * @param {number} prev
 * @param {number} cur
 * @param {number} w
 * @param {number} h
 * @param {Uint8ClampedArray} mask
 * @returns {number}
 */
function pickNextDegree2(prev, cur, w, h, mask) {
  if (degree8(cur, w, h, mask) !== 2) return -1;
  const nbList = neighbors8(cur, w, h, mask);
  for (const nb of nbList) {
    if (nb !== prev) return nb;
  }
  return -1;
}

/**
 * @param {number[][]} chain
 * @returns {number}
 */
function chainArcLength(chain) {
  if (chain.length < 2) return 0;
  let L = 0;
  for (let i = 1; i < chain.length; i++) {
    const dx = chain[i][0] - chain[i - 1][0];
    const dy = chain[i][1] - chain[i - 1][1];
    L += Math.hypot(dx, dy);
  }
  return L;
}

/**
 * @param {number[][]} chain
 * @returns {number[]}
 */
function chainCentroid(chain) {
  let sx = 0;
  let sy = 0;
  for (let i = 0; i < chain.length; i++) {
    sx += chain[i][0];
    sy += chain[i][1];
  }
  const n = chain.length;
  return [sx / n, sy / n];
}

/**
 * 8-connected A* through non-ink pixels. Only the two endpoint pixels are allowed to be ink. Returns null on failure.
 * @param {Uint8ClampedArray} mask
 * @param {number} w
 * @param {number} h
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 * @param {number} maxSteps
 * @returns {number[][]|null}
 */
function bridgeAlongBackground(mask, w, h, ax, ay, bx, by, maxSteps) {
  const sx = Math.max(0, Math.min(w - 1, Math.round(ax)));
  const sy = Math.max(0, Math.min(h - 1, Math.round(ay)));
  const gx = Math.max(0, Math.min(w - 1, Math.round(bx)));
  const gy = Math.max(0, Math.min(h - 1, Math.round(by)));
  if (sx === gx && sy === gy) return [];

  /**
   * @param {number} x
   * @param {number} y
   */
  function walkable(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return false;
    if (x === sx && y === sy) return true;
    if (x === gx && y === gy) return true;
    return mask[y * w + x] === 0;
  }

  const startKey = sy * w + sx;

  /** @type {Map<number, number>} */
  const cameFrom = new Map();
  /** @type {Map<number, number>} */
  const gScore = new Map();
  const open = new MinHeapF();

  /**
   * @param {number} x
   * @param {number} y
   */
  function heur(x, y) {
    return Math.hypot(gx - x, gy - y);
  }

  gScore.set(startKey, 0);
  open.push({ x: sx, y: sy, f: heur(sx, sy), g: 0 });

  let expanded = 0;
  while (open.length > 0 && expanded < maxSteps) {
    const cur = open.pop();
    if (!cur) break;
    const { x, y, g } = cur;
    const ckey = y * w + x;
    const knownG = gScore.get(ckey);
    if (knownG !== undefined && g > knownG + 1e-9) continue;
    expanded++;
    if (x === gx && y === gy) {
      const pathIdx = [];
      let k = ckey;
      while (k !== undefined) {
        pathIdx.push(k);
        if (k === startKey) break;
        k = cameFrom.get(k);
      }
      pathIdx.reverse();
      const out = pathIdx.map((idx) => {
        const p = fromIdx(idx, w);
        return [p.x, p.y];
      });
      if (out.length >= 2) return out.slice(1, -1);
      return [];
    }
    for (let di = 0; di < 8; di++) {
      const nx = x + DX[di];
      const ny = y + DY[di];
      if (!walkable(nx, ny)) continue;
      const stepCost = di < 4 ? 1 : Math.SQRT2;
      const tentativeG = g + stepCost;
      const nkey = ny * w + nx;
      const prevG = gScore.get(nkey);
      if (prevG !== undefined && tentativeG >= prevG) continue;
      cameFrom.set(nkey, ckey);
      gScore.set(nkey, tentativeG);
      open.push({ x: nx, y: ny, g: tentativeG, f: tentativeG + heur(nx, ny) });
    }
  }
  return null;
}

/**
 * 8-connected BFS through ink pixels only. Connects endpoints within the same connected component 'along the line' (avoids crossing white space inside loops as a chord).
 * @param {Uint8ClampedArray} mask
 * @param {number} w
 * @param {number} h
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 * @param {number} maxSteps
 * @returns {number[][]|null}
 */
function bridgeAlongInk(mask, w, h, ax, ay, bx, by, maxSteps) {
  const sx = Math.max(0, Math.min(w - 1, Math.round(ax)));
  const sy = Math.max(0, Math.min(h - 1, Math.round(ay)));
  const gx = Math.max(0, Math.min(w - 1, Math.round(bx)));
  const gy = Math.max(0, Math.min(h - 1, Math.round(by)));
  if (sx === gx && sy === gy) return [];
  const sKey = sy * w + sx;
  const gKey = gy * w + gx;
  if (mask[sKey] === 0 || mask[gKey] === 0) return null;

  /** @type {Map<number, number>} */
  const cameFrom = new Map();
  const queue = [];
  let qi = 0;
  queue.push(sKey);
  const visited = new Uint8Array(w * h);
  visited[sKey] = 1;
  let expanded = 0;

  while (qi < queue.length && expanded < maxSteps) {
    const ckey = queue[qi++];
    expanded++;
    if (ckey === gKey) {
      const pathIdx = [];
      let k = ckey;
      while (k !== undefined) {
        pathIdx.push(k);
        if (k === sKey) break;
        k = cameFrom.get(k);
      }
      pathIdx.reverse();
      const out = pathIdx.map((idx) => {
        const p = fromIdx(idx, w);
        return [p.x, p.y];
      });
      if (out.length >= 2) return out.slice(1, -1);
      return [];
    }
    const { x, y } = fromIdx(ckey, w);
    for (let di = 0; di < 8; di++) {
      const nx = x + DX[di];
      const ny = y + DY[di];
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const nkey = ny * w + nx;
      if (visited[nkey]) continue;
      if (mask[nkey] === 0) continue;
      visited[nkey] = 1;
      cameFrom.set(nkey, ckey);
      queue.push(nkey);
    }
  }
  return null;
}

/**
 * @param {number[]} a
 * @param {number[]} b
 * @param {number} width
 * @param {number} height
 * @param {Uint8ClampedArray} mask
 * @param {{ bridgeMode?: string, maxBridgeSteps?: number }} opts
 * @returns {number[][]}
 */
function makeBridge(a, b, width, height, mask, opts) {
  const bridgeMode = opts.bridgeMode ?? 'avoidInk';
  const maxBridgeSteps =
    opts.maxBridgeSteps ?? Math.min(width * height * 4, DEFAULT_MAX_BRIDGE_EXPANSIONS);
  if (bridgeMode === 'straight') {
    return bridgeSegment(a, b, width, height);
  }
  const alongInk = bridgeAlongInk(mask, width, height, a[0], a[1], b[0], b[1], maxBridgeSteps);
  if (alongInk != null) {
    return alongInk;
  }
  const avoid = bridgeAlongBackground(mask, width, height, a[0], a[1], b[0], b[1], maxBridgeSteps);
  if (avoid != null) {
    return avoid;
  }
  return bridgeSegment(a, b, width, height);
}

/**
 * Sort chains by arc length, determine visit order via centroid NN + 2-opt, and connect with bridges.
 * @param {number[][][]} chains
 * @param {number} width
 * @param {number} height
 * @param {Uint8ClampedArray} mask
 * @param {{ bridgeMode?: string, maxBridgeSteps?: number }} [options]
 * @returns {number[][]}
 */
function orderChainsAndBridge(chains, width, height, mask, options = {}) {
  const valid = chains.filter((c) => c && c.length > 0);
  if (valid.length === 0) return [];
  if (valid.length === 1) return valid[0];

  const sorted = valid.slice().sort((a, b) => chainArcLength(b) - chainArcLength(a));
  const m = sorted.length;
  const centroids = sorted.map(chainCentroid);
  let perm;
  if (m > TSP_DISTANCE_MATRIX_MAX_POINTS) {
    perm = nearestNeighbourOrderFromPoints(centroids, 0);
  } else {
    const D = distanceMatrix(centroids);
    perm = nearestNeighbourOrder(D, 0);
    if (m >= 4 && m <= MAX_CHAINS_FOR_TWO_OPT) {
      const { order: improved } = twoOpt(D, perm, { maxSteps: 5000 });
      perm = improved;
    }
  }
  const pos = perm.indexOf(0);
  if (pos > 0) {
    perm = perm.slice(pos).concat(perm.slice(0, pos));
  }

  const ordered = [];
  let currentEnd = null;
  const bridgeOpts = { bridgeMode: options.bridgeMode, maxBridgeSteps: options.maxBridgeSteps };

  for (let t = 0; t < perm.length; t++) {
    let ch = sorted[perm[t]].map((p) => [p[0], p[1]]);
    if (t === 0) {
      ordered.push(ch);
      currentEnd = ch[ch.length - 1];
      continue;
    }
    const d0 = Math.hypot(currentEnd[0] - ch[0][0], currentEnd[1] - ch[0][1]);
    const d1 = Math.hypot(currentEnd[0] - ch[ch.length - 1][0], currentEnd[1] - ch[ch.length - 1][1]);
    if (d1 < d0) ch.reverse();
    const br = makeBridge(currentEnd, ch[0], width, height, mask, bridgeOpts);
    ordered.push(br);
    ordered.push(ch);
    currentEnd = ch[ch.length - 1];
  }

  const flat = [];
  for (const part of ordered) {
    for (const p of part) flat.push(p);
  }

  return flat;
}

/**
 * @param {number[]} a
 * @param {number[]} b
 * @param {number} width
 * @param {number} height
 * @returns {number[][]}
 */
function bridgeSegment(a, b, width, height) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const d = Math.hypot(dx, dy);
  if (d < 1e-9) return [];
  const maxSeg = 24;
  const n = Math.min(maxSeg, Math.max(2, Math.ceil(d / 4)));
  const out = [];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    out.push([a[0] + dx * t, a[1] + dy * t]);
  }
  return out;
}

/**
 * @param {number[][]} path
 * @param {number} maxPoints
 * @returns {number[][]}
 */
export function resamplePathByArcLength(path, maxPoints) {
  if (!path || path.length === 0) return [];
  if (path.length === 1 || maxPoints < 2) return path;
  if (path.length <= maxPoints) return path;

  const segLen = [];
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    const dx = path[i][0] - path[i - 1][0];
    const dy = path[i][1] - path[i - 1][1];
    segLen.push(Math.hypot(dx, dy));
    total += segLen[segLen.length - 1];
  }
  if (total < 1e-12) return [[path[0][0], path[0][1]]];

  const result = [];
  for (let k = 0; k < maxPoints; k++) {
    const target = (k / (maxPoints - 1)) * total;
    if (k === 0) {
      result.push([path[0][0], path[0][1]]);
      continue;
    }
    if (k === maxPoints - 1) {
      result.push([path[path.length - 1][0], path[path.length - 1][1]]);
      continue;
    }
    let acc = 0;
    for (let i = 0; i < segLen.length; i++) {
      if (acc + segLen[i] >= target) {
        const t = segLen[i] < 1e-12 ? 0 : (target - acc) / segLen[i];
        const x = path[i][0] + t * (path[i + 1][0] - path[i][0]);
        const y = path[i][1] + t * (path[i + 1][1] - path[i][1]);
        result.push([x, y]);
        break;
      }
      acc += segLen[i];
    }
  }
  return result;
}

/**
 * @param {number} s
 * @param {number} n
 * @param {number} w
 * @param {number} h
 * @param {Uint8ClampedArray} mask
 * @param {Set<string>} edgeVisited
 * @param {number} maxSteps
 * @returns {number[][]|null}
 */
function walkChainFrom(s, n, w, h, mask, edgeVisited, maxSteps) {
  const ek = edgeKey(s, n);
  if (edgeVisited.has(ek)) return null;
  const { x: sx, y: sy } = fromIdx(s, w);
  const path = [[sx, sy]];
  const start = s;
  let prev = s;
  let cur = n;
  let steps = 0;
  while (steps++ < maxSteps) {
    edgeVisited.add(edgeKey(prev, cur));
    if (cur === start && path.length > 1) break;
    const { x: cx, y: cy } = fromIdx(cur, w);
    path.push([cx, cy]);
    const next = pickNextDegree2(prev, cur, w, h, mask);
    if (next < 0) break;
    prev = cur;
    cur = next;
  }
  return path;
}

/**
 * @param {number} startIdx
 * @param {number} w
 * @param {number} h
 * @param {Uint8ClampedArray} mask
 * @param {Set<string>} edgeVisited
 * @param {number} maxSteps
 * @returns {number[][]}
 */
function extractCycle(startIdx, w, h, mask, edgeVisited, maxSteps) {
  const { x: x0, y: y0 } = fromIdx(startIdx, w);
  const nbs = neighbors8(startIdx, w, h, mask);
  if (nbs.length === 0) return [[x0, y0]];
  let n1 = nbs[0];
  for (const nb of nbs) {
    if (!edgeVisited.has(edgeKey(startIdx, nb))) {
      n1 = nb;
      break;
    }
  }
  const path = [[x0, y0]];
  let prev = startIdx;
  let cur = n1;
  let steps = 0;
  while (steps++ < maxSteps) {
    edgeVisited.add(edgeKey(prev, cur));
    if (cur === startIdx && path.length > 1) break;
    const { x: cx, y: cy } = fromIdx(cur, w);
    path.push([cx, cy]);
    const next = pickNextDegree2(prev, cur, w, h, mask);
    if (next < 0) break;
    prev = cur;
    cur = next;
  }
  return path;
}

/**
 * Extract chains from a connected component
 * @param {Set<number>} comp
 * @param {number} w
 * @param {number} h
 * @param {Uint8ClampedArray} mask
 * @returns {number[][][]}
 */
function chainsFromComponent(comp, w, h, mask) {
  const edgeVisited = new Set();
  const chains = [];
  const maxSteps = comp.size * 8 + 64;
  const compArr = Array.from(comp);

  if (comp.size === 1) {
    const i = compArr[0];
    const { x, y } = fromIdx(i, w);
    return [[[x, y]]];
  }

  const special = [];
  for (const i of comp) {
    const d = degree8(i, w, h, mask);
    if (d !== 2) special.push(i);
  }

  if (special.length === 0) {
    const start = compArr.reduce((a, b) => (a < b ? a : b));
    chains.push(extractCycle(start, w, h, mask, edgeVisited, maxSteps));
    return chains;
  }

  for (const s of special) {
    for (const nb of neighbors8(s, w, h, mask)) {
      if (!comp.has(nb)) continue;
      if (edgeVisited.has(edgeKey(s, nb))) continue;
      const ch = walkChainFrom(s, nb, w, h, mask, edgeVisited, maxSteps);
      if (ch && ch.length > 0) chains.push(ch);
    }
  }

  for (const i of comp) {
    for (const nb of neighbors8(i, w, h, mask)) {
      if (nb < i || !comp.has(nb)) continue;
      if (edgeVisited.has(edgeKey(i, nb))) continue;
      const d1 = degree8(i, w, h, mask);
      const d2 = degree8(nb, w, h, mask);
      if (d1 === 2 && d2 === 2) {
        chains.push(extractCycle(i, w, h, mask, edgeVisited, maxSteps));
      } else {
        const ch = walkChainFrom(i, nb, w, h, mask, edgeVisited, maxSteps);
        if (ch && ch.length > 0) chains.push(ch);
      }
    }
  }

  return chains;
}

/**
 * @param {Uint8ClampedArray} mask
 * @param {number} w
 * @param {number} h
 * @returns {Set<number>[]}
 */
function connectedComponents(mask, w, h) {
  const seen = new Uint8Array(w * h);
  const components = [];
  for (let i = 0; i < w * h; i++) {
    if (mask[i] === 0 || seen[i]) continue;
    const comp = new Set();
    const stack = [i];
    seen[i] = 1;
    while (stack.length > 0) {
      const cur = stack.pop();
      comp.add(cur);
      for (const nb of neighbors8(cur, w, h, mask)) {
        if (!seen[nb]) {
          seen[nb] = 1;
          stack.push(nb);
        }
      }
    }
    components.push(comp);
  }
  return components;
}

/**
 * Generate a single-stroke path (in image coordinates) from a thin-line mask
 * @param {Uint8ClampedArray} mask - width × height, line pixels are non-zero
 * @param {number} width
 * @param {number} height
 * @param {number} maxPoints
 * @param {{ bridgeMode?: 'avoidInk'|'straight', maxBridgeSteps?: number }} [options]
 * @returns {number[][]}
 */
export function pathFromThinMask(mask, width, height, maxPoints, options = {}) {
  const w = width;
  const h = height;
  const comps = connectedComponents(mask, w, h);
  const allChains = [];
  for (const comp of comps) {
    const chs = chainsFromComponent(comp, w, h, mask);
    for (const c of chs) {
      if (c && c.length > 0) allChains.push(c);
    }
  }
  if (allChains.length === 0) return [];
  const merged = orderChainsAndBridge(allChains, w, h, mask, options);
  const cap = maxPoints ?? 1500;
  return resamplePathByArcLength(merged, cap);
}
