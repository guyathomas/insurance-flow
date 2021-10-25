import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  bgColor?: string;
  color?: string;
  relative?: boolean;
  variant?: 'small' | 'default';
  height?: number;
}

export function Spinner({ color, bgColor, relative, variant = 'default', height }: Props): JSX.Element {
  return (
    <StyledLoader color={color} bgColor={bgColor} relative={relative} variant={variant} height={height}>
      <span />
      <span />
      <span />
    </StyledLoader>
  );
}

const Bounce = keyframes`
  from {
    opacity: 1;
    transform: translateY(4px);
  }
  to {
    opacity: 0.1;
    transform: translateY(-4px);
  }
`;

const StyledLoader = styled.span<Props>`
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || 'none'};
  display: flex;
  height: ${({ variant, height }) => (variant === 'small' ? '12px' : `${height}px` || '16px')};
  justify-content: center;
  position: relative;

  ${({ relative }) =>
    !relative &&
    css`
      left: 50%;
      position: absolute;
      top: calc(50%);
      transform: translate(-50%, -50%);
    `}

  > span {
    animation: ${Bounce} 0.6s infinite alternate-reverse;
    background-color: ${({ color }) => color || 'currentColor'};
    border-radius: 50%;
    display: block;
    height: ${({ variant }) => (variant === 'small' ? '4px' : '6px')};
    margin: ${({ variant }) => (variant === 'small' ? '0 1px' : '0 3px')};
    width: ${({ variant }) => (variant === 'small' ? '4px' : '6px')};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  > span:nth-child(2) {
    animation-delay: 0.2s;
  }

  > span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
