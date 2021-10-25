/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import { colors, fontFamilies } from '../../theme';

type ChangeHandler = (value: number) => void;

interface Props {
  allowNegative?: boolean;
  decimalScale?: number;
  defaultValue?: string | number;
  disabled?: boolean;
  name: string;
  onChange?: ChangeHandler;
  value?: string | number;
  testId?: string;
}

const StyledCurrencyInput = styled.div`
  border: 1px solid ${colors.gray_xl};
  border-radius: 3px;
  color: #000;
  display: flex;

  &:focus,
  &:focus-within,
  &:active:not(:disabled) {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary_l}30;
  }
`;

const StyledDollarSign = styled.div`
  background-color: ${colors.gray_xxl};
  border-right: 1px solid ${colors.gray_xl};
  color: ${colors.text_placeholder};
  font-family: ${fontFamilies.body};
  position: relative;
  width: 40px;

  &:after {
    content: '$';
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledInput = styled.input`
  border: none;
  color: ${colors.gray_d};
  font-family: ${fontFamilies.body};
  font-size: 14px;
  line-height: 22px;
  padding: 8px 12px;
  width: 100%;

  &::placeholder {
    color: ${colors.text_placeholder};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: ${colors.gray_xxl};
  }
`;

export function CurrencyInput(props: Props): JSX.Element {
  const {
    allowNegative = false,
    decimalScale = 2,
    defaultValue,
    disabled,
    name,
    onChange,
    value,
    testId,
    ...otherProps
  } = props;
  return (
    <StyledCurrencyInput>
      <StyledDollarSign />
      <NumberFormat
        allowNegative={allowNegative}
        customInput={StyledInput}
        decimalScale={decimalScale}
        defaultValue={defaultValue}
        disabled={disabled}
        fixedDecimalScale
        isNumericString
        name={name}
        onValueChange={(valueObject) => {
          if (onChange) {
            onChange(valueObject.floatValue);
          }
        }}
        placeholder="0.00"
        thousandSeparator
        value={value}
        data-testid={testId}
        {...otherProps}
      />
    </StyledCurrencyInput>
  );
}
