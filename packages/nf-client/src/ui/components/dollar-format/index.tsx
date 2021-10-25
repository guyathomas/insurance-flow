import * as React from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import { abbreviateCurrencyNumber } from '../../formatters/abbreviate-number';

export type valueFormat = 'short' | 'long';
export interface DollarFormatProps {
  value: number | string;
  format?: valueFormat;
}

export function DollarFormat(props: DollarFormatProps): JSX.Element {
  const { value, format = 'long' } = props;
  // This is a temp fix until NumberFormat adds https://github.com/s-yadav/react-number-format/issues/252
  const prefix = isAbsoluteNegative(value) ? '($' : '$';
  const suffix = isAbsoluteNegative(value) ? ')' : '';
  return (
    <StyledDiv>
      {format === 'long' && (
        <NumberFormat
          displayType="text"
          decimalScale={2}
          fixedDecimalScale
          value={value}
          thousandSeparator
          prefix={prefix}
          suffix={suffix}
        />
      )}
      {format === 'short' && `$${abbreviateCurrencyNumber(value)}`}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: inline-block;
`;

/**
 * Returns true if
 * value is a string and first index is minus sign or wrapped in ()
 */
function isAbsoluteNegative(value: string | number): boolean {
  return typeof value === 'string' && value.startsWith('(') && value.endsWith(')');
}
