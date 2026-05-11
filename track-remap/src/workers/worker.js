/**
 * Web Worker: runs FIT parsing, path application, and merging on a separate thread to avoid blocking the main thread.
 * Message: { imagePathResult, routeArrayBuffer, sensorArrayBuffer?, center? }
 * Returns: { appliedPoints, fitArrayBuffer } or { error: string }
 */
import { applyPathToFIT, mergeFITSensorData } from '../index.js';

self.onmessage = async function (e) {
  const { imagePathResult, routeArrayBuffer, sensorArrayBuffer, center } = e.data || {};
  try {
    if (!imagePathResult || !routeArrayBuffer) {
      throw new Error('imagePathResult and routeArrayBuffer are required');
    }
    const applyOpts = {};
    if (center && typeof center.lat === 'number' && typeof center.lng === 'number') applyOpts.center = center;
    let result = await applyPathToFIT(imagePathResult, routeArrayBuffer, applyOpts);
    if (sensorArrayBuffer) {
      const mergeResult = await mergeFITSensorData(result.appliedPoints, sensorArrayBuffer, {
        routeFitForSessionLap: result.fitBlob,
      });
      result = {
        appliedPoints: mergeResult.appliedPoints,
        fitBlob: mergeResult.fitBlob,
      };
    }
    const fitArrayBuffer = await result.fitBlob.arrayBuffer();
    self.postMessage(
      { appliedPoints: result.appliedPoints, fitArrayBuffer },
      [fitArrayBuffer],
    );
  } catch (err) {
    self.postMessage({ error: err && err.message ? err.message : String(err) });
  }
};
