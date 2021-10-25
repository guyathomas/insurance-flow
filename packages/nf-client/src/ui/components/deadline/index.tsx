import React from 'react';
import styled, { css, keyframes, Keyframes } from 'styled-components';
import { Padding } from '../padding';
import { Text } from '../text';
import { Flexbox } from '../flexbox';
import { MiniIconClock } from '../mini-icons';
import { colors } from '../../theme/colors';

interface Props {
  date: string;
  percentage?: number;
  height?: number;
  style?: React.CSSProperties;
  label?: string;
}

interface StyledProps {
  percentage?: number;
}

export function Deadline({ date, percentage = 0, height = 40, style = {}, label = 'ETA' }: Props): JSX.Element {
  return (
    <StyledContainer
      percentage={percentage}
      style={{
        ...style,
        height,
      }}
    >
      <StyledContent>
        <Flexbox alignItems="center">
          <Padding right={8}>
            <Text>
              <MiniIconClock color={colors.steel[400]} />
            </Text>
          </Padding>
          <Text color={colors.steel[400]}>
            {label}: <strong>{date}</strong>
          </Text>
        </Flexbox>
      </StyledContent>
    </StyledContainer>
  );
}

const grow = (percentage = 0): Keyframes => keyframes`
  to {
    width: ${percentage}%;
  }
`;

const StyledContainer = styled.div`
  background: ${colors.steel[100]};
  border-radius: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 0 12px;

  &:before {
    background: ${colors.steel[200]}40; // 40 represents 25% opacity in hex
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    width: 0;
    ${({ percentage }: StyledProps) =>
      percentage &&
      css`
        animation: ${grow(percentage)} 1s ease forwards;
      `}
    z-index; 0;
  }
`;

const StyledContent = styled.div`
  position: relative;
  z-index: 5;
`;
