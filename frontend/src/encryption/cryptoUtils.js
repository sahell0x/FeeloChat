import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import scrypt from 'scrypt-async';
import { uint8ArrayToBase64 } from './uint8ToBase64Converter';
import { base64ToUint8Array } from './base64ToUint8Converter';

nacl.util = naclUtil;

/**
 * This function creates a stronger derived password from the user password and salt to encrypt the private key.
 *
 * @param {string} password - The user password.
 * @param {string} salt - The salt as a base64-encoded string.
 * @returns {Promise<Uint8Array>} Promise that resolves with a 32-byte key.
 */
function deriveKey(password, salt) {
  return new Promise((resolve, reject) => {
    try {
      scrypt(password, salt, {
        N: 16384,   
        r: 8,
        p: 1,
        dkLen: 32, 
        encoding: 'binary'
      }, (derivedKey) => {
        if (derivedKey instanceof Uint8Array) {
          resolve(derivedKey);
        } else {
          reject(new Error("Unexpected derived key type"));
        }
      });
    } catch (error) {
      reject(new Error('Error during key derivation: ' + error.message));
    }
  });
}

/**
 * Generate public and secret (private) keys for asymmetric encryption using tweet nacl box.
 *
 * @returns {{publicKey: string, privateKey: Uint8Array}} Generated key pair.
 */
export function generateKeyPair() {
  const { publicKey, secretKey } = nacl.box.keyPair();
  const privateKey = secretKey;
  return { publicKey:uint8ArrayToBase64(publicKey), privateKey };
}

/**
 * Encrypt the private key from the user-derived password to store it securely.
 *
 * The private key is encrypted using TweetNaCl secretbox after deriving a 32-byte symmetric key.
 *
 * @param {Uint8Array} privateKey - The private key to encrypt.
 * @param {string} password - The user's password.
 * @returns {Promise<{encryptedPrivateKey: string, salt: string, nonce: string}>}
 */
export async function encryptPrivateKey(privateKey, password) {
  try {
    const salt = nacl.randomBytes(16);
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);

    const key = await deriveKey(password, naclUtil.encodeBase64(salt));

    const encryptedPrivateKey = nacl.secretbox(privateKey, nonce, key);

    return { encryptedPrivateKey:uint8ArrayToBase64(encryptedPrivateKey),
       salt:uint8ArrayToBase64(salt),
        nonce:uint8ArrayToBase64(nonce),
      };
  } catch (error) {
    throw new Error('Error encrypting private key: ' + error.message);
  }
}

/**
 * Decrypt the encrypted private key with the user password.
 *
 * @param {string} encryptedPrivateKey - The encrypted private key.
 * @param {string} salt - The salt used during encryption.
 * @param {string} nonce - The nonce used during encryption.
 * @param {string} password - The user's password.
 * @returns {Promise<Uint8Array>} A promise that resolves with the decrypted private key.
 */
export async function decryptPrivateKey(encryptedPrivateKey, salt, nonce, password) {
  try {
    const key = await deriveKey(password, salt);

    encryptedPrivateKey = base64ToUint8Array(encryptedPrivateKey);
    nonce = base64ToUint8Array(nonce);

    const decrypted = nacl.secretbox.open(encryptedPrivateKey, nonce, key);
    if (!decrypted) {
      throw new Error("Decryption failed. The password may be incorrect or the data is corrupted.");
    }
    return decrypted;
  } catch (error) {
    throw new Error('Error decrypting private key: ' + error.message);
  }
}

/**
 * Encrypt plain text message using TweetNaCl box.
 *
 * Uses the sender private key , the receiver public key and senderPublicKey to encrypt message for both so then both can access it.
 *
 * @param {string} message - The plaintext message to encrypt.
 * @param {string} receiverPublicKey - The receiver public key.
 * @param {string} senderPublicKey - The sender public key.
 * @param {Uint8Array} senderPrivateKey - The sender's private key.
 * @returns {{cipherTextForReceiver: string,cipherTextForSender: string, nonce: string}} The encrypted ciphers for both sendr and reciever with nonce.
 */
export function encryptMessageForBoth(message, receiverPublicKey, senderPublicKey, senderPrivateKey) {
  try {

    receiverPublicKey = base64ToUint8Array(receiverPublicKey);
    senderPublicKey  = base64ToUint8Array(senderPublicKey);

    const messageUint8 = naclUtil.decodeUTF8(message);

    const nonce = nacl.randomBytes(nacl.box.nonceLength);

    const cipherTextForReceiver = nacl.box(messageUint8, nonce, receiverPublicKey, senderPrivateKey);

    const cipherTextForSender = nacl.box(messageUint8, nonce, senderPublicKey, senderPrivateKey);

    return { 
      cipherTextForReceiver:uint8ArrayToBase64(cipherTextForReceiver), 
      cipherTextForSender:uint8ArrayToBase64(cipherTextForSender), 
      nonce:uint8ArrayToBase64(nonce), 
    };
  } catch (error) {
    throw new Error('Error encrypting message: ' + error.message);
  }
}

/**
 * Decrypts a message  for the receiver using NaCl box decryption.
 *
 * @param {string} cipherText - The encrypted message.
 * @param {string} nonce - A unique nonce used during encryption.
 * @param {string} senderPublicKey - The sender public key.
 * @param {Uint8Array} receiverPrivateKey - The receiver private key.
 * @returns {string} The decrypted message as  string.
 * @throws {Error} If decryption fails.
 */
export function decryptMessageForReceiver(cipherText, nonce, senderPublicKey, receiverPrivateKey) {
  try {
    cipherText = base64ToUint8Array(cipherText);
    nonce = base64ToUint8Array(nonce);
    senderPublicKey = base64ToUint8Array(senderPublicKey);

    const decrypted = nacl.box.open(cipherText, nonce, senderPublicKey, receiverPrivateKey);
    if (!decrypted) {
      throw new Error("Decryption failed");
    }

    return naclUtil.encodeUTF8(decrypted);
  } catch (error) {
    throw new Error('Error decrypting message: ' + error.message);
  }
}

/**
 * Decrypts a message the sender using NaCl's box decryption.
 *
 * @param {string} cipherText - The encrypted message.
 * @param {string} nonce - A unique nonce used during encryption.
 * @param {string} receiverPublicKey - The receiver's public key.
 * @param {Uint8Array} senderPrivateKey - The sender's private key.
 * @returns {string} The decrypted message as  string.
 * @throws {Error} If decryption fails.
 */
export function decryptMessageForSender(cipherText, nonce, receiverPublicKey, senderPrivateKey) {
  try {

    cipherText = base64ToUint8Array(cipherText);
    nonce = base64ToUint8Array(nonce);
    receiverPublicKey = base64ToUint8Array(receiverPublicKey);

    const decrypted = nacl.box.open(cipherText, nonce, receiverPublicKey, senderPrivateKey);
    if (!decrypted) {
      throw new Error("Decryption failed");
    }

    return naclUtil.encodeUTF8(decrypted);
  } catch (error) {
    throw new Error('Error decrypting message: ' + error.message);
  }
}
