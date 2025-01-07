const fileToBase64Convertor = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            resolve(event.target.result); // Resolve the Promise with the Base64 string
        };
        reader.onerror = function(error) {
            reject(error); // Reject the Promise if an error occurs
        };
        reader.readAsDataURL(file);
    });
};

export default fileToBase64Convertor;
