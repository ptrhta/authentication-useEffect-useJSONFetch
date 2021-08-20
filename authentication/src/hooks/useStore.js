import { useState, useEffect } from 'react';
import store from 'store2';

const useStore = (key) => {
  const [value, setValue] = useState(store.get(key));

  useEffect(() => {
    if (value === null) {
      store.remove(key);
      return;
    }

    store.set(key, value);
  }, [value, key]);

  return [value, setValue];
};

export default useStore;