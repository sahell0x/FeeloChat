/**
 * Opens the IndexedDB database and creates the object store if it doesn't exist.
 * @returns {Promise} Resolves with the database object or rejects with an error message.
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('userKeysDB', 1);
  
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('keys')) {
          db.createObjectStore('keys', { keyPath: 'id' });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject('Failed to open the database');
    });
  };
  
  /**
   * Stores the user's private key in IndexedDB.
   * @param {string} privateKey - The private key to be stored.
   * @returns {Promise} Resolves with a success message or rejects with an error message.
   */
  const storePrivateKey = (privateKey) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB();
        const transaction = db.transaction('keys', 'readwrite');
        const store = transaction.objectStore('keys');
  
        const keyData = {
          id: 'userPrivateKey',
          privateKey: privateKey
        };
  
        const request = store.put(keyData);
  
        request.onsuccess = () => resolve('Private key stored successfully');
        request.onerror = () => reject('Failed to store private key');
      } catch (error) {
        reject(error);
      }
    });
  };
  
  /**
   * Retrieves the user's private key from IndexedDB.
   * @returns {Promise} Resolves with the private key or rejects with an error message.
   */
  const getPrivateKey = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB();
        const transaction = db.transaction('keys', 'readonly');
        const store = transaction.objectStore('keys');
  
        const request = store.get('userPrivateKey');
  
        request.onsuccess = () => {
          if (request.result) {
            resolve(request.result.privateKey);
          } else {
            reject('Private key not found');
          }
        };
  
        request.onerror = () => reject('Failed to retrieve private key');
      } catch (error) {
        reject(error);
      }
    });
  };
  
  /**
   * Deletes the user's private key from IndexedDB.
   * @returns {Promise} Resolves with a success message or rejects with an error message.
   */
  const deletePrivateKey = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB();
        const transaction = db.transaction('keys', 'readwrite');
        const store = transaction.objectStore('keys');
  
        const request = store.delete('userPrivateKey');
  
        request.onsuccess = () => resolve('Private key deleted successfully');
        request.onerror = () => reject('Failed to delete private key');
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export { storePrivateKey, getPrivateKey, deletePrivateKey };
  