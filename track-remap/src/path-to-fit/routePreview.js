/**
 * Draw a point sequence on a canvas and return a data URL
 * @param {{ lat: number, lng: number }[]} points
 * @param {{ width?: number, lineWidth?: number, padding?: number }} [opts]
 * @returns {string} data URL
 */
export function routeToDataURL(points, opts = {}) {
  const width = opts.width ?? 800;
  const lineWidth = opts.lineWidth ?? 2;
  const padding = opts.padding ?? 20;

  if (points.length < 2) {
    throw new Error('Route points must be at least 2');
  }

  let minLat = points[0].lat;
  let maxLat = points[0].lat;
  let minLng = points[0].lng;
  let maxLng = points[0].lng;
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
  }

  const spanLat = maxLat - minLat || 1e-6;
  const spanLng = maxLng - minLng || 1e-6;
  const aspect = spanLng / spanLat;
  let cw = width;
  let ch = Math.round(width / aspect);
  if (ch > width) {
    ch = width;
    cw = Math.round(width * aspect);
  }
  cw += padding * 2;
  ch += padding * 2;

  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cw, ch);

  const scaleX = (cw - padding * 2) / spanLng;
  const scaleY = (ch - padding * 2) / spanLat;
  const toX = (lng) => padding + (lng - minLng) * scaleX;
  const toY = (lat) => ch - padding - (lat - minLat) * scaleY;

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(toX(points[0].lng), toY(points[0].lat));
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(toX(points[i].lng), toY(points[i].lat));
  }
  ctx.stroke();

  return canvas.toDataURL('image/png');
}
