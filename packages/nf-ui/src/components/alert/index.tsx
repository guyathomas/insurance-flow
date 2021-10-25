import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../../theme';
import { Padding } from '../padding';

interface Props {
  children: React.ReactNode;
  testId?: string;
}

export function Alert(props: Props): JSX.Element {
  const { children, testId } = props;

  return (
    <StyledContainer data-testid={testId}>
      <Padding size={16}>
        <StyledText> {children} </StyledText>
      </Padding>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  border-color: ${colors.orange_l};
  background: rgb(252, 195, 162, 0.1);
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03);
`;

const StyledText = styled.div`
  color: ${colors.gray_d};
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 21px;
  a {
    color: ${colors.gray_d};
  }
  p {
    margin: 12px 0 0 0;
  }
  p:first-child {
    margin-top: 0;
  }
  strong {
    font-weight: 600;
    color: ${colors.gray_d};
  }
  em {
    font-style: italic;
  }
`;
