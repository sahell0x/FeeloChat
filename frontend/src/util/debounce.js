class Debounce {
    
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