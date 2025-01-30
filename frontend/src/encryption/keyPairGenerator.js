import sodium from 'libsodium-wrappers';

// Generate a key pair for the user

const keyPairGenerator = async()=> {

  await sodium.ready;

  const keyPair = sodium.crypto_box_keypair();

  return {
    publicKey: sodium.to_base64(keyPair.publicKey), // Convert to base64 string to store in db.

    privateKey: sodium.to_base64(keyPair.privateKey) ,  //converted into base64 string to store in user browser.

    privateKeyBuffer : keyPair.privateKey  //this will be used to create a encrypted private key form user password to store in db.
  };
}

export default keyPairGenerator;