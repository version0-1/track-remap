/**
 * Track remap: generate a single-stroke path from an image and apply it to an activity file (currently FIT).
 * Image → path is handled by image-to-path; application and merging to files is handled by path-to-fit (within the same package).
 * Image APIs are re-exported from here (imageFromFile / imageFromURL).
 * FIT output for Garmin uses @markw65/fit-file-writer (same as the bike project).
 */
import FitParser from 'fit-file-parser';
import {
  fromURL,
  fromFile as imageFromFile,
  preprocessGrayFromFile,
  preprocessGrayFromArrayBuffer,
  preprocessGrayFromURL,
  pathFromGray,
  grayToRgba,
  edgePreviewFromGray,
  edgesFromGray,
  centerlineFromGray,
} from './image-to-path/index.js';
import { extractPoints } from './path-to-fit/fitRecords.js';
import { routeToDataURL } from './path-to-fit/routePreview.js';
import { applyPathToFIT } from './path-to-fit/applyPath.js';
import { mergeFITSensorData } from './path-to-fit/mergeSensor.js';

export {
  imageFromFile,
  fromURL as imageFromURL,
  preprocessGrayFromFile as imagePreprocessGrayFromFile,
  preprocessGrayFromArrayBuffer as imagePreprocessGrayFromArrayBuffer,
  preprocessGrayFromURL as imagePreprocessGrayFromURL,
  pathFromGray as imagePathFromGray,
  grayToRgba as imageGrayToRgba,
  edgePreviewFromGray as imageEdgePreviewFromGray,
  edgesFromGray as imageEdgesFromGray,
  centerlineFromGray as imageCenterlineFromGray,
};

export { applyPathToFIT, mergeFITSensorData };

/**
 * Generate a single-stroke path from a FIT file (File). Uses image-to-path defaults when options are omitted.
 * @param {File} file - .fit file
 * @param {object} [options] - Options passed to image-to-path (maxPoints, maxSize, thresholdLow, thresholdHigh, thinEdges, etc.). Optional.
 * @returns {Promise<{ path: number[][], width: number, height: number, points?: { lat: number, lng: number }[] }>}
 */
export function fromFile(file, options = {}) {
  return file.arrayBuffer().then((buffer) => fromArrayBuffer(buffer, options));
}

/**
 * Generate a single-stroke path from a FIT ArrayBuffer
 * @param {ArrayBuffer} buffer - FIT file binary
 * @param {object} [options] - Options passed to image-to-path
 * @returns {Promise<{ path: number[][], width: number, height: number, points?: { lat: number, lng: number }[] }>}
 */
export async function fromArrayBuffer(buffer, options = {}) {
  const fitParser = new FitParser({ force: true, mode: 'cascade' });
  const uint8 = new Uint8Array(buffer);
  const fitObject = await fitParser.parseAsync(uint8.buffer);

  const points = extractPoints(fitObject);
  if (points.length < 2) {
    throw new Error('FIT file has fewer than 2 position points');
  }

  const routeOpts = {
    width: options.routeWidth ?? 800,
    lineWidth: options.routeLineWidth ?? 2,
    padding: options.routePadding ?? 20,
  };
  const dataUrl = routeToDataURL(points, routeOpts);

  const pathOpts = {
    maxPoints: options.maxPoints,
    maxSize: options.maxSize,
    thresholdLow: options.thresholdLow,
    thresholdHigh: options.thresholdHigh,
    thinEdges: options.thinEdges,
  };
  const result = await fromURL(dataUrl, pathOpts);
  result.points = points;
  return result;
}
