import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import { colors } from '../../theme';
import {
  IconAdd,
  IconAttach,
  IconClose,
  IconEdit,
  IconMore,
  IconRemove,
  IconChevronRight,
  IconChevronLeft,
  IconClock,
  IconExternal,
} from './icons';

export type IconType =
  | 'remove'
  | 'close'
  | 'more'
  | 'add'
  | 'chevronLeft'
  | 'chevronRight'
  | 'clock'
  | 'external'
  | 'edit'
  | 'attach';

interface Props {
  onClick: (e: React.MouseEvent) => void;
  type: IconType;
  disabled?: boolean;
  innerRef?: (el: HTMLElement | null) => void;
  testId?: string;
  elementRef?: React.RefObject<HTMLElement>;
  isActive?: boolean;
}

const iconTypes: Record<IconType, React.FunctionComponent> = {
  close: IconClose,
  remove: IconRemove,
  more: IconMore,
  add: IconAdd,
  attach: IconAttach,
  edit: IconEdit,
  external: IconExternal,
  chevronRight: IconChevronRight,
  chevronLeft: IconChevronLeft,
  clock: IconClock,
};

export function IconButton(props: Props): JSX.Element {
  const { onClick, type, disabled = false, innerRef, elementRef, testId, isActive } = props;
  const Icon = iconTypes[type];

  const classes = classnames({
    isActive,
  });

  return (
    <StyledButton
      className={classes}
      type="button"
      onClick={onClick}
      ref={(elementRef as React.RefObject<HTMLButtonElement>) || innerRef}
      data-testid={testId}
      disabled={disabled}
    >
      <Icon />
    </StyledButton>
  );
}

const StyledButton = styled.button<{ disabled: boolean }>`
  border-radius: 3px;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  color: ${colors.gray};
  padding: 0;
  border: 0;
  background: none;
  opacity: ${({ disabled }) => (disabled ? '0.3' : '1')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};

  :global(*) {
    cursor: pointer;
    pointer-events: none;
  }

  :hover {
    box-shadow: 0 0 0 1px inset #dbdbdb;
    color: ${colors.primary};
  }

  :focus,
  &.isActive {
    outline: none;
    box-shadow: 0 0 0 3px ${colors.primary_l}50, 0 0 0 1px ${colors.primary} inset;
    color: ${colors.primary};
  }
`;
