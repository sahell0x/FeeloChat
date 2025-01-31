import sodium from 'libsodium-wrappers';

const decryptMessage = async (ciphertext, nonce, senderPublicKey, recieverPrivateKey)=> {
    await sodium.ready;
  
    // Convert Base64 ciphertext to uint8 array to perform decryption

    const ciphertextUint8 = sodium.from_base64(ciphertext);

    //converting nonce to uint 8 array;
    nonce = sodium.from_base64(nonce);
    
    //convert sender public key into uint 8 array

    senderPublicKey = sodium.from_base64(senderPublicKey);
  
    // Decrypt the message
    const decrypted = sodium.crypto_box_open_easy(
      ciphertextUint8,
      nonce,
      senderPublicKey,
      recieverPrivateKey // reciever private key in uint 8 array form from user browser
    );
  
    return sodium.to_string(decrypted); // decrypted plain text message
  }

  export default decryptMessage;