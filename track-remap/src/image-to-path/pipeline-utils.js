/**
 * Small validation helpers for the pipeline
 */

/**
 * @param {unknown} override
 * @param {number} width
 * @param {number} height
 * @returns {asserts override is Uint8ClampedArray}
 */
export function assertEdgesOverride(override, width, height) {
  if (!(override instanceof Uint8ClampedArray) || override.length !== width * height) {
    throw new Error('edgesOverride must be a Uint8ClampedArray of length width * height');
  }
}
