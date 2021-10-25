/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Select, { FocusEventHandler, InputActionMeta } from 'react-select';
import styled from 'styled-components';

import { colors, fontFamilies } from '../../../theme';
import { IconButton } from '../../icon-button';
import { IconSearch } from '../../icons';
import { Option, GroupedOptions } from '../types';

import { IconSelect } from './icons';

interface Props {
  defaultValue?: string;
  disabled?: boolean;
  isClearable?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange: (value: string | string[]) => unknown;
  onInputChange?: (newValue: string, inputActionMeta: InputActionMeta) => void;
  options?: Option[] | GroupedOptions[];
  value?: string | string[] | null;
  placeholder?: string;
  icon?: 'select' | 'search';
  id?: string;
  testId?: string;
  inputId?: string;
}

interface ControlState {
  isFocused: boolean;
  isSelected: boolean;
  data: Option;
}

/**
 * Takes an array of options that may contain option groups and finds
 * the option that has the value that matches the search value.
 * @param options Array of options or grouped options
 * @param value The option value to search for
 */
function findOptionValue(options: Option[] | GroupedOptions[], searchValue?: string | null): Option | undefined {
  if (!searchValue) return undefined;
  let matched: undefined | Option;
  options.forEach((option: Option | GroupedOptions) => {
    if ('value' in option) {
      if (option.value === searchValue) {
        matched = option;
      }
    } else if (!matched) {
      matched = findOptionValue(option.options, searchValue);
    }
  });
  return matched;
}

/**
 * Formatter for react-select. This formats the groups of options within
 * the dropdown menu.
 * @param data
 */
function formatGroupLabel(data: GroupedOptions): JSX.Element {
  const groupStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'bold',
  };

  const groupBadgeStyles: React.CSSProperties = {
    display: 'none',
  };

  return (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
}

/**
 * Formatter for react-select. This formats options within the dropdown
 * @param data
 * @param context
 */
function formatOptionLabel(data: Option, context: { context: 'menu' | 'value' }): JSX.Element {
  const { context: optionContext } = context;

  const descriptionStyles: React.CSSProperties = {
    padding: '8px',
  };

  return (
    <div>
      <span>{data.label}</span>
      {data.description && optionContext === 'menu' && <span style={descriptionStyles}>{data.description}</span>}
    </div>
  );
}

