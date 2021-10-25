// https://github.com/rehooks/window-size/blob/master/index.js
import { useState, useEffect } from 'react';

export interface WindowSize {
  innerHeight: number;
  innerWidth: number;
  outerHeight: number;
  outerWidth: number;
}

function getSize(): WindowSize | undefined {
  if (typeof window !== 'undefined') {
    return {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      outerHeight: window.outerHeight,
      outerWidth: window.outerWidth,
    };
  }
  return undefined;
}

export function useWindowSize(): WindowSize | undefined {
  const [windowSize, setWindowSize] = useState<WindowSize | undefined>(getSize());

  function handleResize(): void {
    setWindowSize(getSize());
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return windowSize;
}
