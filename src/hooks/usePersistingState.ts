import { useState, useEffect, useCallback } from 'react';
import setItem, { getItem } from '../utils/localStorage';

const usePersistingState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    return getItem(key) ?? initialValue;
  });

  useEffect(() => {
    setItem(key, state);
  }, [key, state]);

  const resetState = useCallback(() => {
    setState(initialValue)
  }, [setItem, initialValue])

  return [state, setState, resetState] as const;
}


export default usePersistingState;