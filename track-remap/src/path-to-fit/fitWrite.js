import { FitWriter } from '@markw65/fit-file-writer';
import {
  DEG_TO_SEMICIRCLES,
  RECORD_COPY_KEYS,
  RECORD_POSITION_KEYS,
  SESSION_COPY_KEYS,
  LAP_COPY_KEYS,
} from './fitConstants.js';
import { haversineM } from './geo.js';

/**
 * Return the record's timestamp in milliseconds (handles both Date and numeric values)
 * @param {{ timestamp?: number|Date }} record
 * @returns {number}
 */
export function toTimestampMs(record) {
  const t = record?.timestamp;
  if (t == null) return NaN;
  return typeof t === 'number' ? (t < 1e12 ? t * 1000 : t) : new Date(t).getTime();
}

/**
 * Copy session/lap/record from the original FIT as much as possible, replacing only position, distance, speed, and altitude in records, then output the FIT.
 * @param {{ lat: number, lng: number, timestamp: number, altitude?: number }[]} points - Post-application latitude, longitude, timestamp (ms), and altitude
 * @param {object[]} rawRecords - All records from the original FIT (all fields). Must have the same count as points.
 * @param {object|null} session - First session from the original FIT (for full-field copying)
 * @param {object|null} lap - First lap from the original FIT (for full-field copying)
 * @returns {Blob}
 */
