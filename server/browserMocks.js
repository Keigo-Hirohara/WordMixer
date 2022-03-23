var localStorageMock = (function() {
    let store = {};
  
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = String(value);
        },
        clear: function() {
            store = {};
        }
    };
  
  })();
  
  Object.defineProperty(window, 'localStorage', {
     value: localStorageMock
  });