/**
 * Web Worker: runs image → single-stroke path on a separate thread to avoid blocking the main thread.
 * Messages:
 * - Default: { imageArrayBuffer, options? } → decode, preprocess, and generate path
 * - { task: 'pathFromGray', grayData: ArrayBuffer, width, height, options? } → generate path from preprocessed grayscale only
 * Returns: { path, width, height, modeUsed?, metrics? } or { error: string }
 */
import { fromArrayBuffer, pathFromGray } from '../image-to-path/index.js';

/**
 * @param {number} startedAt
 * @returns {(info: string | { message?: string, preview?: { path: unknown, width: number, height: number } }) => void}
 */
function buildProgressPoster(startedAt) {
  return function onProgress(info) {
    const elapsedMs = Date.now() - startedAt;
    if (typeof info === 'string') {
      self.postMessage({ progress: info, elapsedMs });
      return;
    }
    const payload = { progress: info.message || '', elapsedMs };
    if (info.preview && info.preview.path) {
      payload.previewPath = info.preview.path;
      payload.width = info.preview.width;
      payload.height = info.preview.height;
    }
    self.postMessage(payload);
  };
}

self.onmessage = async function (e) {
  const data = e.data || {};
  try {
    if (data.task === 'pathFromGray') {
      const { grayData, width, height, options } = data;
      if (!grayData || !(grayData instanceof ArrayBuffer)) {
        throw new Error('pathFromGray requires grayData (ArrayBuffer)');
      }
      if (width == null || height == null) {
        throw new Error('pathFromGray requires width and height');
      }
      const startedAt = Date.now();
      const gray = { data: new Uint8ClampedArray(grayData), width, height };
      const opts = options ? { ...options } : {};
      if (opts.edgesOverride instanceof ArrayBuffer) {
        opts.edgesOverride = new Uint8ClampedArray(opts.edgesOverride);
      }
      const result = pathFromGray(gray, {
        ...opts,
        onProgress: buildProgressPoster(startedAt),
      });
      self.postMessage({
        path: result.path,
        width: result.width,
        height: result.height,
        modeUsed: result.modeUsed,
        metrics: result.metrics,
        elapsedMs: Date.now() - startedAt,
      });
      return;
    }

    const { imageArrayBuffer, options } = data;
    if (!imageArrayBuffer || !(imageArrayBuffer instanceof ArrayBuffer)) {
      throw new Error('imageArrayBuffer is required');
    }
    const startedAt = Date.now();
    const result = await fromArrayBuffer(imageArrayBuffer, {
      ...(options || {}),
      onProgress: buildProgressPoster(startedAt),
    });
    self.postMessage({
      path: result.path,
      width: result.width,
      height: result.height,
      modeUsed: result.modeUsed,
      metrics: result.metrics,
      elapsedMs: Date.now() - startedAt,
    });
  } catch (err) {
    self.postMessage({ error: err && err.message ? err.message : String(err) });
  }
};
