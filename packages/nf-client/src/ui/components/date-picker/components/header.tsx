import React, { useMemo } from 'react';
import times from 'lodash/times';
import { Flexbox, FlexCell } from '../../flexbox';
import { IconButton } from '../../icon-button';
import { Padding } from '../../padding';
import Select from './select';
import { Calendar } from '../hooks/calendar';

interface Props {
  maxYear?: number;
  minYear?: number;
  calendar: Calendar;
}

export default function CalendarHeader(props: Props): JSX.Element {
  const { maxYear, minYear, calendar } = props;
  const { increaseMonth, decreaseMonth, setYear, setMonth, year, month } = calendar;

  const yearOptions = useMemo(() => {
    const CURRENT_YEAR = new Date().getFullYear();
    const max = maxYear || CURRENT_YEAR + 10;
    const min = minYear || CURRENT_YEAR - 10;

    // populate a list of years
    // 'max - min + 1' ensures we include the maxYear
    const years: number[] = [];
    times(max - min + 1, (currentYear) => years.push(currentYear + min));

    // create option elements
    return years.reverse().map((val) => <option key={val}>{val}</option>);
  }, [minYear, maxYear]);

  return (
    <Flexbox justifyContent="space-between" alignItems="center" width="100%">
      <FlexCell>
        <IconButton type="chevronLeft" onClick={decreaseMonth} />
      </FlexCell>
      <FlexCell flex={1}>
        <Padding x={4}>
          <Flexbox width="100%">
            <Padding right={4} style={{ flex: '1.5' }}>
              <Select minWidth="100px" value={month} onChange={setMonth}>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </Select>
            </Padding>
            <div style={{ flex: '1' }}>
              <Select minWidth="60px" value={year} onChange={(newYear) => setYear(Number(newYear))}>
                {yearOptions}
              </Select>
            </div>
          </Flexbox>
        </Padding>
      </FlexCell>
      <FlexCell>
        <IconButton type="chevronRight" onClick={increaseMonth} />
      </FlexCell>
    </Flexbox>
  );
}
