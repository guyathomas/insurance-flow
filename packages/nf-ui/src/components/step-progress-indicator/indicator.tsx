import React from 'react';
import styled, { keyframes } from 'styled-components';
import classNames from 'classnames';
import { IconTick } from '../icons';
import { Padding } from '../padding';
import { Flexbox } from '../flexbox';
import { Text } from '../text';
import { colors } from '../../theme/colors';

interface Props {
  active: boolean;
  completed: boolean | undefined;
  count: number;
  disabled: boolean | undefined;
  step: string;
}

export default function Indicator({ active, completed, count, disabled, step }: Props): JSX.Element {
  const stepClasses = classNames({
    active,
    completed,
  });

  function getTextColor(): string {
    if (active) {
      return 'active';
    }
    if (disabled) {
      return 'disabled';
    }
    return 'dark';
  }

  return (
    <Padding bottom={16}>
      <Flexbox alignItems="center">
        <Padding right={12}>
          <StyledStep className={stepClasses}>{completed ? <IconTick /> : count}</StyledStep>
        </Padding>
        <Text weight={active ? 600 : 400} color={getTextColor()} nowrap truncate>
          {step}
        </Text>
      </Flexbox>
    </Padding>
  );
}

const TransitionToActive = keyframes`
  to {
    border-color: ${colors.brand[400]};
    color: ${colors.brand[400]};
  }
`;

const TransitionToCompleted = keyframes`
  from {
    border-color: ${colors.brand[400]};
    color: ${colors.brand[400]};
  }
  to {
    background-color: ${colors.brand[400]};
    border-color: ${colors.brand[400]};
    color: white;
  }
`;

const StyledStep = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid ${colors.steel[100]};
  border-radius: 50%;
  color: ${colors.steel[100]};
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
  font-size: 12px;
  height: 23px;
  justify-content: center;
  position: relative;
  width: 24px;

  &.active {
    animation: ${TransitionToActive} 0.3s ease-in forwards;
  }

  &.completed {
    animation: ${TransitionToCompleted} 0.3s ease-in forwards;
  }
`;
