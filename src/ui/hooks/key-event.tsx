/* eslint-env browser */
import { useEffect, useCallback } from 'react';

export function useKeyEvent(key: string, fn: () => void, deps: unknown[]): void {
  const callback = useCallback(fn, deps);
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === key) {
        callback();
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [callback]);
}
