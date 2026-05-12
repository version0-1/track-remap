(() => {
  // src/image-to-path/preprocess.js
  function lumaFromRgb(r, g, b, mode) {
    if (mode === "max" || mode === "hsvV") {
      return Math.max(r, g, b) | 0;
    }
    return 0.299 * r + 0.587 * g + 0.114 * b | 0;
  }
  function applyGamma(gray, width, height, gamma) {
    if (gamma == null || gamma === 1 || !Number.isFinite(gamma) || gamma <= 0) {
      return gray;
    }
    const inv = 1 / gamma;
    const lut = new Uint8ClampedArray(256);
    for (let v = 0; v < 256; v++) {
      lut[v] = Math.min(255, Math.round(255 * Math.pow(v / 255, inv)));
    }
    const n = width * height;
    const out = new Uint8ClampedArray(n);
    for (let i = 0; i < n; i++) {
      out[i] = lut[gray[i]];
    }
    return out;
  }
  function clipHistogram(hist, clipLimit, numPixels) {
    const limit = Math.max(1, clipLimit * numPixels / 256);
    let excess = 0;
    for (let i = 0; i < 256; i++) {
      if (hist[i] > limit) {
        excess += hist[i] - limit;
        hist[i] = limit;
      }
    }
    const inc = excess / 256;
    for (let i = 0; i < 256; i++) {
      hist[i] += inc;
    }
  }
  function histToLut(hist, numPixels) {
    const cdf0 = hist[0];
    const cdf = new Float32Array(256);
    cdf[0] = hist[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + hist[i];
    }
    const cmin = cdf0;
    const scale = numPixels > cmin ? 255 / (numPixels - cmin) : 0;
    const lut = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      lut[i] = Math.min(255, Math.round((cdf[i] - cmin) * scale));
    }
    return lut;
  }
  function buildTileLuts(gray, width, height, tileSize, clipLimit) {
    const numTilesX = Math.max(1, Math.ceil(width / tileSize));
    const numTilesY = Math.max(1, Math.ceil(height / tileSize));
    const luts = [];
    for (let tj = 0; tj < numTilesY; tj++) {
      for (let ti = 0; ti < numTilesX; ti++) {
        const x0 = ti * tileSize;
        const y0 = tj * tileSize;
        const x1 = Math.min(x0 + tileSize, width);
        const y1 = Math.min(y0 + tileSize, height);
        const h = new Float32Array(256);
        let count = 0;
        for (let y = y0; y < y1; y++) {
          const row = y * width;
          for (let x = x0; x < x1; x++) {
            h[gray[row + x]]++;
            count++;
          }
        }
        if (count === 0) {
          const id = new Uint8Array(256);
          for (let i = 0; i < 256; i++) id[i] = i;
          luts.push(id);
          continue;
        }
        clipHistogram(h, clipLimit, count);
        const lut = histToLut(h, count);
        luts.push(lut);
      }
    }
    return { luts, numTilesX, numTilesY };
  }
  function applyClahe(gray, width, height, opts = {}) {
    const tileSize = opts.tileSize ?? 8;
    const clipLimit = opts.clipLimit ?? 3;
    const { luts, numTilesX, numTilesY } = buildTileLuts(gray, width, height, tileSize, clipLimit);
    const getLut = (ti, tj) => {
      const tiC = Math.max(0, Math.min(ti, numTilesX - 1));
      const tjC = Math.max(0, Math.min(tj, numTilesY - 1));
      return luts[tjC * numTilesX + tiC];
    };
    const out = new Uint8ClampedArray(width * height);
    for (let y = 0; y < height; y++) {
      const row = y * width;
      const ya = y / tileSize;
      const j0 = Math.floor(ya);
      const j1 = Math.min(j0 + 1, numTilesY - 1);
      const wy = ya - j0;
      for (let x = 0; x < width; x++) {
        const xa = x / tileSize;
        const i0 = Math.floor(xa);
        const i1 = Math.min(i0 + 1, numTilesX - 1);
        const wx = xa - i0;
        const v = gray[row + x];
        const l00 = getLut(i0, j0)[v];
        const l10 = getLut(i1, j0)[v];
        const l01 = getLut(i0, j1)[v];
        const l11 = getLut(i1, j1)[v];
        const a = (1 - wx) * l00 + wx * l10;
        const b = (1 - wx) * l01 + wx * l11;
        out[row + x] = Math.min(255, Math.round((1 - wy) * a + wy * b));
      }
    }
    return out;
  }
  function applyGrayPreprocess(grayObj, opts = {}) {
    const { width, height } = grayObj;
    let data = grayObj.data;
    const gamma = opts.gamma ?? 1;
    data = applyGamma(data, width, height, gamma);
    if (opts.clahe === true) {
      data = applyClahe(data, width, height, {
        tileSize: opts.claheTileSize ?? 8,
        clipLimit: opts.claheClipLimit ?? 3
      });
    }
    return { data, width, height };
  }

  // src/image-to-path/image.js
  function loadGrayImageData(source, options = {}) {
    const maxSize = options.maxSize || 0;
    const lumaMode = "bt601";
    let w = source.width;
    let h = source.height;
    if (maxSize > 0 && Math.max(w, h) > maxSize) {
      const scale = maxSize / Math.max(w, h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }
    const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(w, h);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(source, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    const { data } = imageData;
    const gray = new Uint8ClampedArray(w * h);
    for (let i = 0; i < w * h; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const a = data[i * 4 + 3];
      let R = r, G = g, B = b;
      if (a < 255) {
        const t = a / 255;
        R = r * t + 255 * (1 - t) | 0;
        G = g * t + 255 * (1 - t) | 0;
        B = b * t + 255 * (1 - t) | 0;
      }
      gray[i] = lumaFromRgb(R, G, B, lumaMode);
    }
    return applyGrayPreprocess({ data: gray, width: w, height: h }, {});
  }

  // src/image-to-path/canny.js
  var GAUSSIAN_5 = [
    2,
    4,
    5,
    4,
    2,
    4,
    9,
    12,
    9,
    4,
    5,
    12,
    15,
    12,
    5,
    4,
    9,
    12,
    9,
    4,
    2,
    4,
    5,
    4,
    2
  ];
  function gaussianBlur5(src, width, height) {
    const out = new Uint8ClampedArray(src.length);
    const k = 2;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sum = 0;
        let wsum = 0;
        for (let dy = -k; dy <= k; dy++) {
          for (let dx = -k; dx <= k; dx++) {
            const nx = Math.max(0, Math.min(width - 1, x + dx));
            const ny = Math.max(0, Math.min(height - 1, y + dy));
            const w = GAUSSIAN_5[(dy + k) * 5 + (dx + k)];
            sum += src[ny * width + nx] * w;
            wsum += w;
          }
        }
        out[y * width + x] = Math.round(sum / wsum);
      }
    }
    return out;
  }
  function sobel(src, width, height) {
    const mag = new Float32Array(width * height);
    const dir = new Float32Array(width * height);
    const GX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const GY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const v = src[(y + dy) * width + (x + dx)];
            gx += v * GX[(dy + 1) * 3 + (dx + 1)];
            gy += v * GY[(dy + 1) * 3 + (dx + 1)];
          }
        }
        const i = y * width + x;
        mag[i] = Math.sqrt(gx * gx + gy * gy);
        dir[i] = Math.atan2(gy, gx);
      }
    }
    return { mag, dir };
  }
  function nonMaxSuppression(mag, dir, width, height) {
    const out = new Float32Array(width * height);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x;
        const m = mag[i];
        if (m === 0) continue;
        const d = dir[i];
        const ddeg = (d * 180 / Math.PI + 180) % 180;
        let m1, m2;
        if (ddeg < 22.5 || ddeg >= 157.5) {
          m1 = mag[y * width + (x - 1)];
          m2 = mag[y * width + (x + 1)];
        } else if (ddeg < 67.5) {
          m1 = mag[(y - 1) * width + (x + 1)];
          m2 = mag[(y + 1) * width + (x - 1)];
        } else if (ddeg < 112.5) {
          m1 = mag[(y - 1) * width + x];
          m2 = mag[(y + 1) * width + x];
        } else {
          m1 = mag[(y - 1) * width + (x - 1)];
          m2 = mag[(y + 1) * width + (x + 1)];
        }
        out[i] = m >= m1 && m >= m2 ? m : 0;
      }
    }
    return out;
  }
  function hysteresis(mag, width, height, low, high) {
    const out = new Uint8ClampedArray(width * height);
    const strong = 255;
    const weak = 50;
    for (let i = 0; i < mag.length; i++) {
      if (mag[i] >= high) out[i] = strong;
      else if (mag[i] >= low) out[i] = weak;
      else out[i] = 0;
    }
    const stack = [];
    for (let i = 0; i < mag.length; i++) {
      if (out[i] === strong) stack.push(i);
    }
    while (stack.length > 0) {
      const i = stack.pop();
      const x = i % width;
      const y = i / width | 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const ni = ny * width + nx;
          if (out[ni] === weak) {
            out[ni] = strong;
            stack.push(ni);
          }
        }
      }
    }
    for (let i = 0; i < out.length; i++) {
      if (out[i] === weak) out[i] = 0;
    }
    return out;
  }
  function magnitudePercentile(suppressed, percentile) {
    const tmp = [];
    for (let i = 0; i < suppressed.length; i++) {
      const v = suppressed[i];
      if (v > 0) tmp.push(v);
    }
    if (tmp.length === 0) return 1;
    tmp.sort((a, b) => a - b);
    const p = Math.min(100, Math.max(0, percentile));
    const idx = Math.min(tmp.length - 1, Math.max(0, Math.floor(p / 100 * (tmp.length - 1))));
    return tmp[idx];
  }
  function resolveBlurPasses(options, low, highOrig, thresholdMode) {
    if (options.gaussianPasses != null && Number.isFinite(options.gaussianPasses)) {
      return Math.max(1, Math.min(5, Math.round(options.gaussianPasses)));
    }
    if (thresholdMode === "percentile") {
      return 2;
    }
    let h = highOrig;
    if (h >= 240) {
      h = Math.max(low * 2, 100);
    }
    return h >= 200 ? 3 : 2;
  }
  function canny(gray, options = {}) {
    let low = options.low ?? 50;
    let high = options.high ?? 150;
    const thresholdMode = options.thresholdMode === "percentile" ? "percentile" : "absolute";
    const { data, width, height } = gray;
    const highOrig = high;
    const passes = resolveBlurPasses(options, low, highOrig, thresholdMode);
    let blurred = gaussianBlur5(data, width, height);
    for (let p = 1; p < passes; p++) {
      blurred = gaussianBlur5(blurred, width, height);
    }
    const { mag, dir } = sobel(blurred, width, height);
    const suppressed = nonMaxSuppression(mag, dir, width, height);
    if (thresholdMode === "percentile") {
      const hp = Math.min(100, Math.max(0, options.highPercentile ?? 88));
      const lp = Math.min(100, Math.max(0, options.lowPercentile ?? 65));
      let hi = magnitudePercentile(suppressed, hp);
      let lo = magnitudePercentile(suppressed, lp);
      if (lo >= hi) {
        lo = hi * 0.4;
      }
      if (hi < 1e-9) {
        hi = 1;
        lo = 0.3;
      }
      low = lo;
      high = hi;
    } else if (high >= 240) {
      high = Math.max(low * 2, 100);
    }
    return hysteresis(suppressed, width, height, low, high);
  }

  // src/image-to-path/points.js
  function thinEdges(edges, width, height) {
    const out = new Uint8ClampedArray(edges.length);
    for (let i = 0; i < edges.length; i++) {
      out[i] = edges[i] > 0 ? 255 : 0;
    }
    const get = (arr, x, y) => y >= 0 && y < height && x >= 0 && x < width && arr[y * width + x] > 0 ? 1 : 0;
    let changed = true;
    while (changed) {
      changed = false;
      for (const pass of [1, 2]) {
        const toRemove = [];
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            if (get(out, x, y) === 0) continue;
            const p2 = get(out, x, y - 1), p3 = get(out, x + 1, y - 1), p4 = get(out, x + 1, y);
            const p5 = get(out, x + 1, y + 1), p6 = get(out, x, y + 1), p7 = get(out, x - 1, y + 1);
            const p8 = get(out, x - 1, y), p9 = get(out, x - 1, y - 1);
            const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
            if (B < 2 || B > 6) continue;
            const seq = [p2, p3, p4, p5, p6, p7, p8, p9];
            let A = 0;
            for (let s = 0; s < 8; s++) {
              if (seq[s] === 0 && seq[(s + 1) % 8] === 1) A++;
            }
            if (A !== 1) continue;
            if (pass === 1) {
              if (p2 * p4 * p6 !== 0 || p4 * p6 * p8 !== 0) continue;
            } else {
              if (p2 * p4 * p8 !== 0 || p2 * p6 * p8 !== 0) continue;
            }
            toRemove.push(y * width + x);
          }
        }
        for (const i of toRemove) {
          out[i] = 0;
          changed = true;
        }
      }
    }
    return out;
  }
  function edgePoints(edges, width, height) {
    const points = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (edges[y * width + x] > 0) points.push([x, y]);
      }
    }
    return points;
  }
  function samplePoints(points, maxPoints) {
    const n = points.length;
    if (n <= maxPoints) return points;
    const result = [];
    for (let i = 0; i < maxPoints; i++) {
      const idx = Math.round(i / (maxPoints - 1) * (n - 1));
      result.push(points[idx]);
    }
    return result;
  }

  // src/image-to-path/centerline.js
  function centerlineFromGray(gray, options = {}) {
    const inkThreshold = options.inkThreshold ?? 200;
    const { data, width, height } = gray;
    const binary = new Uint8ClampedArray(width * height);
    for (let i = 0; i < width * height; i++) {
      binary[i] = data[i] < inkThreshold ? 255 : 0;
    }
    return thinEdges(binary, width, height);
  }

  // src/image-to-path/pipeline-utils.js
  function assertEdgesOverride(override, width, height) {
    if (!(override instanceof Uint8ClampedArray) || override.length !== width * height) {
      throw new Error("edgesOverride must be a Uint8ClampedArray of length width * height");
    }
  }

  // src/image-to-path/tsp.js
  var TSP_DISTANCE_MATRIX_MAX_POINTS = 2500;
  function distanceMatrix(points) {
    const n = points.length;
    if (n > TSP_DISTANCE_MATRIX_MAX_POINTS) {
      throw new Error(
        "distanceMatrix: too many points (" + n + "), max " + TSP_DISTANCE_MATRIX_MAX_POINTS + " (reduce maxPoints or subsample before TSP)"
      );
    }
    const D = Array.from({ length: n }, () => new Array(n));
    for (let i = 0; i < n; i++) {
      D[i][i] = 0;
      for (let j = i + 1; j < n; j++) {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const d = Math.sqrt(dx * dx + dy * dy);
        D[i][j] = d;
        D[j][i] = d;
      }
    }
    return D;
  }
  function nearestNeighbourOrder(D, start = 0) {
    const n = D.length;
    if (n <= 1) return Array.from({ length: n }, (_, i) => i);
    const order = [start];
    const remaining = new Set(Array.from({ length: n }, (_, i) => i));
    remaining.delete(start);
    while (remaining.size > 0) {
      const last = order[order.length - 1];
      let best = -1;
      let bestDist = Infinity;
      for (const i of remaining) {
        if (D[last][i] < bestDist) {
          bestDist = D[last][i];
          best = i;
        }
      }
      order.push(best);
      remaining.delete(best);
    }
    return order;
  }
  function nearestNeighbourOrderFromPoints(points, start = 0) {
    const n = points.length;
    if (n <= 1) return Array.from({ length: n }, (_, i) => i);
    const order = [start];
    const remaining = new Set(Array.from({ length: n }, (_, i) => i));
    remaining.delete(start);
    while (remaining.size > 0) {
      const last = order[order.length - 1];
      const pl = points[last];
      let best = -1;
      let bestDistSq = Infinity;
      for (const i of remaining) {
        const dx = pl[0] - points[i][0];
        const dy = pl[1] - points[i][1];
        const dSq = dx * dx + dy * dy;
        if (dSq < bestDistSq) {
          bestDistSq = dSq;
          best = i;
        }
      }
      order.push(best);
      remaining.delete(best);
    }
    return order;
  }
  function convexHullGraham(points) {
    const n = points.length;
    if (n <= 2) return Array.from({ length: n }, (_, i) => i);
    let minY = points[0][1];
    let pivot = 0;
    for (let i = 1; i < n; i++) {
      const y = points[i][1];
      if (y < minY || y === minY && points[i][0] < points[pivot][0]) {
        minY = y;
        pivot = i;
      }
    }
    const px = points[pivot][0];
    const py = points[pivot][1];
    const rest = [];
    for (let i = 0; i < n; i++) {
      if (i !== pivot) rest.push(i);
    }
    rest.sort((a, b) => {
      const aa = Math.atan2(points[a][1] - py, points[a][0] - px);
      const bb = Math.atan2(points[b][1] - py, points[b][0] - px);
      return aa - bb;
    });
    const hull = [pivot];
    for (const idx of rest) {
      while (hull.length >= 2) {
        const a = points[hull[hull.length - 2]];
        const b = points[hull[hull.length - 1]];
        const c = points[idx];
        const cross = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
        if (cross <= 0) hull.pop();
        else break;
      }
      hull.push(idx);
    }
    return hull;
  }
  function convexHullInsertionOrder(D, points) {
    const n = D.length;
    if (n <= 2) return Array.from({ length: n }, (_, i) => i);
    const hullIdx = convexHullGraham(points);
    const order = [...hullIdx];
    const remaining = new Set(Array.from({ length: n }, (_, i) => i));
    for (const i of hullIdx) remaining.delete(i);
    while (remaining.size > 0) {
      let bestInc = Infinity;
      let bestK = -1;
      let bestPos = -1;
      for (const k of remaining) {
        for (let pos = 0; pos < order.length; pos++) {
          const i = order[pos];
          const j = order[(pos + 1) % order.length];
          const inc = D[i][k] + D[k][j] - D[i][j];
          if (inc < bestInc) {
            bestInc = inc;
            bestK = k;
            bestPos = pos;
          }
        }
      }
      if (bestK < 0) break;
      order.splice(bestPos + 1, 0, bestK);
      remaining.delete(bestK);
    }
    return order;
  }
  function closedPathLengthFromMatrix(D, order) {
    if (order.length < 2) return 0;
    let sum = 0;
    for (let t = 0; t < order.length; t++) {
      sum += D[order[t]][order[(t + 1) % order.length]];
    }
    return sum;
  }
  function twoOpt(D, order, options = {}) {
    const maxSteps = options.maxSteps ?? 0;
    const progressEvery = options.progressEvery ?? 0;
    const onProgress = options.onProgress;
    const n = order.length;
    if (n < 4) return { order: [...order], steps: 0 };
    const current = [...order];
    let step = 0;
    let improved = true;
    if (onProgress && progressEvery > 0) {
      onProgress({ order: [...current], step: 0 });
    }
    while (improved) {
      if (maxSteps > 0 && step >= maxSteps) break;
      improved = false;
      for (let i = 0; i < n; i++) {
        for (let j = i + 2; j < n; j++) {
          if (i === 0 && j === n - 1) continue;
          const a = current[i];
          const b = current[(i + 1) % n];
          const c = current[j];
          const d = current[(j + 1) % n];
          const before = D[a][b] + D[c][d];
          const after = D[a][c] + D[b][d];
          if (after < before) {
            const seg = current.slice(i + 1, j + 1).reverse();
            for (let k = 0; k < seg.length; k++) current[i + 1 + k] = seg[k];
            improved = true;
            step++;
            if (onProgress && progressEvery > 0 && step % progressEvery === 0) {
              onProgress({ order: [...current], step });
            }
            break;
          }
        }
        if (improved) break;
      }
    }
    if (onProgress && progressEvery > 0 && step > 0 && step % progressEvery !== 0) {
      onProgress({ order: [...current], step });
    }
    return { order: current, steps: step };
  }
  function orderToPath(points, order, close = true) {
    const path = order.map((i) => points[i]);
    if (close && path.length > 1) path.push(path[0]);
    return path;
  }

  // src/image-to-path/minHeap.js
  var MinHeapF = class {
    constructor() {
      this.a = [];
    }
    /**
     * @param {{ x: number, y: number, f: number, g: number }} n
     */
    push(n) {
      const a = this.a;
      a.push(n);
      let i = a.length - 1;
      while (i > 0) {
        const p = i - 1 >> 1;
        if (a[p].f <= a[i].f) break;
        const t = a[p];
        a[p] = a[i];
        a[i] = t;
        i = p;
      }
    }
    /**
     * @returns {{ x: number, y: number, f: number, g: number }|undefined}
     */
    pop() {
      const a = this.a;
      if (a.length === 0) return void 0;
      const top = a[0];
      const last = a.pop();
      if (a.length === 0) return top;
      a[0] = last;
      let i = 0;
      for (; ; ) {
        const l = i * 2 + 1;
        const r = l + 1;
        let smallest = i;
        if (l < a.length && a[l].f < a[smallest].f) smallest = l;
        if (r < a.length && a[r].f < a[smallest].f) smallest = r;
        if (smallest === i) break;
        const t = a[i];
        a[i] = a[smallest];
        a[smallest] = t;
        i = smallest;
      }
      return top;
    }
    get length() {
      return this.a.length;
    }
  };

  // src/image-to-path/strokeTrace.js
  var DEFAULT_MAX_BRIDGE_EXPANSIONS = 75e4;
  var MAX_CHAINS_FOR_TWO_OPT = 400;
  var DX = [-1, 0, 1, -1, 1, -1, 0, 1];
  var DY = [-1, -1, -1, 0, 0, 1, 1, 1];
  function fromIdx(i, w) {
    return { x: i % w, y: i / w | 0 };
  }
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
  function edgeKey(i, j) {
    return i < j ? `${i}_${j}` : `${j}_${i}`;
  }
  function degree8(i, w, h, mask) {
    return neighbors8(i, w, h, mask).length;
  }
  function pickNextDegree2(prev, cur, w, h, mask) {
    if (degree8(cur, w, h, mask) !== 2) return -1;
    const nbList = neighbors8(cur, w, h, mask);
    for (const nb of nbList) {
      if (nb !== prev) return nb;
    }
    return -1;
  }
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
  function bridgeAlongBackground(mask, w, h, ax, ay, bx, by, maxSteps) {
    const sx = Math.max(0, Math.min(w - 1, Math.round(ax)));
    const sy = Math.max(0, Math.min(h - 1, Math.round(ay)));
    const gx = Math.max(0, Math.min(w - 1, Math.round(bx)));
    const gy = Math.max(0, Math.min(h - 1, Math.round(by)));
    if (sx === gx && sy === gy) return [];
    function walkable(x, y) {
      if (x < 0 || x >= w || y < 0 || y >= h) return false;
      if (x === sx && y === sy) return true;
      if (x === gx && y === gy) return true;
      return mask[y * w + x] === 0;
    }
    const startKey = sy * w + sx;
    const cameFrom = /* @__PURE__ */ new Map();
    const gScore = /* @__PURE__ */ new Map();
    const open = new MinHeapF();
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
      if (knownG !== void 0 && g > knownG + 1e-9) continue;
      expanded++;
      if (x === gx && y === gy) {
        const pathIdx = [];
        let k = ckey;
        while (k !== void 0) {
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
        if (prevG !== void 0 && tentativeG >= prevG) continue;
        cameFrom.set(nkey, ckey);
        gScore.set(nkey, tentativeG);
        open.push({ x: nx, y: ny, g: tentativeG, f: tentativeG + heur(nx, ny) });
      }
    }
    return null;
  }
  function bridgeAlongInk(mask, w, h, ax, ay, bx, by, maxSteps) {
    const sx = Math.max(0, Math.min(w - 1, Math.round(ax)));
    const sy = Math.max(0, Math.min(h - 1, Math.round(ay)));
    const gx = Math.max(0, Math.min(w - 1, Math.round(bx)));
    const gy = Math.max(0, Math.min(h - 1, Math.round(by)));
    if (sx === gx && sy === gy) return [];
    const sKey = sy * w + sx;
    const gKey = gy * w + gx;
    if (mask[sKey] === 0 || mask[gKey] === 0) return null;
    const cameFrom = /* @__PURE__ */ new Map();
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
        while (k !== void 0) {
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
  function makeBridge(a, b, width, height, mask, opts) {
    const bridgeMode = opts.bridgeMode ?? "avoidInk";
    const maxBridgeSteps = opts.maxBridgeSteps ?? Math.min(width * height * 4, DEFAULT_MAX_BRIDGE_EXPANSIONS);
    if (bridgeMode === "straight") {
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
        const { order: improved } = twoOpt(D, perm, { maxSteps: 5e3 });
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
  function resamplePathByArcLength(path, maxPoints) {
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
      const target = k / (maxPoints - 1) * total;
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
  function chainsFromComponent(comp, w, h, mask) {
    const edgeVisited = /* @__PURE__ */ new Set();
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
      const start = compArr.reduce((a, b) => a < b ? a : b);
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
  function connectedComponents(mask, w, h) {
    const seen = new Uint8Array(w * h);
    const components = [];
    for (let i = 0; i < w * h; i++) {
      if (mask[i] === 0 || seen[i]) continue;
      const comp = /* @__PURE__ */ new Set();
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
  function pathFromThinMask(mask, width, height, maxPoints, options = {}) {
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

  // src/image-to-path/pipeline.js
  function normalizePath(path, width, height) {
    return path.map(([x, y]) => [x / width, y / height]);
  }
  function emitProgress(onProgress, payload) {
    if (typeof onProgress === "function") onProgress(payload);
  }
  var PREVIEW_THROTTLE_MS = 220;
  var TWO_OPT_PROGRESS_EVERY = 55;
  function normalizePipelineOptions(options) {
    if (options == null || typeof options !== "object") return {};
    const out = { ...options };
    if (out.edgesOverride != null) {
      out.useCenterline = false;
    }
    return out;
  }
  function runDensityPipeline(gray, options) {
    const maxPoints = options.maxPoints ?? 1500;
    const thresholdLow = options.thresholdLow ?? 50;
    const thresholdHigh = options.thresholdHigh ?? 150;
    const doThinEdges = options.thinEdges === true;
    const useCenterline = options.useCenterline === true;
    const inkThreshold = options.inkThreshold ?? 200;
    const onProgress = options.onProgress;
    const previewThrottleMs = PREVIEW_THROTTLE_MS;
    const twoOptProgressEvery = TWO_OPT_PROGRESS_EVERY;
    const { width, height } = gray;
    const override = options.edgesOverride;
    emitProgress(onProgress, {
      message: useCenterline ? "Extracting centerline (skeleton)\u2026" : "Detecting edges\u2026"
    });
    let edges;
    if (override != null) {
      assertEdgesOverride(override, width, height);
      edges = new Uint8ClampedArray(override);
    } else if (useCenterline) {
      edges = centerlineFromGray(gray, { inkThreshold });
    } else {
      edges = canny(gray, { low: thresholdLow, high: thresholdHigh });
      if (doThinEdges) edges = thinEdges(edges, width, height);
    }
    emitProgress(onProgress, { message: "Extracting contour points\u2026" });
    let points = edgePoints(edges, width, height);
    if (points.length === 0) throw new Error("No edge points found. Try different threshold.");
    points = samplePoints(points, maxPoints);
    if (points.length < 2) throw new Error("Too few points after sampling.");
    emitProgress(onProgress, { message: "Sampling done (" + points.length + " pts)" });
    let tspPoints = points;
    if (tspPoints.length > TSP_DISTANCE_MATRIX_MAX_POINTS) {
      tspPoints = samplePoints(points, TSP_DISTANCE_MATRIX_MAX_POINTS);
      emitProgress(onProgress, {
        message: "TSP: using " + TSP_DISTANCE_MATRIX_MAX_POINTS + " points (cap; had " + points.length + " sampled) to avoid out-of-memory\u2026"
      });
    }
    emitProgress(onProgress, { message: "Computing distance matrix\u2026" });
    const D = distanceMatrix(tspPoints);
    const n = tspPoints.length;
    const runs = [];
    runs.push(nearestNeighbourOrder(D, 0));
    if (n > 3) {
      runs.push(nearestNeighbourOrder(D, Math.max(0, Math.floor(n / 3))));
      runs.push(nearestNeighbourOrder(D, Math.max(0, Math.floor(2 * n / 3))));
      runs.push(convexHullInsertionOrder(D, tspPoints));
    }
    let lastPreviewAt = 0;
    const previewNow = typeof performance !== "undefined" && performance.now ? () => performance.now() : () => Date.now();
    const emitPreviewFromOrder = (order, message) => {
      if (!onProgress) return;
      const t = previewNow();
      if (t - lastPreviewAt < previewThrottleMs) return;
      lastPreviewAt = t;
      const pathRaw = orderToPath(tspPoints, order, true);
      const pathNorm2 = normalizePath(pathRaw, width, height);
      emitProgress(onProgress, {
        message: message || "Updating route\u2026",
        preview: { path: pathNorm2, width, height }
      });
    };
    emitPreviewFromOrder(runs[0], "Initial route (nearest neighbor)");
    let bestOrder = runs[0];
    let bestScore = closedPathLengthFromMatrix(D, bestOrder);
    const twoOptBase = {};
    const twoOptOpts = onProgress ? {
      ...twoOptBase,
      progressEvery: twoOptProgressEvery,
      onProgress: ({ order }) => emitPreviewFromOrder(order, "2-opt optimization\u2026")
    } : twoOptBase;
    let runIdx = 0;
    for (const order of runs) {
      runIdx++;
      if (onProgress && runs.length > 1) {
        emitProgress(onProgress, { message: "2-opt trial " + runIdx + " / " + runs.length });
      }
      const { order: improved } = twoOpt(D, order, twoOptOpts);
      const score = closedPathLengthFromMatrix(D, improved);
      if (score < bestScore) {
        bestScore = score;
        bestOrder = improved;
      }
    }
    if (onProgress) {
      lastPreviewAt = 0;
      const pathFinal = orderToPath(tspPoints, bestOrder, true);
      const pathNormFinal = normalizePath(pathFinal, width, height);
      emitProgress(onProgress, {
        message: "Final route",
        preview: { path: pathNormFinal, width, height }
      });
    }
    let pathPix = orderToPath(tspPoints, bestOrder, true);
    if (pathPix.length > maxPoints) {
      pathPix = resamplePathByArcLength(pathPix, maxPoints);
    }
    const pathNorm = normalizePath(pathPix, width, height);
    return { path: pathNorm, width, height };
  }
  function runStrokeTracePipeline(gray, options) {
    const maxPoints = options.maxPoints ?? 1500;
    const inkThreshold = options.inkThreshold ?? 200;
    const onProgress = options.onProgress;
    const { width, height } = gray;
    const override = options.edgesOverride;
    emitProgress(onProgress, { message: "Building thin-line mask\u2026" });
    let mask;
    if (override != null) {
      assertEdgesOverride(override, width, height);
      mask = new Uint8ClampedArray(override);
    } else {
      mask = centerlineFromGray(gray, { inkThreshold });
    }
    emitProgress(onProgress, { message: "Tracing along graph\u2026" });
    const pathPix = pathFromThinMask(mask, width, height, maxPoints, {
      bridgeMode: options.bridgeMode,
      maxBridgeSteps: options.maxBridgeSteps
    });
    if (!pathPix || pathPix.length < 2) {
      throw new Error("Stroke too short. Adjust inkThreshold or the image.");
    }
    const pathNorm = normalizePath(pathPix, width, height);
    if (onProgress) {
      emitProgress(onProgress, {
        message: "Trace complete",
        preview: { path: pathNorm, width, height }
      });
    }
    return { path: pathNorm, width, height };
  }
  function runPipeline(gray, options = {}) {
    const opts = normalizePipelineOptions(options);
    const routeMode = opts.routeMode ?? "density";
    if (routeMode === "contour") {
      throw new Error('routeMode "contour" (filled silhouette) was removed. Use strokeTrace for line art or density for photos.');
    }
    if (routeMode === "strokeTrace") return runStrokeTracePipeline(gray, opts);
    return runDensityPipeline(gray, opts);
  }

  // src/image-to-path/metrics.js
  function ccw(a, b, c) {
    return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
  }
  function segIntersects(a, b, c, d) {
    return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
  }
  function computePathMetrics(path) {
    if (!Array.isArray(path) || path.length < 2) {
      return { points: Array.isArray(path) ? path.length : 0, length: 0, selfIntersections: 0 };
    }
    let length = 0;
    for (let i = 1; i < path.length; i++) {
      const dx = path[i][0] - path[i - 1][0];
      const dy = path[i][1] - path[i - 1][1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    let selfIntersections = 0;
    const n = Math.min(path.length, 600);
    for (let i = 1; i < n; i++) {
      const a = path[i - 1];
      const b = path[i];
      for (let j = i + 2; j < n; j++) {
        if (j === i + 1) continue;
        const c = path[j - 1];
        const d = path[j];
        if (segIntersects(a, b, c, d)) selfIntersections++;
      }
    }
    return { points: path.length, length, selfIntersections };
  }

  // src/image-to-path/index.js
  function loadOptsFromImageOptions(options) {
    return {
      maxSize: options.maxSize ?? 0
    };
  }
  function pipelineOptsFromImageOptions(options) {
    return normalizePipelineOptions({
      maxPoints: options.maxPoints,
      thresholdLow: options.thresholdLow,
      thresholdHigh: options.thresholdHigh,
      thinEdges: options.thinEdges,
      useCenterline: options.useCenterline,
      inkThreshold: options.inkThreshold,
      edgesOverride: options.edgesOverride,
      routeMode: options.routeMode,
      bridgeMode: options.bridgeMode,
      maxBridgeSteps: options.maxBridgeSteps,
      onProgress: options.onProgress
    });
  }
  function withMetrics(result) {
    return {
      ...result,
      metrics: computePathMetrics(result.path)
    };
  }
  function pathFromGray(gray, options = {}) {
    const routeMode = options.routeMode ?? "density";
    const basic = runPipeline(gray, pipelineOptsFromImageOptions(options));
    return withMetrics({ ...basic, modeUsed: routeMode });
  }
  function preprocessGrayFromArrayBuffer(arrayBuffer, options = {}) {
    const blob = new Blob([arrayBuffer]);
    return createImageBitmap(blob).then((bitmap) => {
      const gray = loadGrayImageData(bitmap, loadOptsFromImageOptions(options));
      bitmap.close();
      return gray;
    });
  }
  function fromArrayBuffer(arrayBuffer, options = {}) {
    return preprocessGrayFromArrayBuffer(arrayBuffer, options).then((gray) => pathFromGray(gray, options));
  }

  // src/workers/image-worker.js
  function buildProgressPoster(startedAt) {
    return function onProgress(info) {
      const elapsedMs = Date.now() - startedAt;
      if (typeof info === "string") {
        self.postMessage({ progress: info, elapsedMs });
        return;
      }
      const payload = { progress: info.message || "", elapsedMs };
      if (info.preview && info.preview.path) {
        payload.previewPath = info.preview.path;
        payload.width = info.preview.width;
        payload.height = info.preview.height;
      }
      self.postMessage(payload);
    };
  }
  self.onmessage = async function(e) {
    const data = e.data || {};
    try {
      if (data.task === "pathFromGray") {
        const { grayData, width, height, options: options2 } = data;
        if (!grayData || !(grayData instanceof ArrayBuffer)) {
          throw new Error("pathFromGray requires grayData (ArrayBuffer)");
        }
        if (width == null || height == null) {
          throw new Error("pathFromGray requires width and height");
        }
        const startedAt2 = Date.now();
        const gray = { data: new Uint8ClampedArray(grayData), width, height };
        const opts = options2 ? { ...options2 } : {};
        if (opts.edgesOverride instanceof ArrayBuffer) {
          opts.edgesOverride = new Uint8ClampedArray(opts.edgesOverride);
        }
        const result2 = pathFromGray(gray, {
          ...opts,
          onProgress: buildProgressPoster(startedAt2)
        });
        self.postMessage({
          path: result2.path,
          width: result2.width,
          height: result2.height,
          modeUsed: result2.modeUsed,
          metrics: result2.metrics,
          elapsedMs: Date.now() - startedAt2
        });
        return;
      }
      const { imageArrayBuffer, options } = data;
      if (!imageArrayBuffer || !(imageArrayBuffer instanceof ArrayBuffer)) {
        throw new Error("imageArrayBuffer is required");
      }
      const startedAt = Date.now();
      const result = await fromArrayBuffer(imageArrayBuffer, {
        ...options || {},
        onProgress: buildProgressPoster(startedAt)
      });
      self.postMessage({
        path: result.path,
        width: result.width,
        height: result.height,
        modeUsed: result.modeUsed,
        metrics: result.metrics,
        elapsedMs: Date.now() - startedAt
      });
    } catch (err) {
      self.postMessage({ error: err && err.message ? err.message : String(err) });
    }
  };
})();
