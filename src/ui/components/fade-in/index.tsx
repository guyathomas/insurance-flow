import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  duration?: string;
  yOffset?: string;
  xOffset?: string;
  children: React.ReactNode;
}

export function FadeIn(props: Props): JSX.Element {
  const { duration = '200ms', yOffset = '0', xOffset = '0', children } = props;

  return (
    <StyledFadeInAnimationWrapper duration={duration} yOffset={yOffset} xOffset={xOffset}>
      {children}
    </StyledFadeInAnimationWrapper>
  );
}

interface AnimationProps {
  duration: string;
  yOffset: string;
  xOffset: string;
}

const fade = (xOffset: string, yOffset: string) => keyframes`
  from {
    opacity: 0;
    transform: translate(${xOffset}, ${yOffset});
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const animation = ({ duration, xOffset, yOffset }: AnimationProps) =>
  css`
    ${fade(xOffset, yOffset)} ease-in-out ${duration};
  `;

const StyledFadeInAnimationWrapper = styled.div<AnimationProps>`
  animation: ${animation};
`;
