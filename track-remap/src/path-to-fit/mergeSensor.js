import FitParser from 'fit-file-parser';
import {
  RECORD_COPY_KEYS,
  RECORD_POSITION_KEYS,
  SESSION_SENSOR_OVERRIDE_KEYS,
  LAP_SENSOR_OVERRIDE_KEYS,
} from './fitConstants.js';
import { getFITRecordsAndBounds } from './fitRecords.js';
import { toTimestampMs, writeFITWithWriter } from './fitWrite.js';

/**
 * Merge route points with a sensor FIT file. Heart rate is matched by absolute timestamp. Options are optional.
 * @param {{ lat: number, lng: number, timestamp: number, altitude?: number }[]} appliedPoints - appliedPoints from the return value of applyPathToFIT
 * @param {File|ArrayBuffer|Blob} sensorFitFileOrBuffer - Heart-rate Garmin FIT
 * @param {{ routeFitForSessionLap?: Blob|ArrayBuffer|File }} [options] - Optional. When specified, session/lap is supplemented based on the route side
 * @returns {Promise<{ fitBlob: Blob, appliedPoints: { lat: number, lng: number, timestamp: number }[] }>}
 */
export async function mergeFITSensorData(appliedPoints, sensorFitFileOrBuffer, options = {}) {
  const isPointsArray = Array.isArray(appliedPoints) && appliedPoints.length > 0 &&
    typeof appliedPoints[0] === 'object' && typeof appliedPoints[0].lat === 'number' && typeof appliedPoints[0].lng === 'number';
  if (!isPointsArray) throw new Error('First argument of mergeFITSensorData must be appliedPoints from applyPathToFIT');

  const points = appliedPoints.map((p) => ({
    lat: p.lat,
    lng: p.lng,
    timestamp: typeof p.timestamp === 'number' ? p.timestamp : new Date(p.timestamp).getTime(),
    altitude: p.altitude != null && Number.isFinite(p.altitude) ? p.altitude : undefined,
  }));

  const sensorBuffer = sensorFitFileOrBuffer instanceof ArrayBuffer
    ? sensorFitFileOrBuffer
    : await (sensorFitFileOrBuffer instanceof Blob
      ? sensorFitFileOrBuffer.arrayBuffer()
      : sensorFitFileOrBuffer.arrayBuffer());

  const sensorObj = await new FitParser({ force: true, mode: 'both' }).parseAsync(new Uint8Array(sensorBuffer).buffer);
  const sensorData = getFITRecordsAndBounds(sensorObj);
  const { rawRecords: sensorRawRecords } = sensorData;
  if (sensorRawRecords.length === 0) throw new Error('Sensor FIT file contains no records');

  const sensorFirstSession = sensorObj.sessions?.[0] ?? null;
  const sensorFirstLap = sensorFirstSession?.laps?.[0] ?? null;
  const sensorTimestampsMs = sensorRawRecords.map((r) => toTimestampMs(r));

  let routeFirstSession = null;
  let routeFirstLap = null;
  let routeRawRecords = null;
  const routeFitBlob = options.routeFitForSessionLap;
  if (routeFitBlob) {
    try {
      const routeBuf = routeFitBlob instanceof ArrayBuffer
        ? routeFitBlob
        : await (routeFitBlob instanceof Blob ? routeFitBlob.arrayBuffer() : routeFitBlob.arrayBuffer());
      const routeObj = await new FitParser({ force: true, mode: 'both' }).parseAsync(new Uint8Array(routeBuf).buffer);
      routeFirstSession = routeObj.sessions?.[0] ?? null;
      routeFirstLap = routeFirstSession?.laps?.[0] ?? null;
      const routeData = getFITRecordsAndBounds(routeObj);
      if (routeData.rawRecords.length === points.length) {
        routeRawRecords = routeData.rawRecords;
      }
    } catch (_) { /* ignore */ }
  }

  const mergedRawRecords = [];
  for (let i = 0; i < points.length; i++) {
    const t = points[i].timestamp;
    let best = 0;
    let bestDiff = Math.abs(sensorTimestampsMs[0] - t);
    for (let j = 1; j < sensorRawRecords.length; j++) {
      const d = Math.abs(sensorTimestampsMs[j] - t);
      if (d < bestDiff) {
        bestDiff = d;
        best = j;
      }
    }
    const sensorIdx = best;
    const sensorRecord = sensorRawRecords[sensorIdx] || {};
    const routeRecord = {};
    if (routeRawRecords && routeRawRecords[i]) {
      const rrec = routeRawRecords[i];
      for (const k of RECORD_COPY_KEYS) {
        if (RECORD_POSITION_KEYS.indexOf(k) !== -1 || k === 'heart_rate') continue;
        const v = rrec[k];
        if (v !== undefined && v !== null && (typeof v !== 'number' || Number.isFinite(v))) {
          routeRecord[k] = v;
        }
      }
      if (rrec.distance !== undefined && rrec.distance !== null && Number.isFinite(rrec.distance)) {
        routeRecord.distance = rrec.distance;
      }
      if (rrec.speed !== undefined && rrec.speed !== null && Number.isFinite(rrec.speed)) {
        routeRecord.speed = rrec.speed;
      }
      if (rrec.enhanced_speed !== undefined && rrec.enhanced_speed !== null && Number.isFinite(rrec.enhanced_speed)) {
        routeRecord.enhanced_speed = rrec.enhanced_speed;
      }
    }
    const hrVal = sensorRecord.heart_rate;
    if (hrVal !== undefined && hrVal !== null && (typeof hrVal !== 'number' || Number.isFinite(hrVal))) {
      routeRecord.heart_rate = hrVal;
    }
    if (!routeRawRecords || !routeRawRecords[i]) {
      for (const k of RECORD_COPY_KEYS) {
        if (RECORD_POSITION_KEYS.indexOf(k) !== -1) continue;
        const v = sensorRecord[k];
        if (v !== undefined && v !== null && (typeof v !== 'number' || Number.isFinite(v))) {
          routeRecord[k] = v;
        }
      }
    }
    mergedRawRecords.push(routeRecord);
  }

  const mergedSession = routeFirstSession && typeof routeFirstSession === 'object'
    ? { ...routeFirstSession }
    : {};
  if (sensorFirstSession && typeof sensorFirstSession === 'object') {
    for (const k of SESSION_SENSOR_OVERRIDE_KEYS) {
      if (sensorFirstSession[k] !== undefined && sensorFirstSession[k] !== null) {
        mergedSession[k] = sensorFirstSession[k];
      }
    }
  }
  const mergedLap = routeFirstLap && typeof routeFirstLap === 'object'
    ? { ...routeFirstLap }
    : {};
  if (sensorFirstLap && typeof sensorFirstLap === 'object') {
    for (const k of LAP_SENSOR_OVERRIDE_KEYS) {
      if (sensorFirstLap[k] !== undefined && sensorFirstLap[k] !== null) {
        mergedLap[k] = sensorFirstLap[k];
      }
    }
  }

  const fitBlob = writeFITWithWriter(points, mergedRawRecords, mergedSession, mergedLap);
  return { fitBlob, appliedPoints: points };
}
