import sodium from "libsodium-wrappers";

//this function converts base64 string into uint8 array.

const base64ToUint8Converter = async (base64Input) => {
  await sodium.ready;

  const unit8ConvertedOutput = sodium.to_base64(base64Input);

  return unit8ConvertedOutput; // Uint8 converted array
};

export default base64ToUint8Converter;
