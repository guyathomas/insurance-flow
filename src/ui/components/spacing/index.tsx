import * as React from 'react';
import styled from 'styled-components';

export type SpacingValue = 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 128 | 256;

const StyledSpacing = styled.div<Props>`
  height: ${(p) => (p.height ? `${p.height}px` : 'auto')};
  width: ${(p) => (p.width ? `${p.width}px` : 'auto')};
  flex: none;
`;

interface Props {
  height?: SpacingValue;
  width?: SpacingValue;
}

export function Spacing({ height, width }: Props): JSX.Element {
  return <StyledSpacing height={height} width={width} />;
}
