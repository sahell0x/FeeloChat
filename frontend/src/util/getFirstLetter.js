/**
 * Gets the first letter of a string and converts it to uppercase.
 * 
 * @param {string} input - The string from which to extract the first letter.
 * @returns {string} The uppercase first letter of the input string.
 */
const getFirstLetter = (input) => {
   return input.split("")[0].toUpperCase();
}

export default getFirstLetter;
