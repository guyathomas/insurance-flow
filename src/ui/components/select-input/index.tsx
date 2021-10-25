import * as React from 'react';
import SelectInput from './components/simple-select-input';
import { Option } from './types';
import styled from 'styled-components';
import { Spinner } from '../spinner';
import { colors } from '../../theme';

/**
 * Returns an array of Options
 * @param strings Array of strings
 */
export function stringsToOptions<T extends string>(strings: T[]): Option[] {
  return strings.map((str) => ({ label: str, value: str }));
}

/**
 * Sorting function for select options
 */
export function sortByLabel(a: Option, b: Option): number {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
}

const LoadingSelectInput = (): JSX.Element => (
  <StyledLoadingSelectInput>
    <Spinner color={colors.gray_l} />
  </StyledLoadingSelectInput>
);

export { SelectInput, LoadingSelectInput };
export type { Option };

const StyledLoadingSelectInput = styled.div`
  background: #fafafa;
  border: 1px solid ${colors.gray_xl};
  border-radius: 3px;
  cursor: wait;
  height: 38px;
  position: relative;
`;
