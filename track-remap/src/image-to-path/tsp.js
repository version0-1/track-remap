/**
 * TSP: distance matrix, nearest-neighbor, convex hull insertion, 2-opt
 * points is an array of [x, y][]. order is an array of indices.
 */

/** Since the dense n × n matrix can easily exhaust heap memory in a browser, this is the cap. */
export const TSP_DISTANCE_MATRIX_MAX_POINTS = 2500;

/**
 * Pairwise distance matrix (n × n)
 * @param {number[][]} points
 * @returns {number[][]} - D[i][j] = distance(points[i], points[j])
 */
export function distanceMatrix(points) {
  const n = points.length;
  if (n > TSP_DISTANCE_MATRIX_MAX_POINTS) {
    throw new Error(
      'distanceMatrix: too many points (' +
        n +
        '), max ' +
        TSP_DISTANCE_MATRIX_MAX_POINTS +
        ' (reduce maxPoints or subsample before TSP)',
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

/**
 * Build an initial tour using nearest-neighbor
 * @param {number[][]} D - Distance matrix
 * @param {number} [start=0]
 * @returns {number[]} - Array of indices
 */
export function nearestNeighbourOrder(D, start = 0) {
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

/**
 * Nearest-neighbor without a distance matrix. Computes distances on the fly (O(n²) time, O(n) space).
 * For use when n is large (e.g. chain centroids) but a dense matrix should be avoided.
 * @param {number[][]} points
 * @param {number} [start=0]
 * @returns {number[]}
 */
export function nearestNeighbourOrderFromPoints(points, start = 0) {
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

/**
 * Return convex hull point indices in counter-clockwise order using Graham scan
 * @param {number[][]} points
 * @returns {number[]}
 */
export function convexHullGraham(points) {
  const n = points.length;
  if (n <= 2) return Array.from({ length: n }, (_, i) => i);

  let minY = points[0][1];
  let pivot = 0;
  for (let i = 1; i < n; i++) {
    const y = points[i][1];
    if (y < minY || (y === minY && points[i][0] < points[pivot][0])) {
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

/**
 * Build an initial tour using convex hull insertion
 * @param {number[][]} D
 * @param {number[][]} points
 * @returns {number[]}
 */
export function convexHullInsertionOrder(D, points) {
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

/**
 * Total distance of a closed tour
 */
export function closedPathLengthFromMatrix(D, order) {
  if (order.length < 2) return 0;
  let sum = 0;
  for (let t = 0; t < order.length; t++) {
    sum += D[order[t]][order[(t + 1) % order.length]];
  }
  return sum;
}

/**
 * Improve the tour using 2-opt (first-improvement).
 * @param {number[][]} D
 * @param {number[]} order
 * @param {{ maxSteps?: number, progressEvery?: number, onProgress?: (arg: { order: number[], step: number }) => void }} [options]
 * @returns {{ order: number[], steps: number }}
 */
export function twoOpt(D, order, options = {}) {
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

/**
 * Arrange points according to order (appends the first point at the end when closing)
 */
export function orderToPath(points, order, close = true) {
  const path = order.map((i) => points[i]);
  if (close && path.length > 1) path.push(path[0]);
  return path;
}
