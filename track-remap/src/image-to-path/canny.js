/**
 * Canny edge detection: Gaussian → Sobel → non-maximum suppression → hysteresis
 * Implemented with parameters close to OpenCV's Canny (kernel size 5 equivalent).
 */

/**
 * 5x5 Gaussian kernel (sigma ≈ 1.4)
 */
const GAUSSIAN_5 = [
  2, 4, 5, 4, 2,
  4, 9, 12, 9, 4,
  5, 12, 15, 12, 5,
  4, 9, 12, 9, 4,
  2, 4, 5, 4, 2,
];
const GAUSSIAN_5_SUM = 159;

/**
 * Apply Gaussian blur to a grayscale image
 * @param {Uint8ClampedArray} src - width * height
 * @param {number} width
 * @param {number} height
 * @returns {Uint8ClampedArray}
 */
function gaussianBlur5(src, width, height) {
  const out = new Uint8ClampedArray(src.length);
  const k = 2; // radius 2 for 5x5
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let wsum = 0;
      for (let dy = -k; dy <= k; dy++) {
        for (let dx = -k; dx <= k; dx++) {
          const nx = Math.max(0, Math.min(width - 1, x + dx));
          const ny = Math.max(0, Math.min(height - 1, y + dy));
          const w = GAUSSIAN_5[(dy + k) * 5 + (dx + k)];
          sum += src[ny * width + nx] * w;
          wsum += w;
        }
      }
      out[y * width + x] = Math.round(sum / wsum);
    }
  }
  return out;
}

/**
 * Compute gradient magnitude and direction with Sobel (3x3)
 * @param {Uint8ClampedArray} src
 * @param {number} width
 * @param {number} height
 * @returns {{ mag: Float32Array, dir: Float32Array }} - dir is in radians
 */
function sobel(src, width, height) {
  const mag = new Float32Array(width * height);
  const dir = new Float32Array(width * height);
  const GX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const GY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0, gy = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const v = src[(y + dy) * width + (x + dx)];
          gx += v * GX[(dy + 1) * 3 + (dx + 1)];
          gy += v * GY[(dy + 1) * 3 + (dx + 1)];
        }
      }
      const i = y * width + x;
      mag[i] = Math.sqrt(gx * gx + gy * gy);
      dir[i] = Math.atan2(gy, gx);
    }
  }
  return { mag, dir };
}

/**
 * Non-maximum suppression: compare with neighbors along gradient direction, set to 0 if not a local maximum
 */
function nonMaxSuppression(mag, dir, width, height) {
  const out = new Float32Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const m = mag[i];
      if (m === 0) continue;
      const d = dir[i];
      const ddeg = (d * 180 / Math.PI + 180) % 180;
      let m1, m2;
      if (ddeg < 22.5 || ddeg >= 157.5) {
        m1 = mag[y * width + (x - 1)];
        m2 = mag[y * width + (x + 1)];
      } else if (ddeg < 67.5) {
        m1 = mag[(y - 1) * width + (x + 1)];
        m2 = mag[(y + 1) * width + (x - 1)];
      } else if (ddeg < 112.5) {
        m1 = mag[(y - 1) * width + x];
        m2 = mag[(y + 1) * width + x];
      } else {
        m1 = mag[(y - 1) * width + (x - 1)];
        m2 = mag[(y + 1) * width + (x + 1)];
      }
      out[i] = m >= m1 && m >= m2 ? m : 0;
    }
  }
  return out;
}

/**
 * Hysteresis thresholding: binarize strong and weak edges. Strong → 255, weak adjacent to strong → 255, otherwise 0
 */
function hysteresis(mag, width, height, low, high) {
  const out = new Uint8ClampedArray(width * height);
  const strong = 255;
  const weak = 50; // marker value (final result is 0 or 255)

  for (let i = 0; i < mag.length; i++) {
    if (mag[i] >= high) out[i] = strong;
    else if (mag[i] >= low) out[i] = weak;
    else out[i] = 0;
  }

  const stack = [];
  for (let i = 0; i < mag.length; i++) {
    if (out[i] === strong) stack.push(i);
  }
  while (stack.length > 0) {
    const i = stack.pop();
    const x = i % width;
    const y = (i / width) | 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        const ni = ny * width + nx;
        if (out[ni] === weak) {
          out[ni] = strong;
          stack.push(ni);
        }
      }
    }
  }
  for (let i = 0; i < out.length; i++) {
    if (out[i] === weak) out[i] = 0;
  }
  return out;
}

/**
 * Percentile value from positive gradients after NMS (0..100, position at p% in ascending order)
 * @param {Float32Array} suppressed
 * @param {number} percentile
 * @returns {number}
 */
