import { useRef, useEffect, RefObject } from 'react';

type FocusableElement = HTMLInputElement | HTMLTextAreaElement;

export function useFocus(): RefObject<FocusableElement> {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
}
