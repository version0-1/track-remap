function ccw(a, b, c) {
  return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
}

function segIntersects(a, b, c, d) {
  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

/**
 * Simple path metrics (for comparison)
 * @param {number[][]} path
 * @returns {{ points: number, length: number, selfIntersections: number }}
 */
export function computePathMetrics(path) {
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

