/**
 * Obtain ImageData from a File / URL. Performs alpha compositing, grayscale conversion, resizing, and preprocessing.
 */

import { lumaFromRgb, applyGrayPreprocess } from './preprocess.js';

/**
 * Create an ImageBitmap from a Blob
 * @param {Blob} blob
 * @returns {Promise<ImageBitmap>}
 */
export function createBitmapFromBlob(blob) {
  return createImageBitmap(blob);
}

/**
 * Load an image and return grayscale ImageData.
 * For RGBA images, transparent pixels are composited onto white before processing.
 * Uses OffscreenCanvas inside Workers (since document is unavailable).
 * @param {ImageBitmap|HTMLImageElement} source - Image source
 * @param {{ maxSize?: number }} [options] - When maxSize > 0, the longest edge is resized to this value
 * @returns {{ data: Uint8ClampedArray, width: number, height: number }}
 */
export function loadGrayImageData(source, options = {}) {
  const maxSize = options.maxSize || 0;
  const lumaMode = 'bt601';
  let w = source.width;
  let h = source.height;

  if (maxSize > 0 && Math.max(w, h) > maxSize) {
    const scale = maxSize / Math.max(w, h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }
  const canvas = typeof document !== 'undefined'
    ? document.createElement('canvas')
    : new OffscreenCanvas(w, h);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(source, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  const { data } = imageData;
  const gray = new Uint8ClampedArray(w * h);

  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];
    let R = r, G = g, B = b;
    if (a < 255) {
      const t = a / 255;
      R = (r * t + 255 * (1 - t)) | 0;
      G = (g * t + 255 * (1 - t)) | 0;
      B = (b * t + 255 * (1 - t)) | 0;
    }
    gray[i] = lumaFromRgb(R, G, B, lumaMode);
  }

  return applyGrayPreprocess({ data: gray, width: w, height: h }, {});
}

/**
 * Obtain an ImageBitmap from a File
 * @param {File} file
 * @returns {Promise<ImageBitmap>}
 */
export function fileToBitmap(file) {
  return createImageBitmap(file);
}

/**
 * Obtain an ImageBitmap from a URL
 * @param {string} url
 * @returns {Promise<ImageBitmap>}
 */
export async function urlToBitmap(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const blob = await res.blob();
  return createImageBitmap(blob);
}
