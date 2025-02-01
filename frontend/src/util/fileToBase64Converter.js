/**
 * Converts a file to a compressed Base64 string.
 * 
 * @param {File} file - The file to convert and compress.
 * @param {number} [compressionPercentage=60] - The percentage of compression (default is 60%).
 * @returns {Promise<string>} A promise that resolves with the compressed Base64 string.
 */
const fileToBase64Convertor = (file, compressionPercentage = 60) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const base64String = event.target.result;
        const quality = 1 - compressionPercentage / 100;

        // Compress the Base64 string
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
