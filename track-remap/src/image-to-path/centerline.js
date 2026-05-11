/**
 * Apply Zhang–Suen thinning to binarized ink regions to obtain the centerline (skeleton), avoiding double edges on thick strokes.
 */

import { thinEdges } from './points.js';

/**
 * Generate a centerline mask from a grayscale image (assumes white background with black lines: pixels below the threshold are treated as ink).
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {{ inkThreshold?: number }} [options]
 * @returns {Uint8ClampedArray} width × height, centerline pixels are non-zero
 */
export function centerlineFromGray(gray, options = {}) {
  const inkThreshold = options.inkThreshold ?? 200;
  const { data, width, height } = gray;
  const binary = new Uint8ClampedArray(width * height);
  for (let i = 0; i < width * height; i++) {
    binary[i] = data[i] < inkThreshold ? 255 : 0;
  }
  return thinEdges(binary, width, height);
}
