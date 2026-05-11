/**
 * Image to single-stroke path (public API for the image-to-path module in the track-remap package)
 */

import { fileToBitmap, urlToBitmap, loadGrayImageData } from './image.js';
import { runPipeline, edgesFromGray, normalizePipelineOptions } from './pipeline.js';
import { computePathMetrics } from './metrics.js';
import { grayToRgba, edgePreviewFromGray } from './preview.js';
import { centerlineFromGray } from './centerline.js';

/**
 * Options. Falls back to library defaults when omitted (independent of demo input values).
 * @typedef {Object} ImageToPathOptions
 * @property {'density'|'strokeTrace'} [routeMode='density'] - density = edge points + TSP (for photos), strokeTrace = thin-line graph trace (for line art)
 * @property {number} [maxPoints=1500] - Number of path points
 * @property {number} [maxSize=0] - Max pixels for the longest image edge. 0 keeps the original size
 * @property {number} [thresholdLow=50] - Canny weak-edge threshold (when routeMode is density)
 * @property {number} [thresholdHigh=150] - Canny strong-edge threshold (when routeMode is density)
 * @property {boolean} [thinEdges=false] - When true, thin edges to 1-pixel width (when routeMode is density and useCenterline is false)
 * @property {boolean} [useCenterline=false] - Use centerline instead of Canny when true (when routeMode is density). Ignored when edgesOverride is also specified (override takes priority)
 * @property {number} [inkThreshold=200] - Pixels with luminance below this value are treated as ink (0–255). Used in strokeTrace / density+useCenterline modes
 * @property {Uint8ClampedArray} [edgesOverride] - width × height. Skips Canny/centerline when routeMode is density. Used as thin-line mask in strokeTrace mode. Takes priority over useCenterline when specified
 * @property {'avoidInk'|'straight'} [bridgeMode='avoidInk'] - In strokeTrace, whether to bridge chains via A* on white pixels or use straight lines only
 * @property {number} [maxBridgeSteps] - Max expansion count for bridge A*. Defaults to min(width × height × 4, ~750,000) with a cap
 * @property {(p: { message: string, preview?: { path: number[][], width: number, height: number } }) => void} [onProgress] - Processing stage and route preview update callback
 */

function loadOptsFromImageOptions(options) {
  return {
    maxSize: options.maxSize ?? 0,
  };
}

function pipelineOptsFromImageOptions(options) {
  return normalizePipelineOptions({
    maxPoints: options.maxPoints,
    thresholdLow: options.thresholdLow,
    thresholdHigh: options.thresholdHigh,
    thinEdges: options.thinEdges,
    useCenterline: options.useCenterline,
    inkThreshold: options.inkThreshold,
    edgesOverride: options.edgesOverride,
    routeMode: options.routeMode,
    bridgeMode: options.bridgeMode,
    maxBridgeSteps: options.maxBridgeSteps,
    onProgress: options.onProgress,
  });
}

function withMetrics(result) {
  return {
    ...result,
    metrics: computePathMetrics(result.path),
  };
}

/**
 * Generate a single-stroke path from preprocessed grayscale (route creation only)
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {ImageToPathOptions} [options]
 * @returns {{ path: number[][], width: number, height: number, modeUsed: string, metrics: { points: number, length: number, selfIntersections: number } }}
 */
export function pathFromGray(gray, options = {}) {
  const routeMode = options.routeMode ?? 'density';
  const basic = runPipeline(gray, pipelineOptsFromImageOptions(options));
  return withMetrics({ ...basic, modeUsed: routeMode });
}

/**
 * Preprocess only from a File (resize and BT.601 luminance). Does not run Canny / TSP.
 * @param {File} file
 * @param {ImageToPathOptions} [options]
 * @returns {Promise<{ data: Uint8ClampedArray, width: number, height: number }>}
 */
export function preprocessGrayFromFile(file, options = {}) {
  return fileToBitmap(file).then((bitmap) => {
    const gray = loadGrayImageData(bitmap, loadOptsFromImageOptions(options));
    bitmap.close();
    return gray;
  });
}

/**
 * Preprocess only from an ArrayBuffer
 * @param {ArrayBuffer} arrayBuffer
 * @param {ImageToPathOptions} [options]
 * @returns {Promise<{ data: Uint8ClampedArray, width: number, height: number }>}
 */
export function preprocessGrayFromArrayBuffer(arrayBuffer, options = {}) {
  const blob = new Blob([arrayBuffer]);
  return createImageBitmap(blob).then((bitmap) => {
    const gray = loadGrayImageData(bitmap, loadOptsFromImageOptions(options));
    bitmap.close();
    return gray;
  });
}

/**
 * Preprocess only from a URL
 * @param {string} url
 * @param {ImageToPathOptions} [options]
 * @returns {Promise<{ data: Uint8ClampedArray, width: number, height: number }>}
 */
export function preprocessGrayFromURL(url, options = {}) {
  return urlToBitmap(url).then((bitmap) => {
    const gray = loadGrayImageData(bitmap, loadOptsFromImageOptions(options));
    bitmap.close();
    return gray;
  });
}

/**
 * Generate a single-stroke path from a File. Uses defaults (maxPoints=1500, routeMode=density, etc.) when options are omitted.
 * @param {File} file - Image File
 * @param {ImageToPathOptions} [options]
 * @returns {Promise<{ path: number[][], width: number, height: number, modeUsed?: string, metrics?: { points: number, length: number, selfIntersections: number } }>}
 */
export function fromFile(file, options = {}) {
  return preprocessGrayFromFile(file, options).then((gray) => pathFromGray(gray, options));
}

/**
 * Generate a single-stroke path from a URL. Uses defaults when options are omitted.
 * @param {string} url - Image URL
 * @param {ImageToPathOptions} [options]
 * @returns {Promise<{ path: number[][], width: number, height: number, modeUsed?: string, metrics?: { points: number, length: number, selfIntersections: number } }>}
 */
export function fromURL(url, options = {}) {
  return preprocessGrayFromURL(url, options).then((gray) => pathFromGray(gray, options));
}

/**
 * Generate a single-stroke path from an ArrayBuffer (image binary). Available inside Workers.
 * @param {ArrayBuffer} arrayBuffer - Image file ArrayBuffer
 * @param {ImageToPathOptions} [options]
 * @returns {Promise<{ path: number[][], width: number, height: number, modeUsed?: string, metrics?: { points: number, length: number, selfIntersections: number } }>}
 */
export function fromArrayBuffer(arrayBuffer, options = {}) {
  return preprocessGrayFromArrayBuffer(arrayBuffer, options).then((gray) => pathFromGray(gray, options));
}

export { grayToRgba, edgePreviewFromGray, edgesFromGray, centerlineFromGray };
