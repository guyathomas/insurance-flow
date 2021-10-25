// import React, { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import Indicator from './indicator';
import { colors } from '../../theme/colors';

interface Props {
  active?: number;
  completed?: number[];
  disabled?: number[];
  steps: string[];
}

export function StepProgressIndicator({ active, completed, steps, disabled }: Props): JSX.Element {
  return (
    <div>
      {steps.map((step, index: number) => (
        <StyledIndicatorItem key={step}>
          <Indicator
            active={index === active}
            completed={completed && completed.includes(index)}
            count={index + 1}
            disabled={disabled && disabled.includes(index)}
            step={step}
          />
        </StyledIndicatorItem>
      ))}
    </div>
  );
}

const StyledIndicatorItem = styled.div`
  position: relative;

  &:before {
    background-color: ${colors.steel[100]};
    content: '';
    height: 16px;
    left: 13px;
    position: absolute;
    top: -16px;
    width: 1px;
    z-index: 1;
  }

  & :first-child:before {
    display: none;
  }
`;
