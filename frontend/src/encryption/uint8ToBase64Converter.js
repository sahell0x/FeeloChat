import naclUtil from "tweetnacl-util";

/**
 * Convert a Uint8Array to a Base64 string.
 *
 * @param {Uint8Array} uint8Array - The Uint8Array to convert.
 * @returns {string} The Base64-encoded string.
 */
export function uint8ArrayToBase64(uint8Array) {
  return naclUtil.encodeBase64(uint8Array);
}
