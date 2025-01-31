import sodium from "libsodium-wrappers";
import uint8ToBase64Converter from "./uint8ToBase64Converter";

const encryptPrivateKey = async (userPassword, privateKeyBuffer) => {
  try {
    await sodium.ready;

    //generate random slat for password hashing (not directoly encrypting the password adding salt for more strong encryption cause encryption key is very senstive data to store in db Feelochat uses architecture of applicatioins like facebook and instagram)

    const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);

    //encryption key from user password

    const derivedKey = sodium.crypto_pwhash(
      sodium.crypto_secretbox_KEYBYTES,
      userPassword, // Useer password
      salt,
      sodium.crypto_pwhash_OPSLIMIT_MODERATE, // Security settings
      sodium.crypto_pwhash_MEMLIMIT_MODERATE,
      sodium.crypto_pwhash_ALG_ARGON2ID13 // encryption algorithm  argon 2.
    );

    //Encrypt the private key using XChaCha20-Poly1305 algo.

    const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
    const encryptedPrivateKey = sodium.crypto_secretbox_easy(
      privateKeyBuffer, // Raw Uint8Array private key.
      nonce,
      derivedKey
    );

    //returning the object to store in db.
    return {
      encryptedPrivateKey: uint8ToBase64Converter(encryptedPrivateKey),
      salt: uint8ToBase64Converter(salt),
      nonce: uint8ToBase64Converter(nonce),
    };
  } catch {
    return {
      message: "unable to encrypt private key",
    };
  }
};

export default encryptPrivateKey;
