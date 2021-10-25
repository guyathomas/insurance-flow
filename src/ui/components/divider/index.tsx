import * as React from 'react';
import styled from 'styled-components';

export function Divider(): JSX.Element {
  return <StyledHr />;
}

const StyledHr = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid #dbdbdb;
`;
