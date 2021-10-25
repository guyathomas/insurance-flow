import React from 'react';
import styled from 'styled-components';
import { SpacingValue } from '../../theme';

interface Props {
  children: JSX.Element[];
  gap?: SpacingValue;
}

interface StyledProps {
  count: number;
  gap: number;
}

export function Columns({ children, gap = 0 }: Props): JSX.Element {
  if (!children || (children && !children.length)) return null;
  const count = children && children.length;
  return (
    <StyledColumns>
      {React.Children.map(children, (child: JSX.Element) => (
        <StyledColumn key={child.key || undefined} count={count} gap={gap}>
          {child}
        </StyledColumn>
      ))}
    </StyledColumns>
  );
}

const StyledColumns = styled.div`
  @media screen and (min-width: 800px) {
    display: flex;
    align-items: start;
  }
`;

const StyledColumn = styled.div`
  width: 100%;
  @media screen and (min-width: 800px) {
    width: ${({ count }: StyledProps) => `${100 / count}%`};
    margin-left: ${({ gap }: StyledProps) => `${gap}px`};
    &:first-child {
      margin-left: 0;
    }
  }
  @media screen and (max-width: 799px) {
    margin-top: ${({ gap }: StyledProps) => `${gap}px`};
    &:first-child {
      margin-top: 0;
    }
  }
`;
