import React from 'react';

import { Padding } from '../padding';
import { Stack } from '../stack';
import { RadioButton, SelectableOption } from '../radio-button';
import { TextColors } from '../text';

interface Props {
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
  label?: string;
  name: string;
  onChange?: (selection: string) => unknown;
  options: SelectableOption[];
  textColor?: TextColors;
  value?: string;
}

export function RadioButtonGroup({
  direction = 'vertical',
  disabled,
  label,
  name,
  onChange,
  options,
  textColor,
  value,
}: Props): JSX.Element {
  function handleChange(selection: string): void {
    if (onChange) {
      onChange(selection);
    }
  }

  return (
    <Stack gap={2} direction={direction}>
      {options.map((option: SelectableOption) => {
        return (
          <Padding bottom={2} right={16} key={`${name}-${option.value}`}>
            <RadioButton
              disabled={disabled}
              isChecked={value === option.value}
              label={label || option.label}
              name={name}
              onChange={() => handleChange(option.value.toString())}
              textColor={textColor}
              value={option.value}
            />
          </Padding>
        );
      })}
    </Stack>
  );
}
