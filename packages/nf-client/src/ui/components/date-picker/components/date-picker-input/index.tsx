import React, { useState, useEffect } from 'react';
import formatDate from 'date-fns/format';
import { DatePicker, ISODateString } from '../..';
import { Box } from '../../../box';
import { Padding } from '../../../padding';
import { FadeIn } from '../../../fade-in';
import { Input } from '../../../input';
import { Popover } from '../../../popover';
import { useKeyEvent } from '../../../../hooks/key-event';
import { useTether } from '../../../../hooks/tether';
import moment from 'moment';

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

interface Props {
  autoComplete?: boolean;
  disableWeekends?: boolean;
  disabled?: boolean;
  clearOnDisabled?: boolean;
  format?: string;
  initValue?: ISODateString | CalendarDate | null;
  isInvalid?: boolean;
  isRequired?: boolean;
  maxDate?: ISODateString;
  maxYear?: number;
  minDate?: ISODateString;
  minYear?: number;
  name?: string;
  fieldId?: string;
  testId?: string;
  onChange?: (value?: string | null) => unknown;
}

const FORMATTERS = ['MM-DD-YYYY', 'MMM-DD-YYYY', 'MMM-DD', 'DD-MM', 'DD-MM-YYYY', 'YYYY-MM-DD'];

export function DatePickerInput(props: Props): JSX.Element {
  const {
    autoComplete = false,
    disableWeekends,
    disabled,
    format = 'YYYY-MM-DD',
    initValue,
    isRequired,
    maxDate,
    maxYear,
    minDate,
    minYear,
    name,
    onChange,
    fieldId,
    testId,
    clearOnDisabled,
  } = props;
  const [visible, setVisible] = useState(false);

  let initCleanValue = null;

  function formatInitialValue(): void {
    if (initValue != null && initValue !== '') {
      if (typeof initValue === 'object') {
        initCleanValue = moment({ year: initValue.year, month: initValue.month - 1, day: initValue.day }).format(
          format,
        );
      } else initCleanValue = formatDate(initValue, format);
    }
  }
  formatInitialValue();

  const [value, setValue] = useState<ISODateString | null>(initCleanValue);

  useEffect(() => {
    formatInitialValue();
    setValue(initCleanValue);
  }, [initValue]);

  function isOutOfRange(currentValue?: string | null): boolean {
    const parsed = moment(currentValue || '', FORMATTERS);
    if (!parsed.isValid()) return false;
    if (disableWeekends && parsed.toDate().getDay() % 6 === 0) return false;
    if (minDate && maxDate) return parsed.isBefore(moment(minDate)) || parsed.isSameOrAfter(moment(maxDate));
    if (minDate) return parsed.isBefore(moment(minDate));
    if (maxDate) return parsed.isSameOrAfter(moment(maxDate));
    return false;
  }

  const { targetRef, elementRef } = useTether({
    attachment: 'top left',
    targetAttachment: 'bottom left',
    constraints: [
      {
        to: 'window',
        pin: true,
        attachment: 'bottom',
      },
    ],
  });

  // Hide if they tab out. We don't use the input blur because
  // it loses focus when you interact with the date picker popover.
  useKeyEvent(
    'Tab',
    () => {
      setVisible(false);
      const parsed = moment(value || '', FORMATTERS);
      if (parsed.isValid()) {
        setValue(parsed.format(format));
      }
    },
    [],
  );

  React.useEffect(() => {
    const parsed = moment(value || '', FORMATTERS);
    if (onChange) {
      if (parsed.isValid()) onChange(value);
      else onChange(value || null);
    }
  }, [value]);

  function completeDate(currentValue?: string): void {
    const parsed = moment(currentValue || '', FORMATTERS);
    if (parsed.isValid()) setValue(formatDate(parsed.toISOString(), format));
  }

  let isInvalid;
  if (value === '' || value === null) isInvalid = false;
  else isInvalid = isOutOfRange(value) || !moment(value, FORMATTERS).isValid();

  const val = clearOnDisabled && value !== null ? '' : value;

  return (
    <>
      <Input
        disabled={disabled}
        innerRef={targetRef}
        name={name}
        fieldId={fieldId}
        testId={testId}
        onChange={setValue}
        onFocus={() => setVisible(true)}
        onBlur={(currentValue) => completeDate(currentValue)}
        placeholder={format}
        type="date"
        value={val}
        isRequired={isRequired}
        autoComplete={autoComplete ? 'on' : 'off'}
        isInvalid={isInvalid}
      />
      <Popover isOpen={visible} onToggle={setVisible} innerRef={elementRef}>
        <FadeIn yOffset="-5px" duration="200ms">
          <Box style={{ background: 'white' }} border={1} borderRadius={3} boxShadow="overlay">
            <Padding size={8}>
              <DatePicker
                disableWeekends={disableWeekends}
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                minYear={minYear || undefined}
                maxYear={maxYear || undefined}
                onChange={(newValue) => {
                  setVisible(false);
                  if (newValue) setValue(formatDate(newValue, format));
                  else setValue(null);
                }}
              />
            </Padding>
          </Box>
        </FadeIn>
      </Popover>
    </>
  );
}
