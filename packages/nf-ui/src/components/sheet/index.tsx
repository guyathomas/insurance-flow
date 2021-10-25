import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { IconButton } from '../icon-button';
import { Padding } from '../padding';

const modalAnimation = keyframes`
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const overlayAnimation = keyframes`
  from {
    background: rgba(31, 21, 41, 0);
  }
  to {
    background: rgba(31, 21, 41, 0.57);
  }
`;

const SheetContainer = styled.div<{
  width?: string;
}>`
  animation: ${modalAnimation} 200ms cubic-bezier(0.16, 0.68, 0.165, 1.3);
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0px 4px 30px rgba(38, 45, 70, 0.15);
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  width: ${({ width }) => width || '684px'};
  z-index: 101;
  overflow: auto;

  &:focus {
    outline: none;
  }
`;

const Overlay = styled.div`
  animation: ${overlayAnimation} 300ms ease-in-out;
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: rgba(31, 21, 41, 0.57);
`;

interface Props {
  onToggle: (isOpen: boolean) => unknown;
  isOpen: boolean;
  children: React.ReactNode;
  width?: string;
  overlay?: boolean;
}

export const SheetHeader = ({ onToggle }: { onToggle: (isOpen: boolean) => unknown }): JSX.Element => (
  <Padding left={48} right={48} top={32}>
    <IconButton
      type="close"
      onClick={(e) => {
        e.preventDefault();
        onToggle(false);
      }}
      testId="sheet-close-icon"
    />
  </Padding>
);

export const SheetBody = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <Padding left={48} right={48}>
    {children}
  </Padding>
);

export function Sheet(props: Props): JSX.Element | null {
  const { isOpen, onToggle, children, overlay = true, width } = props;

  useLayoutEffect((): (() => void) => {
    if (!isOpen) return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onToggle(false);
      }
    };
    document.body.addEventListener('keydown', handler);
    return (): void => document.body.removeEventListener('keydown', handler);
  }, [onToggle]);

  useLayoutEffect(() => {
    if (!overlay)
      return () => {
        return undefined;
      };
    if (isOpen) {
      // This stops the page from jumping around by adding the 15px width of the scrollbar
      document.body.style.paddingRight = hasScrollbar(document.body) ? '15px' : '0';
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, overlay]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <SheetContainer tabIndex={-1} role="dialog" data-testid="sheet" width={width}>
        {children}
      </SheetContainer>
      {overlay && <Overlay />}
    </>,
    document.body,
  );
}

/**
 * Check to see if an element has scrollbars
 */
function hasScrollbar(el: HTMLElement): boolean {
  const { overflowY } = window.getComputedStyle(el);
  if (overflowY === 'hidden') return false;
  return el.scrollHeight > el.offsetHeight;
}
