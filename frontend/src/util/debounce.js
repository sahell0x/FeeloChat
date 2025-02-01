/**
 * A utility class for debouncing functions.
 * It ensures that a function is only executed after a certain delay.
 */
class Debounce {
  
  /**
   * Debounces a function to prevent it from being called too frequently.
   * 
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The delay in milliseconds.
   * @returns {Function} A debounced version of the provided function.
   */
  debounce(func, delay) {
    let timerId;

    return function (...args) {
      const context = this;

      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }
}

export { Debounce };
