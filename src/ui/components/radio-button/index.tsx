import React, { useMemo } from 'react';
import styled from 'styled-components';
import uid from 'uid';

import { colors } from '../../theme';
import { Flexbox } from '../flexbox';
import { Text, TextSizes, TextColors } from '../text';

interface Props {
  textColor?: TextColors;
  disabled?: boolean;
  isChecked?: boolean;
  label: string;
  name: string;
  onChange?: () => unknown;
  testId?: string;
  textSize?: TextSizes;
  value: string | number;
}

export interface SelectableOption {
  label: string;
  value: string | number;
}

export function RadioButton({
  textColor = 'default',
  disabled,
  isChecked,
  label,
  name,
  onChange,
  testId,
  textSize = 'regular',
  value,
}: Props): JSX.Element {
  const id = useMemo(() => uid(), []);
  const color = (): TextColors => {
    if (disabled && !isChecked) {
      return 'light';
    }
    return textColor;
  };
  return (
    <StyledWrapper>
      <Flexbox alignItems="center">
        <label htmlFor={id}>
          <StyledRadio
            type="radio"
            name={name}
            disabled={disabled}
            data-testid={testId}
            id={id}
            value={value}
            checked={isChecked}
            onChange={onChange}
          />
          <span>
            <Text size={textSize} color={color()}>
              {label}
            </Text>
          </span>
        </label>
      </Flexbox>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledRadio = styled.input`
  &:checked,
  &:not(:checked) {
    left: -9999px;
    position: absolute;
  }

  & + span,
  &:not(:checked) + span {
    color: #666;
    cursor: pointer;
    display: inline-block;
    line-height: 24px;
    padding-left: 28px;
    position: relative;
    box-sizing: border-box;
  }

  & + span:before,
  &:not(:checked) + span:before {
    background: #fff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px ${colors.gray_xl};
    border-radius: 100%;
    content: '';
    height: 20px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: border-width 0.2s ease;
    width: 20px;
  }

  &:checked + span:before {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 8px ${colors.primary};
    transition: box-shadow 0.3s ease;
  }

  &:disabled + span {
    cursor: not-allowed;
  }

  &:disabled&:checked + span:before {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 8px ${colors.gray};
  }
`;
