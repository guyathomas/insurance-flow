import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useKeyEvent } from '../key-event';

interface Popover {
  isPopoverOpen: boolean;
  togglePopover: () => void;
  openPopover: () => void;
  closePopover: () => void;
  targetRef: React.RefObject<HTMLElement>;
  popoverRef: React.RefObject<HTMLElement>;
}

interface Options {
  excludeTarget?: boolean;
  excludePopover?: boolean;
}

/**
 * Add popover-like functionality to any element. This will add the event handlers to automatically
 * trigger a close callback when the user hits escape or clicks outside of the element.
 * @param ref The element ref
 * @param options
 */
export function usePopover(options: Options = {}): Popover {
  const { excludeTarget = false, excludePopover = true } = options;
  const [isOpen, setOpen] = useState(false);
  const togglePopover = (): void => setOpen((value) => !value);
  const targetRef = useRef<HTMLElement>();
  const popoverRef = useRef<HTMLElement>();

  useKeyEvent(
    'Escape',
    () => {
      if (isOpen) {
        setOpen(false);
      }
    },
    [],
  );

  const clickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      // It's not open, so bail early
      if (!isOpen) {
        return;
      }

      // No element yet
      if (!popoverRef.current) {
        return;
      }

      // Optionally exclude clicks on the popover
      if (excludePopover && (popoverRef.current.contains(target) || popoverRef.current === target)) {
        return;
      }

      // Optionally exclude clicks on the target
      if (excludeTarget && (targetRef.current.contains(target) || targetRef.current === target)) {
        return;
      }

      // Close the popover
      setOpen(false);
    },
    [isOpen, popoverRef, targetRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside, { capture: true });
    document.addEventListener('touchstart', clickOutside, { capture: true });
    return () => {
      document.removeEventListener('mousedown', clickOutside, { capture: true });
      document.removeEventListener('touchstart', clickOutside, { capture: true });
    };
  }, [clickOutside]);

  return {
    isPopoverOpen: isOpen,
    togglePopover,
    openPopover: () => setOpen(true),
    closePopover: () => setOpen(false),
    targetRef,
    popoverRef,
  };
}
