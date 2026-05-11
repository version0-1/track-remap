/**
 * Extract coordinate lists from edge images and sample them.
 * Optionally apply Zhang-Suen thinning to reduce edges to 1-pixel width, decreasing the number of edge points.
 */

/**
 * Thin edges to 1-pixel width using Zhang-Suen thinning. This reduces the number of edge points.
 * @param {Uint8ClampedArray} edges - width * height, edges are non-zero
 * @param {number} width
 * @param {number} height
 * @returns {Uint8ClampedArray} - Thinned edge image (0 or 255)
 */
export function thinEdges(edges, width, height) {
  const out = new Uint8ClampedArray(edges.length);
  for (let i = 0; i < edges.length; i++) {
    out[i] = edges[i] > 0 ? 255 : 0;
  }
  const get = (arr, x, y) => (y >= 0 && y < height && x >= 0 && x < width && arr[y * width + x] > 0) ? 1 : 0;
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
            if ((p2 * p4 * p6) !== 0 || (p4 * p6 * p8) !== 0) continue;
          } else {
            if ((p2 * p4 * p8) !== 0 || (p2 * p6 * p8) !== 0) continue;
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

/**
 * Return coordinates of edge pixels (value > 0) as an array of [x, y]
 * @param {Uint8ClampedArray} edges - width * height
 * @param {number} width
 * @param {number} height
 * @returns {number[][]} - [[x,y], ...]
 */
export function edgePoints(edges, width, height) {
  const points = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (edges[y * width + x] > 0) points.push([x, y]);
    }
  }
  return points;
}

/**
 * Subsample at even intervals when points exceed maxPoints
 * @param {number[][]} points
 * @param {number} maxPoints
 * @returns {number[][]}
 */
export function samplePoints(points, maxPoints) {
  const n = points.length;
  if (n <= maxPoints) return points;
  const result = [];
  for (let i = 0; i < maxPoints; i++) {
    const idx = Math.round((i / (maxPoints - 1)) * (n - 1));
    result.push(points[idx]);
  }
  return result;
}
