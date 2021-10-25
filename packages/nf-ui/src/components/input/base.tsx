import styled from 'styled-components';

import { colors, fontFamilies } from '../../theme';

export const StyledInput = styled.input`
  font-family: ${fontFamilies.body};
  font-size: 14px;
  border: 1px solid #dbdbdb;
  line-height: 21px;
  color: #000;
  padding: 8px 12px;
  height: 40px;
  box-sizing: border-box;
  width: 100%;
  display: block;
  border-radius: 3px;
  background: white;
  appearance: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: ${colors.gray_xxl};
  }

  &:focus,
  &:active:not(:disabled) {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary_l}30;
  }

  &.isInvalid {
    border-color: ${colors.red};
    box-shadow: 0 0 0 3px rgba(189, 73, 50, 0.25);
  }
`;
