/**
 * Grayscale preprocessing: gamma and CLAHE (before Canny)
 */

/**
 * Luminance from RGB (by mode)
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {'bt601'|'max'|'hsvV'} mode
 * @returns {number}
 */
export function lumaFromRgb(r, g, b, mode) {
  if (mode === 'max' || mode === 'hsvV') {
    return Math.max(r, g, b) | 0;
  }
  return (0.299 * r + 0.587 * g + 0.114 * b) | 0;
}

/**
 * Gamma correction (display gamma: out = 255 * (in/255)^(1/gamma))
 * @param {Uint8ClampedArray} gray
 * @param {number} width
 * @param {number} height
 * @param {number} gamma - 1 means no change. Less than 1 brightens dark areas
 * @returns {Uint8ClampedArray}
 */
export function applyGamma(gray, width, height, gamma) {
  if (gamma == null || gamma === 1 || !Number.isFinite(gamma) || gamma <= 0) {
    return gray;
  }
  const inv = 1 / gamma;
  const lut = new Uint8ClampedArray(256);
  for (let v = 0; v < 256; v++) {
    lut[v] = Math.min(255, Math.round(255 * Math.pow(v / 255, inv)));
  }
  const n = width * height;
  const out = new Uint8ClampedArray(n);
  for (let i = 0; i < n; i++) {
    out[i] = lut[gray[i]];
  }
  return out;
}

/**
 * Clip tile histogram (Zuiderveld style)
 * @param {Float32Array} hist - 256 elements, counts
 * @param {number} clipLimit - typically 2–8
 * @param {number} numPixels
 */
function clipHistogram(hist, clipLimit, numPixels) {
  const limit = Math.max(1, (clipLimit * numPixels) / 256);
  let excess = 0;
  for (let i = 0; i < 256; i++) {
    if (hist[i] > limit) {
      excess += hist[i] - limit;
      hist[i] = limit;
    }
  }
  const inc = excess / 256;
  for (let i = 0; i < 256; i++) {
    hist[i] += inc;
  }
}

/**
 * Equalization LUT (0..255) from histogram
 * @param {Float32Array} hist - clipped
 * @param {number} numPixels
 * @returns {Uint8Array}
 */
function histToLut(hist, numPixels) {
  const cdf0 = hist[0];
  const cdf = new Float32Array(256);
  cdf[0] = hist[0];
  for (let i = 1; i < 256; i++) {
    cdf[i] = cdf[i - 1] + hist[i];
  }
  const cmin = cdf0;
  const scale = numPixels > cmin ? 255 / (numPixels - cmin) : 0;
  const lut = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    lut[i] = Math.min(255, Math.round((cdf[i] - cmin) * scale));
  }
  return lut;
}

/**
 * Build LUTs for all tiles
 * @param {Uint8ClampedArray} gray
 * @param {number} width
 * @param {number} height
 * @param {number} tileSize
 * @param {number} clipLimit
 * @returns {{ luts: Uint8Array[], numTilesX: number, numTilesY: number }}
 */
function buildTileLuts(gray, width, height, tileSize, clipLimit) {
  const numTilesX = Math.max(1, Math.ceil(width / tileSize));
  const numTilesY = Math.max(1, Math.ceil(height / tileSize));
  const luts = [];

  for (let tj = 0; tj < numTilesY; tj++) {
    for (let ti = 0; ti < numTilesX; ti++) {
      const x0 = ti * tileSize;
      const y0 = tj * tileSize;
      const x1 = Math.min(x0 + tileSize, width);
      const y1 = Math.min(y0 + tileSize, height);
      const h = new Float32Array(256);
      let count = 0;
      for (let y = y0; y < y1; y++) {
        const row = y * width;
        for (let x = x0; x < x1; x++) {
          h[gray[row + x]]++;
          count++;
        }
      }
      if (count === 0) {
        const id = new Uint8Array(256);
        for (let i = 0; i < 256; i++) id[i] = i;
        luts.push(id);
        continue;
      }
      clipHistogram(h, clipLimit, count);
      const lut = histToLut(h, count);
      luts.push(lut);
    }
  }
  return { luts, numTilesX, numTilesY };
}

/**
 * CLAHE (tiled adaptive histogram equalization with clipping, bilinear interpolation of 4 tile LUTs)
 * @param {Uint8ClampedArray} gray
 * @param {number} width
 * @param {number} height
 * @param {{ tileSize?: number, clipLimit?: number }} [opts]
 * @returns {Uint8ClampedArray}
 */
export function applyClahe(gray, width, height, opts = {}) {
  const tileSize = opts.tileSize ?? 8;
  const clipLimit = opts.clipLimit ?? 3;
  const { luts, numTilesX, numTilesY } = buildTileLuts(gray, width, height, tileSize, clipLimit);

  const getLut = (ti, tj) => {
    const tiC = Math.max(0, Math.min(ti, numTilesX - 1));
    const tjC = Math.max(0, Math.min(tj, numTilesY - 1));
    return luts[tjC * numTilesX + tiC];
  };

  const out = new Uint8ClampedArray(width * height);
  for (let y = 0; y < height; y++) {
    const row = y * width;
    const ya = y / tileSize;
    const j0 = Math.floor(ya);
    const j1 = Math.min(j0 + 1, numTilesY - 1);
    const wy = ya - j0;
    for (let x = 0; x < width; x++) {
      const xa = x / tileSize;
      const i0 = Math.floor(xa);
      const i1 = Math.min(i0 + 1, numTilesX - 1);
      const wx = xa - i0;
      const v = gray[row + x];
      const l00 = getLut(i0, j0)[v];
      const l10 = getLut(i1, j0)[v];
      const l01 = getLut(i0, j1)[v];
      const l11 = getLut(i1, j1)[v];
      const a = (1 - wx) * l00 + wx * l10;
      const b = (1 - wx) * l01 + wx * l11;
      out[row + x] = Math.min(255, Math.round((1 - wy) * a + wy * b));
    }
  }
  return out;
}

/**
 * Apply optional gamma correction then optional CLAHE to a grayscale image
 * @param {{ data: Uint8ClampedArray, width: number, height: number }} gray
 * @param {{ gamma?: number, clahe?: boolean, claheTileSize?: number, claheClipLimit?: number }} opts
 * @returns {{ data: Uint8ClampedArray, width: number, height: number }}
 */
export function applyGrayPreprocess(grayObj, opts = {}) {
  const { width, height } = grayObj;
  let data = grayObj.data;
  const gamma = opts.gamma ?? 1;
  data = applyGamma(data, width, height, gamma);
  if (opts.clahe === true) {
    data = applyClahe(data, width, height, {
      tileSize: opts.claheTileSize ?? 8,
      clipLimit: opts.claheClipLimit ?? 3,
    });
  }
  return { data, width, height };
}
