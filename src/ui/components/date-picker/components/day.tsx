/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from 'react';
import classnames from 'classnames';
import format from 'date-fns/format';
import styled from 'styled-components';

import { colors } from '../../../theme/colors';
import { Day } from '../hooks/calendar';
import { Text } from '../../text';

interface Props {
  day: Day;
  isSelected: boolean;
  isSelectable: boolean;
  onClick: (date: Day['value']) => void;
}

export function DayCell(props: Props): JSX.Element {
  const { day, onClick, isSelected, isSelectable } = props;
  const { value, isCurrentMonth, isToday } = day;

  const classNames = classnames({
    DayCell: true,
    isToday,
    isSelected,
    isSelectable,
    isNotThisMonth: !isCurrentMonth,
  });

  return (
    <StyledDayCell
      className={classNames}
      onClick={() => onClick(value)}
      role="button"
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onClick(value)}
      tabIndex={isSelectable ? 0 : undefined}
      aria-selected={isSelected}
      aria-disabled={!isSelectable}
    >
      <span className="DayCell-inner">
        <Text color="inherit">{format(value, 'D')}</Text>
      </span>
    </StyledDayCell>
  );
}

const StyledDayCell = styled.td`
  height: 30px;
  cursor: pointer;
  padding: 0 2px;

  :focus {
    outline: none;
  }

  :focus:not(:active) {
    outline: none;
    box-shadow: 0 0 0 3px ${colors.brand[300]}50, 0 0 0 1px ${colors.brand[400]} inset;
  }

  :not(.isSelectable) {
    cursor: not-allowed;
  }

  .DayCell-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    height: 25px;
    width: 100%;
    position: relative;
  }

  &.isToday:not(.isSelected) {
    background-color: ${colors.fire[200]};
    color: ${colors.fire[500]};
  }

  &.isNotThisMonth:not(.isSelected) {
    color: ${colors.steel[300]};
  }

  :not(.isSelectable) {
    color: ${colors.steel[300]};
    background-color: ${colors.steel[100]};
  }

  &.isSelectable:hover:not(.isSelected) {
    background-color: ${colors.steel[100]};
  }

  &.isSelected {
    color: white;
    background-color: ${colors.brand[400]};
  }
`;
