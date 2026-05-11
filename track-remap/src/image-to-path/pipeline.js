/**
 * Pipeline: image → single-stroke path by modality (in image coordinates before normalization)
 * - density: edge point sampling + TSP (for tonal images and photos)
 * - strokeTrace: thin-line mask graph trace (for line art)
 */

import { canny } from './canny.js';
import { centerlineFromGray } from './centerline.js';
import { assertEdgesOverride } from './pipeline-utils.js';
import { edgePoints, samplePoints, thinEdges } from './points.js';
import { pathFromThinMask, resamplePathByArcLength } from './strokeTrace.js';
import {
  distanceMatrix,
  nearestNeighbourOrder,
  convexHullInsertionOrder,
  twoOpt,
  orderToPath,
  closedPathLengthFromMatrix,
  TSP_DISTANCE_MATRIX_MAX_POINTS,
} from './tsp.js';

/**
 * @param {number[][]} path
 * @param {number} width
 * @param {number} height
 * @returns {number[][]}
 */
function normalizePath(path, width, height) {
  return path.map(([x, y]) => [x / width, y / height]);
}

/**
 * @param {{ message: string, preview?: { path: number[][], width: number, height: number } }} payload
 */
function emitProgress(onProgress, payload) {
  if (typeof onProgress === 'function') onProgress(payload);
}

const PREVIEW_THROTTLE_MS = 220;
const TWO_OPT_PROGRESS_EVERY = 55;

/**
 * When both edgesOverride and useCenterline are specified, no exception is thrown; edgesOverride takes priority (useCenterline is ignored).
 * @param {object} [options]
 * @returns {object}
 */
export function normalizePipelineOptions(options) {
  if (options == null || typeof options !== 'object') return {};
  const out = { ...options };
  if (out.edgesOverride != null) {
    out.useCenterline = false;
  }
  return out;
}

/**
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {object} options
 * @returns {{ path: number[][], width: number, height: number }}
 */
function runDensityPipeline(gray, options) {
  const maxPoints = options.maxPoints ?? 1500;
  const thresholdLow = options.thresholdLow ?? 50;
  const thresholdHigh = options.thresholdHigh ?? 150;
  const doThinEdges = options.thinEdges === true;
  const useCenterline = options.useCenterline === true;
  const inkThreshold = options.inkThreshold ?? 200;
  const onProgress = options.onProgress;
  const previewThrottleMs = PREVIEW_THROTTLE_MS;
  const twoOptProgressEvery = TWO_OPT_PROGRESS_EVERY;
  const { width, height } = gray;

  const override = options.edgesOverride;
  emitProgress(onProgress, {
    message: useCenterline ? 'Extracting centerline (skeleton)…' : 'Detecting edges…',
  });
  let edges;
  if (override != null) {
    assertEdgesOverride(override, width, height);
    edges = new Uint8ClampedArray(override);
  } else if (useCenterline) {
    edges = centerlineFromGray(gray, { inkThreshold });
  } else {
    edges = canny(gray, { low: thresholdLow, high: thresholdHigh });
    if (doThinEdges) edges = thinEdges(edges, width, height);
  }
  emitProgress(onProgress, { message: 'Extracting contour points…' });
  let points = edgePoints(edges, width, height);
  if (points.length === 0) throw new Error('No edge points found. Try different threshold.');
  points = samplePoints(points, maxPoints);
  if (points.length < 2) throw new Error('Too few points after sampling.');
  emitProgress(onProgress, { message: 'Sampling done (' + points.length + ' pts)' });

  let tspPoints = points;
  if (tspPoints.length > TSP_DISTANCE_MATRIX_MAX_POINTS) {
    tspPoints = samplePoints(points, TSP_DISTANCE_MATRIX_MAX_POINTS);
    emitProgress(onProgress, {
      message:
        'TSP: using ' +
        TSP_DISTANCE_MATRIX_MAX_POINTS +
        ' points (cap; had ' +
        points.length +
        ' sampled) to avoid out-of-memory…',
    });
  }

  emitProgress(onProgress, { message: 'Computing distance matrix…' });
  const D = distanceMatrix(tspPoints);
  const n = tspPoints.length;

  const runs = [];
  runs.push(nearestNeighbourOrder(D, 0));
  if (n > 3) {
    runs.push(nearestNeighbourOrder(D, Math.max(0, Math.floor(n / 3))));
    runs.push(nearestNeighbourOrder(D, Math.max(0, Math.floor((2 * n) / 3))));
    runs.push(convexHullInsertionOrder(D, tspPoints));
  }

  let lastPreviewAt = 0;
  const previewNow = typeof performance !== 'undefined' && performance.now ? () => performance.now() : () => Date.now();
  const emitPreviewFromOrder = (order, message) => {
    if (!onProgress) return;
    const t = previewNow();
    if (t - lastPreviewAt < previewThrottleMs) return;
    lastPreviewAt = t;
    const pathRaw = orderToPath(tspPoints, order, true);
    const pathNorm = normalizePath(pathRaw, width, height);
    emitProgress(onProgress, {
      message: message || 'Updating route…',
      preview: { path: pathNorm, width, height },
    });
  };

  emitPreviewFromOrder(runs[0], 'Initial route (nearest neighbor)');

  let bestOrder = runs[0];
  let bestScore = closedPathLengthFromMatrix(D, bestOrder);
  const twoOptBase = {};
  const twoOptOpts = onProgress
    ? {
        ...twoOptBase,
        progressEvery: twoOptProgressEvery,
        onProgress: ({ order }) => emitPreviewFromOrder(order, '2-opt optimization…'),
      }
    : twoOptBase;

  let runIdx = 0;
  for (const order of runs) {
    runIdx++;
    if (onProgress && runs.length > 1) {
      emitProgress(onProgress, { message: '2-opt trial ' + runIdx + ' / ' + runs.length });
    }
    const { order: improved } = twoOpt(D, order, twoOptOpts);
    const score = closedPathLengthFromMatrix(D, improved);
    if (score < bestScore) {
      bestScore = score;
      bestOrder = improved;
    }
  }

  if (onProgress) {
    lastPreviewAt = 0;
    const pathFinal = orderToPath(tspPoints, bestOrder, true);
    const pathNormFinal = normalizePath(pathFinal, width, height);
    emitProgress(onProgress, {
      message: 'Final route',
      preview: { path: pathNormFinal, width, height },
    });
  }

  let pathPix = orderToPath(tspPoints, bestOrder, true);
  if (pathPix.length > maxPoints) {
    pathPix = resamplePathByArcLength(pathPix, maxPoints);
  }
  const pathNorm = normalizePath(pathPix, width, height);
  return { path: pathNorm, width, height };
}

