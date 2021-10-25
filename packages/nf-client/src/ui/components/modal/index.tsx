import React, { useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

interface Props {
  onToggle: (isOpen: boolean) => unknown;
  isOpen: boolean;
  overlay?: boolean;
  width?: string;
  top?: string;
  children: React.ReactNode;
  testId?: string;
}

export function Modal(props: Props): JSX.Element | null {
  const { isOpen, onToggle, children, top = 64, width = 600, overlay = true, testId } = props;

  useLayoutEffect((): (() => void) => {
    if (!isOpen) return () => null;
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onToggle(false);
      }
    };
    document.body.addEventListener('keydown', handler);
    return (): void => document.body.removeEventListener('keydown', handler);
  }, [onToggle]);

  useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const overlayClasses = classnames({
    overlay: true,
    show: overlay,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <StyledOverlay className={overlayClasses} tabIndex={-1} data-testid={testId}>
      <StyledModal className="ui-modal" role="dialog" style={{ width, marginTop: top }}>
        {children}
      </StyledModal>
    </StyledOverlay>,
    document.body,
  );
}

const overlayAnimation = keyframes`
  from {
    background: rgba(31, 21, 41, 0);
  }
  to {
    background: rgba(31, 21, 41, 0.57);
  }
`;

const modalAnimation = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledOverlay = styled.div`
  animation: ${overlayAnimation} 100ms ease-in;
  animation-fill-mode: both;
  background: transparent;
  z-index: 102;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  &.show {
    background: rgba(31, 21, 41, 0.57);
  }
`;

const StyledModal = styled.div`
  animation: ${modalAnimation} 300ms cubic-bezier(0.16, 0.68, 0.165, 1.3);
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 64px;
  z-index: 103;

  &:focus {
    outline: none;
  }
`;
