import React from 'react';
import CalendarMonth from './components/month';
import { Padding } from '../padding';
import CalendarHeader from './components/header';
import { useCalendar } from './hooks/calendar';
import { setYear } from 'date-fns';
import { getYear } from 'date-fns';
import range from 'lodash/range';

export type ISODateString = string;

interface Props {
  onChange: (date?: string) => unknown;
  disableWeekends?: boolean;
  value?: ISODateString | null;
  maxYear?: number;
  minYear?: number;
  minDate?: ISODateString;
  maxDate?: ISODateString;
}

export function DatePicker(props: Props): JSX.Element {
  const { onChange, disableWeekends, maxYear, minYear, value, minDate, maxDate } = props;
  const normalizedValue = value == null || value === '' ? undefined : value;

  // set the calendarContext
  // if minYear AND maxYear. Check if the current year exists in that range and define it as context
  // otherwise check just for maxYear and and define it as context
  let calendarContext = normalizedValue;
  const yearsRange = minYear && maxYear ? range(minYear, maxYear) : undefined;
  const currentYear = getYear(new Date());

  if (!normalizedValue && yearsRange && yearsRange.includes(currentYear)) {
    calendarContext = setYear(normalizedValue, currentYear).toISOString();
  } else if (!normalizedValue && maxYear) {
    calendarContext = setYear(normalizedValue, maxYear).toISOString();
  }

  function selectDate(day: string): void {
    onChange(day);
  }

  const calendar = useCalendar({
    initialValue: calendarContext,
  });

  return (
    <div style={{ width: 224 }}>
      <Padding bottom={8}>
        <CalendarHeader calendar={calendar} maxYear={maxYear} minYear={minYear} />
      </Padding>
      <CalendarMonth
        disableWeekends={disableWeekends}
        calendar={calendar}
        onClick={selectDate}
        selectedDate={normalizedValue}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}
