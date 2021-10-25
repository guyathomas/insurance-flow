import classnames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../../theme';

interface Props {
  children: React.ReactNode;
  nowrap?: boolean;
  truncate?: boolean;
  ref?: React.MutableRefObject<unknown>;
  download?: unknown;
  href?: string;
  rel?: string;
  target?: string;
  type?: string;
  referrerPolicy?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => unknown;
  tabIndex?: number;
  testId?: string;
}

function ExternalIcon(props: { className?: string }): JSX.Element {
  const { className } = props;
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 1.5H10.5V7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TextLink(props: Props): JSX.Element {
  const {
    children,
    disabled,
    download,
    href,
    rel,
    target,
    type,
    referrerPolicy,
    style,
    onClick,
    tabIndex,
    testId,
    variant = 'primary',
    nowrap = false,
    truncate = false,
  } = props;
  const isExternal = target === '_blank';

  const className = classnames({
    disabled,
    isExternal,
  });

  return (
    <StyledTextLink
      className={className}
      download={download}
      href={href}
      rel={rel}
      target={target}
      type={type}
      referrerPolicy={referrerPolicy}
      style={style}
      data-variant={variant}
      onClick={onClick}
      tabIndex={tabIndex}
      nowrap={nowrap}
      truncate={truncate}
      data-testid={testId}
    >
      {children}
      {isExternal && nowrap === true && <StyledExternalIcon />}
    </StyledTextLink>
  );
}

const StyledTextLink = styled.a<Props>`
  font-family: 'Open Sans', sans-serif;
  text-decoration: underline;
  font-size: 14px;
  line-height: 21px;
  word-break: break-word;
  color: ${colors.primary};
  position: relative;

  ${({ nowrap }) => nowrap && `white-space: nowrap;`}

  ${({ truncate }) =>
    truncate &&
    `
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    `}

  &[data-variant='primary'] {
    color: ${colors.primary};
  }

  &[data-variant='secondary'] {
    color: #262d46;
  }

  &[target='_blank'] {
    padding-right: 16px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    cursor: not-allowed;
  }
`;

const StyledExternalIcon = styled(ExternalIcon)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;
