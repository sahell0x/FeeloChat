import sodium from "libsodium-wrappers";

const encryptMessage = async (message, receiverPublicKey, senderPrivateKey) => {
  try {
    await sodium.ready;

    // Convert receiver public key to Uint8 from base64

    const receiverPublicKeyUint8 = sodium.from_base64(receiverPublicKey);

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
      ciphertext: sodium.to_base64(ciphertext), //converted into base64 to store and transfer
      nonce: sodium.to_base64(nonce), //nonce will be used at the time of decryption
    };
  } catch {
    return {
      message: "encryption faild",
    };
  }
};

export default encryptMessage;
