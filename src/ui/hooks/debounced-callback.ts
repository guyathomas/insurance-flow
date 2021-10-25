import { debounce as createDebounced, Cancelable } from 'lodash';
import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any) => void | undefined;
export type CancelableCallback = (Callback & Cancelable) | null;
export type Debounced = React.MutableRefObject<CancelableCallback>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

function createDebouncedCallback(fn: Callback, duration?: number): CancelableCallback | Callback {
  return duration ? createDebounced(fn, duration) : fn;
}

/**
 * This takes a function and a duration and debounces the value.
 * It will take care of cancelling any timeout when the component
 * is removed.
 * @param fn
 * @param duration
 */
export function useDebouncedCallback(fn?: Callback, duration?: number): CancelableCallback | Callback {
  const callbackFn = fn || noop;
  const callbackRef = useRef<CancelableCallback | Callback>(createDebouncedCallback(callbackFn, duration));

  useEffect(() => {
    callbackRef.current = createDebouncedCallback(callbackFn, duration);
    return () => {
      if (callbackRef.current) {
        if ('cancel' in callbackRef.current) {
          callbackRef.current.cancel();
        }
        callbackRef.current = null;
      }
    };
  }, [callbackFn, duration]);

  return callbackRef.current;
}
