/**
 * Approximate distance (m) between two lat/lng points (Haversine)
 */
export function haversineM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Map an image path (normalized [x, y] array) into bounds and interpolate to the specified number of points
 * @param {number[][]} path - Array of normalized coordinates in 0..1
 * @param {{ minLat: number, maxLat: number, minLng: number, maxLng: number }} bounds
 * @param {number} numPoints - Number of output points (matching the FIT record count)
 * @returns {{ lat: number, lng: number }[]}
 */
export function pathToLatLng(path, bounds, numPoints) {
  const out = [];
  const { minLat, maxLat, minLng, maxLng } = bounds;
  const spanLat = maxLat - minLat;
  const spanLng = maxLng - minLng;
  for (let i = 0; i < numPoints; i++) {
    const t = numPoints <= 1 ? 0 : i / (numPoints - 1);
    const pathIdx = t * (path.length - 1);
    const i0 = Math.floor(pathIdx);
    const i1 = Math.min(i0 + 1, path.length - 1);
    const frac = pathIdx - i0;
    const x = path[i0][0] * (1 - frac) + path[i1][0] * frac;
    const y = path[i0][1] * (1 - frac) + path[i1][1] * frac;
    const lng = minLng + x * spanLng;
    const lat = maxLat - y * spanLat;
    out.push({ lat, lng });
  }
  return out;
}
