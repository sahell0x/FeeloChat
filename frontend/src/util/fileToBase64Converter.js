import compress from 'compress-base64';

const fileToBase64Convertor = (file, compressionPercentage = 60) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const base64String = event.target.result;

        const quality = 1 - compressionPercentage / 100;

        const compressedResult = await compress(base64String, {
          width: 800, 
          type: 'image/jpeg',
          quality: quality, 
        });

        resolve(compressedResult); 
      } catch (error) {
        reject(error); 
      }
    };

    reader.onerror = (error) => {
      reject(error); 
    };

    reader.readAsDataURL(file);
  });
};

export default fileToBase64Convertor;
