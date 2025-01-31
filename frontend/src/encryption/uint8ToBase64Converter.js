import sodium from 'libsodium-wrappers';

//this function converts Uint8 array into base64 string

const uint8ToBase64Converter = async(uint8Input)=>{

        await sodium.ready;

        const base64ConvertedOutput = sodium.to_base64(uint8Input);

        return base64ConvertedOutput;  //converted base64 output
    
}

export default uint8ToBase64Converter;