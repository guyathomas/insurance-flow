import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useKeyEvent } from '../../hooks/key-event';
import { usePortal } from '../../hooks/portal';
import { useOnClickOutside } from '../../hooks/click-outside';

interface Props {
  children: React.ReactNode;
  hideOnClickOutside?: boolean;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  innerRef: (el: HTMLElement | null) => void;
  testId?: string;
}

export function Popover(props: Props): JSX.Element | null {
  const { onToggle, isOpen, hideOnClickOutside = true, children, innerRef, testId } = props;

  const container = usePortal('popover');
  const [el, setEl] = useState<HTMLElement | null>(null);

  useKeyEvent(
    'Escape',
    () => {
      if (isOpen) {
        onToggle(false);
      }
    },
    [isOpen, onToggle],
  );

  useOnClickOutside(el, (): void => {
    if (!isOpen || !hideOnClickOutside) {
      return;
    }
    onToggle(false);
  });

  // Server-side rendering
  if (!container || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      style={{ zIndex: 10000 }}
      data-testid={testId}
      ref={(popoverEl) => {
        innerRef(popoverEl);
        setEl(popoverEl);
      }}
    >
      {children}
    </div>,
    container,
  );
}
