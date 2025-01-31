import sodium from 'libsodium-wrappers';

 
 const decryptPrivateKey = async (userPassword, encryptedPrivateKey, salt, nonce) => {

    // encrypted private key salt and nonce will fetched from db at the time of login

    await sodium.ready;
  
    // Convert Base64 strings to Uint8Arrays

    const encrypted = sodium.from_base64(encryptedPrivateKey);
    salt = sodium.from_base64(salt);
    nonce = sodium.from_base64(nonce);
  
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
  }

  
  export default decryptPrivateKey;