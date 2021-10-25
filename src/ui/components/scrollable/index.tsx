import * as React from 'react';
import styled from 'styled-components';

interface Props {
  height: number;
  children: React.ReactNode;
}

export function Scrollable(props: Props): JSX.Element {
  const { height, children } = props;

  return <StyledDiv height={height}>{children}</StyledDiv>;
}

const StyledDiv = styled.div`
  height: ${({ height }: Props) => height}px;
  overflow-y: scroll;
`;
