import * as React from 'react';
import styled from 'styled-components';
import { Padding } from '../../padding';

type BorderRadius = 0 | 3 | 6 | 10;

interface FlowBodyProps {
  children?: React.ReactNode;
  maxWidth?: number;
  borderRadius?: BorderRadius;
  backgroundColor?: string;
}

export default function FlowBody({ borderRadius, backgroundColor, children, maxWidth }: FlowBodyProps): JSX.Element {
  return (
    <Padding y={88}>
      <StyledBody maxWidth={maxWidth} borderRadius={borderRadius} backgroundColor={backgroundColor}>
        {children}
      </StyledBody>
    </Padding>
  );
}

interface StyledProps {
  borderRadius?: BorderRadius;
  maxWidth?: number;
  backgroundColor?: string;
}

const StyledBody = styled.div<StyledProps>`
  background: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : '')};
  margin: 0 auto;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '596px;')};
  position: relative;
  width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '596px;')};
`;
