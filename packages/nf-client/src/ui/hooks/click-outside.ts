import { useCallback, useEffect } from 'react';

type Handler = (e: MouseEvent | TouchEvent) => unknown;

export function useOnClickOutside(el: HTMLElement | null, handler: Handler): void {
  const listener = useCallback(
    (event: MouseEvent | TouchEvent): void => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (!el || el.contains(event.target)) {
        return;
      }
      handler(event);
    },
    [el, handler],
  );

  useEffect(() => {
    if (!el) return undefined;
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [el, listener]);
}
