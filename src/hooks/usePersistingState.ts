import { useState, useEffect } from 'react';
import setItem, { getItem } from '../utils/localStorage';

const usePersistingState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    return getItem(key) ?? initialValue;
  });

  useEffect(() => {
    setItem(key, state);
  }, [key, state]);

  // useEffect(() => {
  //   setItem(key, initialValue)
  // }, [])

  return [state, setState] as const;
}

export default usePersistingState;