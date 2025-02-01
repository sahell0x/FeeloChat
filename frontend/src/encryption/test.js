import { deletePrivateKey, getPrivateKey, storePrivateKey } from "@/db/indexedDB";
import { generateKeyPair , encryptPrivateKey , decryptPrivateKey,encryptMessage,decryptMessage} from "./cryptoUtils";
import { uint8ArrayToBase64 } from "./uint8ToBase64Converter";

async function test(){
    
      try{
        const key1 = generateKeyPair();
    const res =  await storePrivateKey(key1.privateKey);

    console.log(res);
    
    const privateKEy =await getPrivateKey();
    console.log(privateKEy);

    const deletKey = await deletePrivateKey();
    console.log(deletKey);

    const privateKEy1 =await getPrivateKey();
    console.log(privateKEy1);

      }catch(e){
        console.log(e);
      }
  }

  export default test;