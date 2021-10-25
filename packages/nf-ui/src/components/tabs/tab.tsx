import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { colors, fontFamilies } from '../../theme';

interface Props {
  id: string;
  panelId: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => unknown;
  isDisabled?: boolean;
  variant?: string;
}

export function Tab(props: Props): JSX.Element {
  const { id, panelId, children, isActive, onClick, isDisabled, variant } = props;

  const className = classnames({
    [`${variant}`]: variant,
    isActive,
    isDisabled,
  });

  return (
    <StyledTab
      id={id}
      role="tab"
      href={`#${panelId}`}
      aria-controls={panelId}
      aria-selected={isActive}
      className={className}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </StyledTab>
  );
}

const StyledTab = styled.a`
  font-family: ${fontFamilies.body};
  color: ${colors.gray_l};
  font-weight: 600;
  font-size: 14px;
  line-height: 13px;
  padding-bottom: 16px;
  cursor: pointer;
  position: relative;
  display: block;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  &.top-line {
    padding: 16px 24px;
    background: ${colors.gray_xxl};
    border: 1px solid #dbdbdb;
    border-bottom: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    overflow: hidden;
    color: #546a83;
  }

  &.top-line::after {
    top: 0px;
    bottom: auto;
  }

  &.top-line.isActive {
    background: #fff;
    z-index: 5;
  }

  &:hover:not(.isDisabled) {
    color: ${colors.primary};
  }

  &::after {
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: -1px;
    left: 0;
    background: transparent;
  }
  &.isDisabled {
    opacity: 0.4;
  }
  &.isActive {
    color: ${colors.primary};
  }
  &.isActive::after,
  &:hover::after {
    background: ${colors.primary};
    text-decoration: none;
  }
`;