/*
  For other React-Select features please see https://react-select.com
  Features not yet implemented:
    - Async: for loading data asynchronously, shows loading indicators
    - Creatable: giving the user the ability to create new options on the fly
    - Fixed Options: works with Multi-select to pre-selected options
*/
export function AdvancedSelectInput(props: Props): JSX.Element {
  const {
    defaultValue = '',
    disabled,
    isClearable,
    isInvalid,
    isLoading,
    isMulti,
    name,
    onBlur,
    onChange,
    onInputChange,
    options = [],
    value,
    placeholder,
    icon = 'select',
    id,
    testId,
    inputId,
  } = props;

  const defaultOption = findOptionValue(options, defaultValue);
  const optionValue =
    value && Array.isArray(value)
      ? (value.map((val) => findOptionValue(options, val)).filter((val) => !!val) as Option[])
      : findOptionValue(options, value as string);
  const [isFocused, setFocused] = React.useState(false);

  function handleChange(option?: Option | Option[]): void {
    if (!option) {
      onChange('');
      return;
    }
    if (Array.isArray(option)) {
      onChange(option.map((o) => o.value));
    } else {
      onChange(option.value);
    }
  }

  /**
   * Custom styles for react-select
   */
  const selectStyles = {
    indicatorsContainer: () => ({
      color: colors.gray,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: '10px',
      height: '20px',
      width: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      lineHeight: '21px',
    }),
    dropdownIndicator: () => ({
      visibility: 'hidden',
    }),
    loadingIndicator: (styles: React.CSSProperties) => ({
      ...styles,
      paddingRight: 16,
    }),
    clearIndicator: () => ({
      display: 'flex',
      alignItems: 'center',
      marginRight: 16,
      ':hover': {
        color: colors.primary,
        cursor: 'pointer',
        background: colors.gray_xxl,
        borderRadius: 3,
      },
    }),
    container: (styles: React.CSSProperties) => ({
      ...styles,
      fontFamily: fontFamilies.body,
      fontSize: '14px',
    }),
    control: (_styles: React.CSSProperties, state: ControlState) => {
      const focusStyles =
        state.isFocused || state.isSelected
          ? {
              border: `1px solid ${colors.primary}`,
              boxShadow: `0 0 0 3px ${colors.primary_l}30`,
            }
          : {
              border: '1px solid #dbdbdb',
            };
      const invalidStyles = isInvalid
        ? {
            borderColor: colors.red,
            boxShadow: '0 0 0 3px rgba(189, 73, 50, 0.25)',
          }
        : {};
      return {
        ...focusStyles,
        ...invalidStyles,
        lineHeight: '21px',
        color: colors.gray_d,
        padding: '5px 12px',
        minHeight: '40px',
        boxSizing: 'border-box',
        width: '100%',
        borderRadius: '3px',
        background: 'white',
        appearance: 'none',
        display: 'flex',
        alignItems: 'center',
      };
    },
    option: (_provided: unknown, state: ControlState) => {
      const focused = state.isFocused
        ? {
            background: colors.primary,
            color: 'white',
          }
        : {};
      const optionDisabled = state.data.isDisabled
        ? {
            color: colors.gray_l,
            cursor: 'default',
            ':hover': {
              background: 'none',
            },
          }
        : {};
      return {
        fontSize: '14px',
        fontFamily: fontFamilies.body,
        padding: '8px 12px',
        cursor: 'pointer',
        color: colors.gray_d,
        background: state.isSelected ? colors.gray_xxl : 'white',
        ':hover': {
          background: colors.primary,
          color: 'white',
        },
        ...focused,
        ...optionDisabled,
      };
    },
    placeholder: (styles: React.CSSProperties) => ({
      ...styles,
      color: colors.gray_l,
      lineHeight: '21px',
    }),
    valueContainer: () => ({
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    }),
    menu: (styles: React.CSSProperties) => ({
      ...styles,
      zIndex: 2,
    }),
    multiValue: () => ({
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      fontSize: 12,
      background: colors.primary_xxl,
      boxShadow: `0 0 0 1px inset ${colors.primary_xl}`,
      borderRadius: 2,
      height: 24,
      marginRight: 4,
    }),
    multiValueLabel: () => ({
      color: colors.primary,
      padding: '0 0 0 8px',
    }),
    multiValueRemove: () => ({
      color: colors.primary,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 24,
      width: 24,
      boxShadow: `1px 0 inset ${colors.primary_xl}`,
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
      marginLeft: 8,
      cursor: 'pointer',
      ':hover': {
        background: colors.primary,
        color: 'white',
      },
    }),
  };

  return (
    <StyledDiv onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <Select
        inputId={inputId}
        data-testid={testId}
        defaultValue={defaultOption}
        classNamePrefix="react-select"
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        isClearable={isClearable}
        isDisabled={disabled}
        isLoading={isLoading}
        isMulti={isMulti}
        name={`advanced-select-${name}`}
        options={options}
        styles={selectStyles as any}
        onBlur={onBlur}
        onChange={handleChange as any}
        onInputChange={onInputChange}
        placeholder={placeholder}
        value={optionValue}
        components={{
          ClearIndicator: ({ clearValue }) => (
            <div style={{ marginRight: 4 }}>
              <IconButton type="close" onClick={clearValue} />
            </div>
          ),
        }}
      />
      <input type="hidden" name={name} id={id} value={value || ''} />
      <StyledIcon isFocused={isFocused}>
        {icon === 'select' ? <IconSelect testId="asi-icon-select" /> : <IconSearch testId="asi-icon-search" />}
      </StyledIcon>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  position: relative;

  :global(.react-select__control) {
    position: relative;
    z-index: 1;
  }
  :global(.react-select__menu) {
    position: absolute;
    z-index: 2;
  }
  :global(.react-select__single-value) {
    max-width: calc(100% - 80px);
  }
`;

const StyledIcon = styled.div<{ isFocused: boolean }>`
  color: ${({ isFocused }) => (isFocused ? colors.primary : colors.gray)};
  position: absolute;
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
  padding-left: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  border-left: 1px solid #dbdbdb;
  z-index: 1;
`;
