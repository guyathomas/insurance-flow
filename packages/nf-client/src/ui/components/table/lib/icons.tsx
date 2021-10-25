/* eslint max-len: 0 */
import React from 'react';
import { colors } from '../../../theme';
import { Direction } from './types';

interface CaretProps {
  direction: Direction;
  isActive: boolean;
}

export function IconCaret(props: CaretProps): JSX.Element {
  const { direction, isActive } = props;
  let topColor = colors.gray_xl;
  let bottomColor = colors.gray_xl;

  if (direction === 'descending' && isActive) {
    topColor = colors.primary;
  }

  if (direction === 'ascending' && isActive) {
    bottomColor = colors.primary;
  }

  return (
    <svg width="9" height="13" viewBox="0 0 9 13">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8.1875H8.25L4.125 13L0 8.1875Z" fill={bottomColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 4.8125H8.25L4.125 0L0 4.8125Z" fill={topColor} />
    </svg>
  );
}

interface GenericObject {
  [key: string]: string;
}
export const textColors: GenericObject = {
  warning: colors.secondary_d,
  alert: colors.red_l,
  primary: colors.primary,
  success: colors.green,
};

export interface IconProps {
  color: string;
}

export function AlertIcon(props: IconProps): JSX.Element {
  const { color } = props;

  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M7.5 10.5H4.5C4.5 11.325 5.175 12 6 12C6.825 12 7.5 11.325 7.5 10.5Z" fill={textColors[color]} />
      <path
        d="M11.25 8.25H10.875C10.35 7.725 9.75 6.975 9.75 6V3.75C9.75 1.65 8.1 0 6 0C3.9 0 2.25 1.65 2.25 3.75V6C2.25 6.975 1.65 7.725 1.125 8.25H0.75C0.3 8.25 0 8.55 0 9C0 9.45 0.3 9.75 0.75 9.75H11.25C11.7 9.75 12 9.45 12 9C12 8.55 11.7 8.25 11.25 8.25Z"
        fill={textColors[color]}
      />
    </svg>
  );
}