/**
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {object} options
 * @returns {{ path: number[][], width: number, height: number }}
 */
function runStrokeTracePipeline(gray, options) {
  const maxPoints = options.maxPoints ?? 1500;
  const inkThreshold = options.inkThreshold ?? 200;
  const onProgress = options.onProgress;
  const { width, height } = gray;
  const override = options.edgesOverride;

  emitProgress(onProgress, { message: 'Building thin-line mask…' });
  let mask;
  if (override != null) {
    assertEdgesOverride(override, width, height);
    mask = new Uint8ClampedArray(override);
  } else {
    mask = centerlineFromGray(gray, { inkThreshold });
  }

  emitProgress(onProgress, { message: 'Tracing along graph…' });
  const pathPix = pathFromThinMask(mask, width, height, maxPoints, {
    bridgeMode: options.bridgeMode,
    maxBridgeSteps: options.maxBridgeSteps,
  });
  if (!pathPix || pathPix.length < 2) {
    throw new Error('Stroke too short. Adjust inkThreshold or the image.');
  }
  const pathNorm = normalizePath(pathPix, width, height);
  if (onProgress) {
    emitProgress(onProgress, {
      message: 'Trace complete',
      preview: { path: pathNorm, width, height },
    });
  }
  return { path: pathNorm, width, height };
}

/**
 * Generate a single-stroke path from grayscale ImageData
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {{
 *   routeMode?: 'density'|'strokeTrace',
 *   maxPoints?: number,
 *   thresholdLow?: number,
 *   thresholdHigh?: number,
 *   thinEdges?: boolean,
 *   useCenterline?: boolean,
 *   inkThreshold?: number,
 *   edgesOverride?: Uint8ClampedArray,
 *   bridgeMode?: 'avoidInk'|'straight',
 *   maxBridgeSteps?: number,
 *   onProgress?: (p: { message: string, preview?: { path: number[][], width: number, height: number } }) => void
 * }} [options]
 * @returns {{ path: number[][], width: number, height: number }}
 */
export function runPipeline(gray, options = {}) {
  const opts = normalizePipelineOptions(options);
  const routeMode = opts.routeMode ?? 'density';
  if (routeMode === 'contour') {
    throw new Error('routeMode "contour" (filled silhouette) was removed. Use strokeTrace for line art or density for photos.');
  }
  if (routeMode === 'strokeTrace') return runStrokeTracePipeline(gray, opts);
  return runDensityPipeline(gray, opts);
}

/**
 * Return an edge mask (Canny, or centerline when useCenterline is set). Can be passed to runPipeline as edgesOverride.
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {{ thresholdLow?: number, thresholdHigh?: number, thinEdges?: boolean, useCenterline?: boolean, inkThreshold?: number, routeMode?: string, edgesOverride?: Uint8ClampedArray }} [options]
 * @returns {Uint8ClampedArray}
 */
export function edgesFromGray(gray, options = {}) {
  const opts = normalizePipelineOptions(options);
  const routeMode = opts.routeMode ?? 'density';
  const { width, height } = gray;
  if (routeMode === 'contour') {
    throw new Error('routeMode "contour" (filled silhouette) was removed. Use strokeTrace for line art or density for photos.');
  }
  if (routeMode === 'strokeTrace') {
    if (opts.edgesOverride != null) {
      assertEdgesOverride(opts.edgesOverride, width, height);
      return new Uint8ClampedArray(opts.edgesOverride);
    }
    return centerlineFromGray(gray, { inkThreshold: opts.inkThreshold });
  }
  if (opts.edgesOverride != null) {
    assertEdgesOverride(opts.edgesOverride, width, height);
    return new Uint8ClampedArray(opts.edgesOverride);
  }
  const useCenterline = opts.useCenterline === true;
  if (useCenterline) {
    return centerlineFromGray(gray, { inkThreshold: opts.inkThreshold });
  }
  const thresholdLow = opts.thresholdLow ?? 50;
  const thresholdHigh = opts.thresholdHigh ?? 150;
  const doThinEdges = opts.thinEdges === true;
  let edges = canny(gray, { low: thresholdLow, high: thresholdHigh });
  if (doThinEdges) edges = thinEdges(edges, width, height);
  return edges;
}
