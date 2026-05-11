import FitParser from 'fit-file-parser';
import { getFITRecordsAndBounds } from './fitRecords.js';
import { pathToLatLng, haversineM } from './geo.js';
import { writeFITWithWriter } from './fitWrite.js';

/**
 * Apply an image-derived route array to a FIT file. When options are omitted, the FIT bounds are used as-is.
 * @param {{ path: number[][], width: number, height: number }} imagePathResult - Return value of imageFromFile / imageFromURL
 * @param {File|ArrayBuffer} fitFileOrBuffer - Route FIT File or ArrayBuffer
 * @param {{ center?: { lat: number, lng: number } }} [options] - Optional. Override the route center with center
 * @returns {Promise<{ appliedPoints: { lat: number, lng: number, timestamp?: number }[], fitBlob?: Blob }>}
 */
export async function applyPathToFIT(imagePathResult, fitFileOrBuffer, options = {}) {
  const buffer = fitFileOrBuffer instanceof ArrayBuffer
    ? fitFileOrBuffer
    : await (fitFileOrBuffer instanceof File ? fitFileOrBuffer.arrayBuffer() : Promise.resolve(fitFileOrBuffer));
  const fitParser = new FitParser({ force: true, mode: 'both' });
  const uint8 = new Uint8Array(buffer);
  const fitObject = await fitParser.parseAsync(uint8.buffer);
  const { records, rawRecords, bounds: rawBounds, totalDistanceM: originalTotalDistanceM } = getFITRecordsAndBounds(fitObject);
  const firstSession = fitObject.sessions && fitObject.sessions[0] ? fitObject.sessions[0] : null;
  const firstLap = firstSession && firstSession.laps && firstSession.laps[0] ? firstSession.laps[0] : null;
  if (records.length === 0) throw new Error('FIT file contains no records');
  const path = imagePathResult.path;
  if (!path || path.length < 2) throw new Error('No image route found. Please load an image and create a route first');
  let bounds = rawBounds;
  if (options.center && typeof options.center.lat === 'number' && typeof options.center.lng === 'number') {
    const spanLat = rawBounds.maxLat - rawBounds.minLat;
    const spanLng = rawBounds.maxLng - rawBounds.minLng;
    bounds = {
      minLat: options.center.lat - spanLat / 2,
      maxLat: options.center.lat + spanLat / 2,
      minLng: options.center.lng - spanLng / 2,
      maxLng: options.center.lng + spanLng / 2,
    };
  }
  const centerLat = (bounds.minLat + bounds.maxLat) / 2;
  const spanLat = bounds.maxLat - bounds.minLat;
  const centerLng = (bounds.minLng + bounds.maxLng) / 2;
  const cosLat = Math.max(1e-6, Math.cos((centerLat * Math.PI) / 180));
  const aspect = (imagePathResult.width || 1) / (imagePathResult.height || 1);
  const spanLngCorrected = (spanLat * aspect) / cosLat;
  bounds = {
    minLat: bounds.minLat,
    maxLat: bounds.maxLat,
    minLng: centerLng - spanLngCorrected / 2,
    maxLng: centerLng + spanLngCorrected / 2,
  };
  let latLngs = pathToLatLng(path, bounds, records.length);
  if (originalTotalDistanceM > 0 && latLngs.length >= 2) {
    let pathLengthM = 0;
    for (let i = 1; i < latLngs.length; i++) {
      pathLengthM += haversineM(latLngs[i - 1].lat, latLngs[i - 1].lng, latLngs[i].lat, latLngs[i].lng);
    }
    if (pathLengthM > 0) {
      const k = originalTotalDistanceM / pathLengthM;
      const cLat = (bounds.minLat + bounds.maxLat) / 2;
      const cLng = (bounds.minLng + bounds.maxLng) / 2;
      latLngs = latLngs.map((p) => ({
        lat: cLat + (p.lat - cLat) * k,
        lng: cLng + (p.lng - cLng) * k,
      }));
    }
  }
  const baseTime = records[0].timestamp != null ? (typeof records[0].timestamp === 'number' ? records[0].timestamp : new Date(records[0].timestamp).getTime()) : Date.now();
  const interval = records.length > 1 && records[records.length - 1].timestamp != null
    ? ((typeof records[records.length - 1].timestamp === 'number' ? records[records.length - 1].timestamp : new Date(records[records.length - 1].timestamp).getTime()) - baseTime) / (records.length - 1)
    : 1;
  const appliedPoints = latLngs.map((p, i) => ({
    lat: p.lat,
    lng: p.lng,
    timestamp: baseTime + i * interval,
    altitude: records[i].altitude,
  }));
  const fitBlob = writeFITWithWriter(appliedPoints, rawRecords, firstSession, firstLap);
  return { appliedPoints, fitBlob };
}