export function writeFITWithWriter(points, rawRecords, session, lap) {
  if (points.length === 0) return new Blob([], { type: 'application/octet-stream' });
  const firstDate = new Date(points[0].timestamp);
  const lastDate = new Date(points[points.length - 1].timestamp);
  const totalTimerTimeSec = Math.max(0, (lastDate.getTime() - firstDate.getTime()) / 1000);

  const distances = [0];
  const speeds = [0];
  for (let i = 1; i < points.length; i++) {
    const segM = haversineM(points[i - 1].lat, points[i - 1].lng, points[i].lat, points[i].lng);
    distances.push(distances[i - 1] + segM);
    const dtSec = (points[i].timestamp - points[i - 1].timestamp) / 1000;
    speeds.push(dtSec > 0 ? segM / dtSec : 0);
  }
  const hasRawDistance = rawRecords && rawRecords.length === points.length &&
    rawRecords[rawRecords.length - 1] && typeof rawRecords[rawRecords.length - 1].distance === 'number' &&
    Number.isFinite(rawRecords[rawRecords.length - 1].distance);
  const fallbackTotalDistanceM = hasRawDistance ? (rawRecords[rawRecords.length - 1].distance ?? 0) : (distances[points.length - 1] ?? 0);
  let fallbackMaxSpeedMps = 0;
  if (hasRawDistance && rawRecords) {
    for (let i = 0; i < rawRecords.length; i++) {
      const r = rawRecords[i];
      const s = (r && typeof r.speed === 'number' && Number.isFinite(r.speed)) ? r.speed : (r && typeof r.enhanced_speed === 'number' && Number.isFinite(r.enhanced_speed)) ? r.enhanced_speed : null;
      if (s != null && s >= 0 && s > fallbackMaxSpeedMps) fallbackMaxSpeedMps = s;
    }
  } else if (speeds.length > 0) {
    fallbackMaxSpeedMps = Math.max(...speeds);
  }
  const fallbackAvgSpeedMps = totalTimerTimeSec > 0 ? fallbackTotalDistanceM / totalTimerTimeSec : 0;

  const degToSemi = (deg) => Math.round(deg * DEG_TO_SEMICIRCLES);
  const firstLat = points[0].lat;
  const firstLon = points[0].lng;

  const fitWriter = new FitWriter();
  const start = fitWriter.time(firstDate);
  fitWriter.writeMessage('file_id', {
    type: 'activity',
    manufacturer: 'garmin',
    product: 0,
    serial_number: 0,
    time_created: start,
    product_name: 'track-remap',
  }, null, true);
  fitWriter.writeMessage('activity', {
    total_timer_time: totalTimerTimeSec,
    num_sessions: 1,
    type: 'manual',
    timestamp: start,
    local_timestamp: start - firstDate.getTimezoneOffset() * 60,
  }, null, true);

  const sessionBase = {
    timestamp: start,
    start_time: start,
    total_elapsed_time: totalTimerTimeSec,
    total_timer_time: totalTimerTimeSec,
    start_position_lat: degToSemi(firstLat),
    start_position_long: degToSemi(firstLon),
  };
  const sessionFields = { ...sessionBase, sport: 'cycling' };
  if (session && typeof session === 'object') {
    for (const k of SESSION_COPY_KEYS) {
      if (session[k] !== undefined && session[k] !== null) sessionFields[k] = session[k];
    }
  }
  sessionFields.sub_sport = 'virtual_activity';
  if (sessionFields.total_distance == null) sessionFields.total_distance = fallbackTotalDistanceM;
  if (sessionFields.avg_speed == null) sessionFields.avg_speed = fallbackAvgSpeedMps;
  if (sessionFields.max_speed == null) sessionFields.max_speed = fallbackMaxSpeedMps;
  if (sessionFields.total_moving_time == null) sessionFields.total_moving_time = totalTimerTimeSec;
  fitWriter.writeMessage('session', sessionFields, null, true);

  const lapBase = {
    timestamp: start,
    start_time: start,
    total_elapsed_time: totalTimerTimeSec,
    total_timer_time: totalTimerTimeSec,
    start_position_lat: degToSemi(firstLat),
    start_position_long: degToSemi(firstLon),
    end_position_lat: degToSemi(points[points.length - 1].lat),
    end_position_long: degToSemi(points[points.length - 1].lng),
  };
  const lapFields = { ...lapBase, sport: 'cycling' };
  if (lap && typeof lap === 'object') {
    for (const k of LAP_COPY_KEYS) {
      if (lap[k] !== undefined && lap[k] !== null) lapFields[k] = lap[k];
    }
  }
  lapFields.sub_sport = 'virtual_activity';
  if (lapFields.total_distance == null) lapFields.total_distance = fallbackTotalDistanceM;
  if (lapFields.avg_speed == null) lapFields.avg_speed = fallbackAvgSpeedMps;
  if (lapFields.max_speed == null) lapFields.max_speed = fallbackMaxSpeedMps;
  if (lapFields.total_moving_time == null) lapFields.total_moving_time = totalTimerTimeSec;
  fitWriter.writeMessage('lap', lapFields, null, true);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const date = new Date(p.timestamp);
    const timestamp = fitWriter.time(date);
    const raw = rawRecords && rawRecords[i] && typeof rawRecords[i] === 'object' ? rawRecords[i] : {};
    const recordFields = {};
    for (const key of RECORD_COPY_KEYS) {
      if (RECORD_POSITION_KEYS.indexOf(key) !== -1) continue;
      const v = raw[key];
      if (v !== undefined && v !== null && (typeof v !== 'number' || Number.isFinite(v))) {
        recordFields[key] = v;
      }
    }
    if (recordFields.cadence == null && recordFields.fractional_cadence != null && Number.isFinite(recordFields.fractional_cadence)) {
      recordFields.cadence = Math.round(recordFields.fractional_cadence);
    }
    recordFields.timestamp = timestamp;
    const rawDist = raw.distance;
    const rawSpd = (raw.speed != null && Number.isFinite(raw.speed)) ? raw.speed : (raw.enhanced_speed != null && Number.isFinite(raw.enhanced_speed)) ? raw.enhanced_speed : null;
    recordFields.distance = (rawDist != null && Number.isFinite(rawDist)) ? rawDist : distances[i];
    delete recordFields.position_lat;
    delete recordFields.position_long;
    recordFields.position_lat = degToSemi(p.lat);
    recordFields.position_long = degToSemi(p.lng);
    if (rawSpd != null && rawSpd >= 0) {
      recordFields.speed = rawSpd;
      recordFields.enhanced_speed = rawSpd;
    } else if (speeds[i] != null && speeds[i] >= 0) {
      recordFields.speed = speeds[i];
      recordFields.enhanced_speed = speeds[i];
    }
    if (p.altitude != null && Number.isFinite(p.altitude)) recordFields.altitude = p.altitude;
    fitWriter.writeMessage('record', recordFields, null, i === points.length - 1);
  }
  const dataView = fitWriter.finish();
  const uint8 = new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength);
  return new Blob([uint8], { type: 'application/octet-stream' });
}
