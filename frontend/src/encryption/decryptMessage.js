import sodium from "libsodium-wrappers";
import base64ToUint8Converter from "./base64ToUint8Converter";

const decryptMessage = async (
  ciphertext,
  nonce,
  senderPublicKey,
  recieverPrivateKey
) => {
  try {
    await sodium.ready;

    // Convert Base64 ciphertext to uint8 array to perform decryption

    const ciphertextUint8 = base64ToUint8Converter(ciphertext);

    //converting nonce to uint 8 array;
    nonce = base64ToUint8Converter(nonce);

    //convert sender public key into uint 8 array

    senderPublicKey = base64ToUint8Converter(senderPublicKey);

    // Decrypt the message
    const decrypted = sodium.crypto_box_open_easy(
      ciphertextUint8,
      nonce,
      senderPublicKey,
      recieverPrivateKey // reciever private key in uint 8 array form from user browser
    );

    return sodium.to_string(decrypted); // decrypted plain text message

  } catch {
    return {
      message: "decryption failed",
    };
  }
};

export default decryptMessage;
