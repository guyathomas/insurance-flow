import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children: string | React.ReactNode;
  numOfLines: number;
}
export function LineClamp({ children, numOfLines }: Props): JSX.Element {
  return <StyledLineClamp numOfLines={numOfLines}>{children}</StyledLineClamp>;
}

const StyledLineClamp = styled.div<{ numOfLines: number }>`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ numOfLines }) => (numOfLines ? `${numOfLines}` : 'none')};
  -webkit-box-orient: vertical;
`;
