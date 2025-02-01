import { generateKeyPair , encryptPrivateKey , decryptPrivateKey,encryptMessage,decryptMessage} from "./cryptoUtils";
import { uint8ArrayToBase64 } from "./uint8ToBase64Converter";

async function test(){
    
    const key1 = generateKeyPair();
    const key2 = generateKeyPair();

    console.log(key1);
    console.log(key2);

    // Encrypt the private key using the user's password.
    const { encryptedPrivateKey, salt, nonce } = await encryptPrivateKey(key1.privateKey, "hi there");
  
    // Save `publicKey` and the encrypted private key (with salt and nonce) to your database.
    console.log('Public Key:', uint8ArrayToBase64(key1.publicKey));
    console.log('Private Key:', uint8ArrayToBase64(key1.privateKey));
    console.log('Encrypted Private Key:', uint8ArrayToBase64(encryptedPrivateKey));
    console.log('Salt:', uint8ArrayToBase64(salt));
    console.log('Nonce:', uint8ArrayToBase64(nonce));

   const decryptedkey = await decryptPrivateKey(encryptedPrivateKey,salt,nonce,"hi there");

   console.log(uint8ArrayToBase64(decryptedkey));

    const encMessage = encryptMessage("What emoji does 🥰 mean",key2.publicKey,key1.privateKey);
    console.log("encrypted message",encMessage);

    const palainMessage = decryptMessage(encMessage.cipherText,encMessage.nonce,key1.publicKey,key2.privateKey);

    console.log("plain text",palainMessage);

  }

  export default test;