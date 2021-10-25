import classnames from 'classnames';
import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { fontFamilies, colors } from '../../../theme';
import { Option, GroupedOptions } from '../types';
import { IconSelect } from './icons';

// TODO(gwintrob): support loading indicator for loading async data
interface Props {
  fieldId?: string;
  defaultValue?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  name?: string;
  showSelectAnOption?: boolean;
  onChange: (value: string) => unknown;
  options: Option[] | GroupedOptions[];
  value?: string | null;
  autoComplete?: 'on' | 'off';
  innerRef?: React.MutableRefObject<HTMLSelectElement | null>;
  placeholder?: string;
  width?: string;
  testId?: string;
}

/**
 * Returns an array of <option> and <optgroup> elements
 * @param options Array of options or grouped options
 */
function createOptionElements(
  options: Option[] | GroupedOptions[],
  showSelectAnOption?: boolean,
  placeholder?: string,
): JSX.Element[] {
  const els: JSX.Element[] = [];
  if (showSelectAnOption === true) {
    els.push(
      <StyledPlaceholderOption disabled value="" key="select an option">
        {placeholder || '-- select an option --'}
      </StyledPlaceholderOption>,
    );
  }

  options.forEach((option: Option | GroupedOptions) => {
    if ('options' in option) {
      els.push(
        <optgroup label={option.label} key={option.label} className="option">
          {createOptionElements(option.options)}
        </optgroup>,
      );
    } else {
      els.push(
        <option value={option.value} key={option.value} className="option">
          {option.label}
        </option>,
      );
    }
  });
  return els;
}

export default function SimpleSelectInput(props: Props): JSX.Element {
  const {
    options,
    fieldId,
    name,
    innerRef,
    value,
    disabled,
    defaultValue,
    onChange,
    isInvalid,
    showSelectAnOption,
    placeholder,
    testId,
    width,
  } = props;

  const [initialDisabledState, setInitialDisabledState] = useState<boolean | undefined>(showSelectAnOption === true);
  const selectOptions = useMemo(() => createOptionElements(options, showSelectAnOption, placeholder), [options]);

  const className = classnames({
    SimpleSelectInput: true,
    isInvalid,
    isInactive: disabled,
    isDisabled: initialDisabledState === true && !disabled,
  });

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (initialDisabledState) setInitialDisabledState(false);
    onChange(e.target.value);
  }

  useEffect(() => {
    // If the value prop changes outside the onChange event, it should remove the disabled styling
    if (initialDisabledState && value) {
      setInitialDisabledState(false);
    }
  }, [value]);

  const defaultSelectInputAttributes = {
    'data-testid': testId,
    disabled,
    id: fieldId,
    name,
    onChange: handleChange,
    ref: innerRef as React.RefObject<HTMLSelectElement>,
    width,
  };

  // Avoid the following noisy console warning:
  // Select elements must be either controlled or uncontrolled (specify either the value prop,
  // or the defaultValue prop, but not both).
  const selectAttributes = defaultValue
    ? { defaultValue, ...defaultSelectInputAttributes }
    : { value: value || '', ...defaultSelectInputAttributes };

  return (
    <StyledSimpleSelectWrapper className={className}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <StyledSimpleSelect {...selectAttributes}>{selectOptions}</StyledSimpleSelect>
      <SimpleSelectInputIcon>
        <IconSelect />
      </SimpleSelectInputIcon>
    </StyledSimpleSelectWrapper>
  );
}

const StyledSimpleSelectWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StyledSimpleSelect = styled.select<{ width?: string }>`
  appearance: none;
  background: white;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  box-sizing: border-box;
  color: #000;
  display: block;
  font-family: ${fontFamilies.body};
  font-size: 14px;
  height: 40px;
  line-height: 21px;
  padding: 0 32px 0 12px;
  width: ${(p) => p.width || '100%'};

  &:focus,
  &:active:not(:disabled) {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary_l}30;
    outline: none;
  }

  .isInactive & {
    color: ${colors.text_placeholder};
    background: #f5f6f8;
  }

  .isDisabled & {
    color: ${colors.text_placeholder};
  }

  &.isInvalid {
    border-color: ${colors.red};
    box-shadow: 0 0 0 3px rgba(189, 73, 50, 0.25);
  }
`;

const StyledPlaceholderOption = styled.option`
  color: ${colors.gray_l};
`;

const SimpleSelectInputIcon = styled.div`
  align-items: center;
  color: ${colors.gray};
  display: flex;
  height: 20px;
  justify-content: center;
  pointer-events: none;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;

  &.SimpleSelectInput-control:focus {
    color: ${colors.primary};
  }
`;
