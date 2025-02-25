import naclUtil from "tweetnacl-util";

/**
 * Convert a Base64 string to a Uint8Array.
 *
 * @param {string} base64String - The Base64-encoded string.
 * @returns {Uint8Array} The corresponding Uint8Array.
 */
export function base64ToUint8Array(base64String) {
  return naclUtil.decodeBase64(base64String);
}
