import classNames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { Spinner } from '../spinner';

interface Props {
  id?: string;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => unknown;
  type?: 'button' | 'submit';
  size?: 'primary' | 'secondary';
  target?: string;
  minWidth?: number;
  testId?: string;
  elementRef?: React.RefObject<HTMLElement>;
  innerRef?: (el: HTMLElement | null) => void;
}

interface ButtonTheme {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
  borderHoverColor: string;
  textHoverColor: string;
  backgroundDisabledColor: string;
  borderDisabledColor: string;
  textDisabledColor: string;
  textLoadingColor: string;
  focusShadowColor: string;
}

export const primaryButtonTheme: ButtonTheme = {
  textColor: 'white',
  borderColor: colors.brand[400],
  backgroundColor: colors.brand[400],
  backgroundHoverColor: colors.brand[300],
  borderHoverColor: colors.brand[300],
  textHoverColor: 'white',
  backgroundDisabledColor: colors.steel[200],
  borderDisabledColor: colors.steel[200],
  textDisabledColor: 'white',
  textLoadingColor: 'white',
  focusShadowColor: `0 0 0 3px ${colors.brand[300]}70`,
};

export const secondaryButtonTheme: ButtonTheme = {
  textColor: colors.steel[500],
  borderColor: colors.steel[200],
  backgroundColor: 'white',
  backgroundHoverColor: 'white',
  borderHoverColor: colors.brand[300],
  textHoverColor: colors.steel[500],
  backgroundDisabledColor: colors.steel[100],
  borderDisabledColor: colors.steel[200],
  textDisabledColor: colors.steel[400],
  textLoadingColor: colors.steel[500],
  focusShadowColor: `0 0 0 3px ${colors.steel[200]}40`,
};

export function Button(props: Props): JSX.Element {
  const {
    id,
    children,
    disabled,
    href,
    loading,
    onClick,
    testId,
    size = 'primary',
    style,
    target,
    type,
    minWidth,
    elementRef,
    innerRef,
  } = props;

  const className = classNames({
    'ui-button': true,
    disabled,
    loading,
    primary: size === 'primary',
    secondary: size === 'secondary',
  });

  const spinner = loading ? <Spinner height={40} /> : null;
  const theme = size === 'primary' ? primaryButtonTheme : secondaryButtonTheme;

  return (
    <>
      {href && !disabled ? (
        <StyledAnchor
          minWidth={minWidth}
          theme={theme}
          id={id}
          data-testid={testId}
          href={href}
          onClick={onClick}
          className={className}
          style={style}
          target={target}
        >
          {spinner}
          <span className="text">{children}</span>
        </StyledAnchor>
      ) : (
        <StyledButton
          minWidth={minWidth}
          theme={theme}
          id={id}
          data-testid={testId}
          type={type}
          onClick={onClick}
          className={className}
          style={style}
          disabled={disabled || loading}
          ref={(elementRef as React.RefObject<HTMLButtonElement>) || innerRef}
        >
          {spinner}
          <span className="text">{children}</span>
        </StyledButton>
      )}
    </>
  );
}

export const sharedButtonStyles = (theme: ButtonTheme, minWidth?: number): string => `
  all: initial;
  appearance: none;
  background-color: ${theme.backgroundColor};
  border-radius: 3px;
  border: 1px solid ${theme.borderColor};
  box-sizing: border-box;
  color: ${theme.textColor} !important;
  cursor: pointer;
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  line-height: 38px;
  padding: 0 16px;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  text-align: center;
  min-width: ${minWidth ? `${minWidth}px` : 'auto'};

  :focus,
  :active {
    outline: none;
    text-decoration: none !important;
  }
  :disabled {
    cursor: not-allowed;
    outline: none;
    box-shadow: none;
  }

  &.loading,
  &.loading:active {
    color: ${theme.textLoadingColor};
    cursor: wait;
    box-shadow: none;
  }
  &.loading .text {
    color: transparent;
  }

  :hover:not(:disabled) {
    background: ${theme.backgroundHoverColor};
    border-color: ${theme.borderHoverColor};
    color: ${theme.textHoverColor};
    text-decoration: none !important;
  }
  &.disabled {
    background-color: ${theme.backgroundDisabledColor};
    border-color: ${theme.borderDisabledColor};
    color: ${theme.textDisabledColor};
  }
  :focus:not(:disabled),
  :active:not(:disabled) {
    box-shadow: ${theme.focusShadowColor};
  }

  &.secondary.disabled {
    opacity: 0.6;
  }
`;

const StyledButton = styled.button<{ minWidth: number }>`
  ${({ minWidth, theme }) => sharedButtonStyles(theme, minWidth)}
`;

const StyledAnchor = styled.a<{ minWidth: number }>`
  ${({ minWidth, theme }) => sharedButtonStyles(theme, minWidth)}
`;
