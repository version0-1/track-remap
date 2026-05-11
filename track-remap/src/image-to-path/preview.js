/**
 * RGBA preview for grayscale / edge images (for Canvas putImageData)
 */

import { gradientMagnitudeRgba } from './canny.js';
import { edgesFromGray } from './pipeline.js';

/**
 * Expand grayscale to RGBA
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @returns {{ data: Uint8ClampedArray, width: number, height: number }}
 */
export function grayToRgba(gray) {
  const { data, width, height } = gray;
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const g = data[i];
    const o = i * 4;
    rgba[o] = g;
    rgba[o + 1] = g;
    rgba[o + 2] = g;
    rgba[o + 3] = 255;
  }
  return { data: rgba, width, height };
}

/**
 * Convert a mask (same format as edgesFromGray) to RGBA with white background and black lines.
 * When edgePreviewStyle is gradient, returns normalized Sobel gradient magnitude as grayscale RGBA (no thinning).
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray - Preprocessed grayscale
 * @param {{
 *   routeMode?: 'density'|'strokeTrace',
 *   thresholdLow?: number,
 *   thresholdHigh?: number,
 *   thinEdges?: boolean,
 *   useCenterline?: boolean,
 *   inkThreshold?: number,
 *   edgePreviewStyle?: 'canny'|'gradient',
 * }} [options]
 * @returns {{ data: Uint8ClampedArray, width: number, height: number }}
 */
export function edgePreviewFromGray(gray, options = {}) {
  const thresholdLow = options.thresholdLow ?? 50;
  const thresholdHigh = options.thresholdHigh ?? 150;
  const cannyOpts = { low: thresholdLow, high: thresholdHigh };
  if (options.edgePreviewStyle === 'gradient') {
    return gradientMagnitudeRgba(gray, cannyOpts);
  }
  const { width, height } = gray;
  const edges = edgesFromGray(gray, options);
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const v = edges[i] > 0 ? 0 : 255;
    const o = i * 4;
    rgba[o] = v;
    rgba[o + 1] = v;
    rgba[o + 2] = v;
    rgba[o + 3] = 255;
  }
  return { data: rgba, width, height };
}
