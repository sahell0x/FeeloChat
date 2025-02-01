//this file has all the functions used for generate key pair , encrypt private key , decrypt private key , encrypt message and decrypt message.

import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import scrypt from 'scrypt-async';

nacl.util = naclUtil;


/**
 * this function create more strong derived password from user password and salt to encrypt private key.
 * 
 * @param {string} password - The user password.
 * @param {string} salt - The salt as a base64-encoded string.
 * @returns {Promise<Uint8Array>} promise that resolves with a 32 byte key.
 */

function deriveKey(password, salt) {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, {
      //cpu and memory parameters this is standard values considering security and  wide hardware compatiblity.
      N: 16384,   
      r: 8,
      p: 1,
      dkLen: 32, // key length 32 bytes
      encoding: 'binary'
    }, (derivedKey) => {
      if (derivedKey) {

       if (derivedKey instanceof Uint8Array) {
          resolve(derivedKey);
        } else {
          reject(new Error("Unexpected derived key type"));
        }
      } else {
        reject(new Error('Key derivation failed'));
      }
    });
  });
}


/**
 *generate public and secrete(private) keys for assymetric encryption using tweet nacl box.
 *
 * @returns {{publicKey: Uint8Array, privateKey: Uint8Array}} generated key pair.
 */
export function generateKeyPair() {
  const {publicKey,secretKey} = nacl.box.keyPair();
  const privateKey = secretKey;
  return {
    publicKey,
    privateKey

 }
}

/**
 * encrypt private key from user derived password from user password to store in db cause feelochat uses end to end architecture like instagram and facebook.
 *
 * The private key is encrypted using TweetNaCl secretbox,
 * after deriving a 32-byte symmetric key from the password via scrypt.
 *
 * @param {Uint8Array} privateKey - The private key to encrypt.
 * @param {string} password - The user's password.
 * @returns {Promise<{encryptedPrivateKey: Uint8Array, salt: Uint8Array, nonce: Uint8Array}>}
 */
export async function encryptPrivateKey(privateKey, password) {

  // Generate a random salt 16 bytes.

  const salt = nacl.randomBytes(16);

  // Generate a random nonce for secretbox 24 bytes.

  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);

  // Derive a symmetric key from the password and salt.
  // Here we encode the salt as base64 for use with scrypt.
  const key = await deriveKey(password, naclUtil.encodeBase64(salt));

  // Encrypt the private key using secretbox.
  const encryptedPrivateKey = nacl.secretbox(privateKey, nonce, key);

  return { encryptedPrivateKey, salt, nonce };
}

/**
 * Decrypt encrypted private key with user password.
 *
 * @param {Uint8Array} encryptedPrivateKey - The encrypted private key.
 * @param {Uint8Array} salt - The salt that was used during encryption.
 * @param {Uint8Array} nonce - The nonce that was used during encryption.
 * @param {string} password - The user's password.
 * @returns {Promise<Uint8Array>} A promise that resolves with the decrypted private key.
 * @throws Will throw an error if decryption fails.
 */
export async function decryptPrivateKey(encryptedPrivateKey, salt, nonce, password) {
  // Re derive the symmetric key from the password and salt.
  const key = await deriveKey(password, naclUtil.encodeBase64(salt));

  //decrypt the private key.
  const decrypted = nacl.secretbox.open(encryptedPrivateKey, nonce, key);
  if (!decrypted) {
    throw new Error("Decryption failed. The password may be incorrect or the data is corrupted.");
  }
  return decrypted;
}

/**
 * Encrypt plain text message using TweetNaCl box.
 *
 * Uses the sender private key and the receiver public key to perform
 * public key authenticated encryption.
 *
 * @param {string} message - The plaintext message to encrypt.
 * @param {Uint8Array} receiverPublicKey - The recipient's public key.
 * @param {Uint8Array} senderPrivateKey - The sender's private key.
 * @returns {{cipherText: Uint8Array, nonce: Uint8Array}} The encrypted message and nonce.
 */
export function encryptMessage(message, receiverPublicKey, senderPrivateKey) {
  // Convert the message string to a Uint8Array.
  const messageUint8 = naclUtil.decodeUTF8(message);
  // Generate a random nonce 24 bytes for the box.
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  // Encrypt the message.
  const cipherText = nacl.box(messageUint8, nonce, receiverPublicKey, senderPrivateKey);
  return { cipherText, nonce };
}

/**
 * Decrypt a ciphertext message using TweetNaCl box.
 *
 * Uses the receiver private key and the sender public key.
 *
 * @param {Uint8Array} cipherText - The encrypted message.
 * @param {Uint8Array} nonce - The nonce used during encryption.
 * @param {Uint8Array} senderPublicKey - The sender public key.
 * @param {Uint8Array} recipientPrivateKey - The receiver private key.
 * @returns {string} The decrypted plaintext message.
 * @throws Will throw an error if decryption fails.
 */
export function decryptMessage(cipherText, nonce, senderPublicKey, receiverPrivateKey) {
  //decrypt the ciphertext.
  const decrypted = nacl.box.open(cipherText, nonce, senderPublicKey, receiverPrivateKey);
  if (!decrypted) {
    throw new Error("Decryption failed");
  }
  // Convert the decrypted Uint8Array  a string.
  return naclUtil.encodeUTF8(decrypted);
}