function magnitudePercentile(suppressed, percentile) {
  const tmp = [];
  for (let i = 0; i < suppressed.length; i++) {
    const v = suppressed[i];
    if (v > 0) tmp.push(v);
  }
  if (tmp.length === 0) return 1;
  tmp.sort((a, b) => a - b);
  const p = Math.min(100, Math.max(0, percentile));
  const idx = Math.min(tmp.length - 1, Math.max(0, Math.floor((p / 100) * (tmp.length - 1))));
  return tmp[idx];
}

/**
 * @param {{ gaussianPasses?: number }} options
 * @param {number} low
 * @param {number} highOrig - User-specified high (before absolute correction)
 * @param {'absolute'|'percentile'} thresholdMode
 * @returns {number}
 */
function resolveBlurPasses(options, low, highOrig, thresholdMode) {
  if (options.gaussianPasses != null && Number.isFinite(options.gaussianPasses)) {
    return Math.max(1, Math.min(5, Math.round(options.gaussianPasses)));
  }
  if (thresholdMode === 'percentile') {
    return 2;
  }
  let h = highOrig;
  if (h >= 240) {
    h = Math.max(low * 2, 100);
  }
  return h >= 200 ? 3 : 2;
}

/**
 * Apply Canny to grayscale ImageData and return an edge image (0 or 255).
 * When thresholdMode is percentile, thresholds are determined from post-NMS gradients using highPercentile / lowPercentile.
 * When absolute and gaussianPasses is omitted: if high >= 240 then high is corrected; 3 Gaussian passes if high >= 200, otherwise 2.
 * When gaussianPasses is specified, only that number of passes (1–5) is used.
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {{
 *   low?: number,
 *   high?: number,
 *   gaussianPasses?: number,
 *   thresholdMode?: 'absolute'|'percentile',
 *   highPercentile?: number,
 *   lowPercentile?: number,
 * }} [options]
 * @returns {Uint8ClampedArray} - width * height, edges are 255
 */
export function canny(gray, options = {}) {
  let low = options.low ?? 50;
  let high = options.high ?? 150;
  const thresholdMode = options.thresholdMode === 'percentile' ? 'percentile' : 'absolute';
  const { data, width, height } = gray;
  const highOrig = high;

  const passes = resolveBlurPasses(options, low, highOrig, thresholdMode);

  let blurred = gaussianBlur5(data, width, height);
  for (let p = 1; p < passes; p++) {
    blurred = gaussianBlur5(blurred, width, height);
  }
  const { mag, dir } = sobel(blurred, width, height);
  const suppressed = nonMaxSuppression(mag, dir, width, height);

  if (thresholdMode === 'percentile') {
    const hp = Math.min(100, Math.max(0, options.highPercentile ?? 88));
    const lp = Math.min(100, Math.max(0, options.lowPercentile ?? 65));
    let hi = magnitudePercentile(suppressed, hp);
    let lo = magnitudePercentile(suppressed, lp);
    if (lo >= hi) {
      lo = hi * 0.4;
    }
    if (hi < 1e-9) {
      hi = 1;
      lo = 0.3;
    }
    low = lo;
    high = hi;
  } else if (high >= 240) {
    high = Math.max(low * 2, 100);
  }

  return hysteresis(suppressed, width, height, low, high);
}

/**
 * Normalized RGBA of gradient magnitude after blur + Sobel (for diagnosing why edges are not detected)
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {{
 *   low?: number,
 *   high?: number,
 *   gaussianPasses?: number,
 *   thresholdMode?: 'absolute'|'percentile',
 * }} [options]
 * @returns {{ data: Uint8ClampedArray, width: number, height: number }}
 */
export function gradientMagnitudeRgba(gray, options = {}) {
  const low = options.low ?? 50;
  const highOrig = options.high ?? 150;
  const thresholdMode = options.thresholdMode === 'percentile' ? 'percentile' : 'absolute';
  const { data, width, height } = gray;
  const passes = resolveBlurPasses(options, low, highOrig, thresholdMode);

  let blurred = gaussianBlur5(data, width, height);
  for (let p = 1; p < passes; p++) {
    blurred = gaussianBlur5(blurred, width, height);
  }
  const { mag } = sobel(blurred, width, height);
  let mx = 0;
  for (let i = 0; i < mag.length; i++) {
    if (mag[i] > mx) mx = mag[i];
  }
  const scale = mx > 0 ? 255 / mx : 1;
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const g = Math.min(255, Math.round(mag[i] * scale));
    const o = i * 4;
    rgba[o] = g;
    rgba[o + 1] = g;
    rgba[o + 2] = g;
    rgba[o + 3] = 255;
  }
  return { data: rgba, width, height };
}
