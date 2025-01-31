import sodium from "libsodium-wrappers";
import uint8ToBase64Converter from "./uint8ToBase64Converter";

// Generate a key pair for the user

const keyPairGenerator = async () => {
  try {
    await sodium.ready;

    const keyPair = sodium.crypto_box_keypair();

    return {
      publicKey: uint8ToBase64Converter(keyPair.publicKey), // Convert to base64 string to store in db.

      privateKey: uint8ToBase64Converter(keyPair.privateKey), //converted into base64 string to store in user browser.

      privateKeyBuffer: keyPair.privateKey, //this will be used to create a encrypted private key form user password to store in db.
    };
  } catch {
    return {
      message: "unable to generate key pair",
    };
  }
};

export default keyPairGenerator;
