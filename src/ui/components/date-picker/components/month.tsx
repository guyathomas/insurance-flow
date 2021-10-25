/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import { format } from 'date-fns';

import { DayCell } from './day';
import { Text } from '../../text';
import { Calendar, Day as CalendarDay } from '../hooks/calendar';

const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface Props {
  onClick: (date: string) => unknown;
  disableWeekends?: boolean;
  selectedDate?: string;
  calendar: Calendar;
  minDate?: string;
  maxDate?: string;
}

function isDaySelectable(props: Props, day: CalendarDay): boolean {
  const { minDate, maxDate, disableWeekends } = props;

  const isAfterMinDate = minDate ? isAfter(day.value, minDate) : true;
  const isBeforeMaxDate = maxDate ? isBefore(day.value, maxDate) : true;
  const isNotWeekend = disableWeekends ? day.dayOfWeek % 6 !== 0 : true;
  return isAfterMinDate && isBeforeMaxDate && isNotWeekend;
}

export default function CalendarMonth(props: Props): JSX.Element {
  const { calendar, onClick, selectedDate } = props;
  const { days } = calendar;

  return (
    <div>
      <StyledCalendar cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {labels.map((label) => (
              <StyledTableHeader key={label}>
                <Text weight={600} color="dark">
                  {label}
                </Text>
              </StyledTableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((week, index) => (
            <tr key={index}>
              {week.map((day) => {
                const isSelectable = isDaySelectable(props, day);
                return (
                  <DayCell
                    day={day}
                    isSelected={selectedDate ? isSameDay(selectedDate, day.value) : false}
                    key={day.value}
                    isSelectable={isSelectable}
                    onClick={() => {
                      if (isSelectable) {
                        if (day.isCurrentMonth === false) {
                          calendar.setMonth(format(day.value, 'MMMM'));
                        }
                        onClick(day.value);
                      }
                    }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </StyledCalendar>
    </div>
  );
}

const StyledCalendar = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const StyledTableHeader = styled.th`
  height: 30px;
  padding-top: 5px;
`;
