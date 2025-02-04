import { deletePrivateKey, getPrivateKey, storePrivateKey } from "@/db/indexedDB";
import { generateKeyPair , encryptMessageForBoth, decryptMessageForSender, decryptMessageForReceiver} from "./cryptoUtils";
import { base64ToUint8Array } from "./base64ToUint8Converter";

async function test(){
    
      const key1 = generateKeyPair();
      const key2 = generateKeyPair();

      const message = "hi there";

      const encryptedMessage = await encryptMessageForBoth(message,base64ToUint8Array(key2.publicKey),base64ToUint8Array(key1.publicKey),key1.privateKey);

      console.log(encryptedMessage);

      const forSender = decryptMessageForSender(encryptedMessage.cipherTextForSender,encryptedMessage.nonce,base64ToUint8Array(key1.publicKey),key1.privateKey)

  console.log("sender",forSender)

  const forreceiver = decryptMessageForReceiver(encryptedMessage.cipherTextForReceiver,encryptedMessage.nonce,base64ToUint8Array(key1.publicKey),key2.privateKey)

  console.log("reciever",forreceiver);

  }

  export default test;