import React from 'react';
import styled from 'styled-components';

interface FlowBodyProps {
  children?: React.ReactNode;
  backgroundColor?: string;
}

export default function FlowWrapper({ backgroundColor, children }: FlowBodyProps): JSX.Element {
  return <StyledWrapper backgroundColor={backgroundColor}>{children}</StyledWrapper>;
}

const StyledWrapper = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
  min-height: 100vh;
`;
