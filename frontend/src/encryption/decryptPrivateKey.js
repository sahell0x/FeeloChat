import sodium from "libsodium-wrappers";
import base64ToUint8Converter from "./base64ToUint8Converter";

const decryptPrivateKey = async (
  userPassword,
  encryptedPrivateKey,
  salt,
  nonce
) => {
  try {
    // encrypted private key salt and nonce will fetched from db at the time of login

    await sodium.ready;

    // Convert Base64 strings to Uint8Arrays

    const encrypted = base64ToUint8Converter(encryptedPrivateKey);
    salt = base64ToUint8Converter(salt);
    nonce = base64ToUint8Converter(nonce);

    // Re derive the encryption key using the password and stored salt

    const derivedKey = sodium.crypto_pwhash(
      sodium.crypto_secretbox_KEYBYTES,
      userPassword,
      salt,
      sodium.crypto_pwhash_OPSLIMIT_MODERATE,
      sodium.crypto_pwhash_MEMLIMIT_MODERATE,
      sodium.crypto_pwhash_ALG_ARGON2ID13
    );

    // Decrypt the private key
    const privateKey = sodium.crypto_secretbox_open_easy(
      encrypted,
      nonce,
      derivedKey
    );

    return privateKey; // Uint8Array memory
  } catch {
    return {
      message: "unable to decrypt private key",
    };
  }
};

export default decryptPrivateKey;
