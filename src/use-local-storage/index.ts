import { useState, Dispatch, SetStateAction } from 'react';
import { usePrevState } from '../use-prev-state';

export function useLocalStorage<T>(
  initialData?: T
): [T, Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState<T>(() => ({ ...initialData, ...localStorage }));
  const prevData = usePrevState(data);

  if (!Object.is(prevData, data)) {
    for (const key in prevData) {
      if (!Object.is(prevData[key], data[key])) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }
    }
  }

  return [data, setData];
}