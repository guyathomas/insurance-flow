import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface FlowSidebarProps {
  children?: React.ReactNode;
}

export default function FlowSidebar({ children }: FlowSidebarProps): JSX.Element {
  return <StyledSidebar>{children}</StyledSidebar>;
}

interface FlowSidebarStickyProps extends FlowSidebarProps {
  offset?: number;
}

export function FlowSidebarSticky({ children, offset }: FlowSidebarStickyProps): JSX.Element {
  const [isSticky, setSticky] = useState<boolean>(false);
  const [leftPosition, setLeftPosition] = useState<number | null>(null);
  const [topPosition, setTopPosition] = useState<number | null>(null);
  const stickyOffset = offset || 155;

  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = (): void => {
    const windowScrollPosition = window.scrollY;
    setSticky(windowScrollPosition > stickyOffset);

    if (ref && ref.current) {
      setLeftPosition(ref.current.getBoundingClientRect().left);
      setTopPosition(stickyOffset);
    }
  };

  const handleResize = (): void => {
    setSticky(false);
    setLeftPosition(null);
    setTopPosition(null);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isSticky ? 'sticky' : ''}>
      <StyledSidebar ref={ref} left={leftPosition} top={topPosition}>
        {children}
      </StyledSidebar>
    </div>
  );
}

const fadeSidebarIn = keyframes`
  to {
    opacity: 1;
  }
`;

const StyledSidebar = styled.div<{ left?: number | null; top?: number | null }>`
  left: -250px;
  position: absolute;
  top: 0;
  width: 220px;

  .sticky & {
    animation: ${fadeSidebarIn} 0.8s 0.8s ease forwards;
    opacity: 0;
    position: fixed;
    width: 220px;
    ${({ left }) => left && `left: ${left}px`};
    ${({ top }) => top && `top: ${top}px`};
  }
`;
