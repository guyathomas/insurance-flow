import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Input } from '../input';
import { Counter } from './components/counter';

type ChangeHandler = (value: string) => void;

interface Props {
  className?: string;
  debounce?: number;
  defaultValue?: string;
  disabled?: boolean;
  fieldId?: string;
  height?: number;
  innerRef?: React.RefObject<HTMLTextAreaElement>;
  inputId?: string;
  invisible?: boolean;
  isClearable?: boolean;
  isCounted?: boolean;
  isGrouped?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  maxLength?: number;
  name?: string;
  onChange?: ChangeHandler;
  onFocus?: () => unknown;
  onBlur?: (value?: string) => unknown;
  placeholder?: string;
  testId?: string;
  value?: string | null;
  disabledResize?: boolean;
}

export function Textarea(props: Props): JSX.Element {
  const {
    className,
    defaultValue,
    disabled,
    fieldId,
    height,
    innerRef,
    inputId,
    invisible,
    isCounted = false,
    isInvalid,
    isRequired,
    testId,
    name,
    maxLength,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    value,
    disabledResize = false,
  } = props;

  const [count, setCount] = useState<number>(value != null ? value.length : 0);

  function handleChange(e: string): void {
    if (e) {
      setCount(e.length);
    }
    if (onChange) {
      onChange(e);
    }
  }

  // no {...otherProps}. be explicit instead
  return (
    <div id={fieldId}>
      <StyledTextArea
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        fieldId={inputId}
        height={height}
        innerRef={innerRef}
        invisible={invisible}
        isInvalid={isInvalid}
        isRequired={isRequired}
        maxLength={maxLength}
        name={name}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder={placeholder}
        type="textarea"
        testId={testId}
        value={value}
        disabledResize={disabledResize}
      />
      {isCounted && maxLength && <Counter length={count} maxLength={maxLength} />}
    </div>
  );
}

const StyledTextArea = styled(Input)<{ disabledResize?: boolean }>`
  ${({ disabledResize }) =>
    disabledResize &&
    css`
      resize: none;
    `}
`;
