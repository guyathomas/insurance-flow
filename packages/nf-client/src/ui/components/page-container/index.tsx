import * as React from 'react';
import styled from 'styled-components';

interface Props {
  width: string;
  children: React.ReactNode;
}

export function PageContainer(props: Props): JSX.Element {
  const { width, children } = props;

  return (
    <StyledDiv className="PageContainer" width={width}>
      {children}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: ${({ width }: Props) => width};
  margin-left: auto;
  margin-right: auto;
`;
