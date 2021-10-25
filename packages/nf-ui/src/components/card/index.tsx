import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

interface Props {
  children: React.ReactNode;
  borderColor?: string;
  backgroundColor?: string;
  overflow?: string;
}

export function Card(props: Props): JSX.Element {
  const { children, borderColor, backgroundColor, overflow = 'hidden' } = props;

  return (
    <StyledCard borderColor={borderColor} backgroundColor={backgroundColor} overflow={overflow}>
      {children}
    </StyledCard>
  );
}

const StyledCard = styled.div`
  background-color: ${({ backgroundColor }: Props) => backgroundColor || 'white'};
  border: 1px solid ${({ borderColor }: Props) => borderColor || '#dbdbdb'};
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.03);
  overflow: ${({ overflow }: Props) => overflow};
`;

/**
 * Read about making cards accessible: https://inclusive-components.design/cards/
 */
export const InteractiveCard = styled(StyledCard).attrs({
  tabIndex: 1,
})`
  &:focus,
  &:active,
  &:hover {
    outline: none;
    cursor: pointer;
    border-color: ${colors.brand[400]};
    box-shadow: 0 0 0 3px ${colors.brand[100]};
  }
`;
