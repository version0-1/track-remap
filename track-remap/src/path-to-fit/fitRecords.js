import { SEMICIRCLES_TO_DEG } from './fitConstants.js';

/**
 * Extract lat/lng point sequence from FIT parse result (concatenating records from all laps)
 * @param {object} fitObject - Return value of fit-file-parser's parseAsync (cascade mode)
 * @returns {{ lat: number, lng: number }[]}
 */
export function extractPoints(fitObject) {
  const points = [];
  if (!fitObject || !fitObject.sessions) return points;
  for (const session of fitObject.sessions) {
    if (!session.laps) continue;
    for (const lap of session.laps) {
      if (!lap.records) continue;
      for (const record of lap.records) {
        const lat = record.position_lat;
        const lng = record.position_long;
        if (lat == null || lng == null) continue;
        const latDeg = typeof lat === 'number' ? lat * SEMICIRCLES_TO_DEG : lat;
        const lngDeg = typeof lng === 'number' ? lng * SEMICIRCLES_TO_DEG : lng;
        points.push({ lat: latDeg, lng: lngDeg });
      }
    }
  }
  return points;
}

/**
 * @param {object} record
 * @param {{ timestamp?: number, distance?: number, altitude?: number }[]} records
 * @param {object[]} rawRecords
 * @param {{ minLat: number, maxLat: number, minLng: number, maxLng: number }} bounds
 */
export function collectRecord(record, records, rawRecords, bounds) {
  const lat = record.position_lat;
  const lng = record.position_long;
  const ts = record.timestamp;
  const dist = record.distance;
  const alt = record.altitude ?? record.enhanced_altitude;
  records.push({
    timestamp: ts,
    distance: typeof dist === 'number' ? dist : undefined,
    altitude: typeof alt === 'number' && Number.isFinite(alt) ? alt : undefined,
  });
  rawRecords.push(record);
  if (lat != null && lng != null) {
    const latDeg = typeof lat === 'number' ? lat * SEMICIRCLES_TO_DEG : lat;
    const lngDeg = typeof lng === 'number' ? lng * SEMICIRCLES_TO_DEG : lng;
    if (latDeg < bounds.minLat) bounds.minLat = latDeg;
    if (latDeg > bounds.maxLat) bounds.maxLat = latDeg;
    if (lngDeg < bounds.minLng) bounds.minLng = lngDeg;
    if (lngDeg > bounds.maxLng) bounds.maxLng = lngDeg;
  }
}

/**
 * Get all records in order and their bounds from the FIT parse result (for application). All non-position fields are returned in rawRecords.
 * @param {object} fitObject - Return value of fit-file-parser's parseAsync (cascade mode)
 * @returns {{ records: { timestamp?: number, distance?: number, altitude?: number }[], rawRecords: object[], bounds: object, totalDistanceM: number }}
 */
export function getFITRecordsAndBounds(fitObject) {
  const records = [];
  const rawRecords = [];
  const bounds = { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity };
  if (!fitObject) return { records, rawRecords, bounds: { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 }, totalDistanceM: 0 };

  if (fitObject.sessions) {
    for (const session of fitObject.sessions) {
      if (!session.laps) continue;
      for (const lap of session.laps) {
        if (!lap.records) continue;
        for (const record of lap.records) collectRecord(record, records, rawRecords, bounds);
      }
    }
  }
  if (records.length === 0 && Array.isArray(fitObject.records)) {
    for (const record of fitObject.records) collectRecord(record, records, rawRecords, bounds);
  }

  const totalDistanceM = records.length > 0 && records[records.length - 1].distance != null
    ? records[records.length - 1].distance
    : 0;

  if (bounds.minLat === Infinity) bounds.minLat = bounds.maxLat = 35.0;
  if (bounds.minLng === Infinity) bounds.minLng = bounds.maxLng = 139.0;
  const span = 0.01;
  if (bounds.maxLat - bounds.minLat < span) {
    bounds.minLat -= span / 2;
    bounds.maxLat += span / 2;
  }
  if (bounds.maxLng - bounds.minLng < span) {
    bounds.minLng -= span / 2;
    bounds.maxLng += span / 2;
  }
  return { records, rawRecords, bounds: { minLat: bounds.minLat, maxLat: bounds.maxLat, minLng: bounds.minLng, maxLng: bounds.maxLng }, totalDistanceM };
}
