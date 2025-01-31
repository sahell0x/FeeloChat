import sodium from "libsodium-wrappers";
import base64ToUint8Converter from "./base64ToUint8Converter";
import uint8ToBase64Converter from "./uint8ToBase64Converter";

const encryptMessage = async (message, receiverPublicKey, senderPrivateKey) => {
  try {
    await sodium.ready;

    // Convert receiver public key to Uint8 from base64

    const receiverPublicKeyUint8 = base64ToUint8Converter(receiverPublicKey);

    // Generate a random nonce
    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

    // Encrypt the message
    const ciphertext = sodium.crypto_box_easy(
      message, // plain text from input field
      nonce,
      receiverPublicKeyUint8,
      senderPrivateKey // sender private key in uint 8 from from user browser
    );

    return {
      ciphertext: uint8ToBase64Converter(ciphertext), //converted into base64 to store and transfer
      nonce: uint8ToBase64Converter(nonce), //nonce will be used at the time of decryption
    };
  } catch {
    return {
      message: "encryption faild",
    };
  }
};

export default encryptMessage;
