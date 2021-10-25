/* eslint react/jsx-props-no-spreading: 0 */
import React from 'react';
import styled from 'styled-components';
import { Flexbox } from '../../flexbox';
import { Padding } from '../../padding';
import { colors } from '../../../theme/colors';
import { SpacingValue } from '../../../theme';
import { Chevron } from './icons';

interface ExpandableHeadProps {
  // eslint-disable-next-line
  getToggleProps?: any;
  isClickAnywhere?: boolean;
  isExpanded?: boolean;
  children: React.ReactNode;
  testId?: string;
  onExpandedBackgroundColor?: string;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;
}

export const ExpandableHead = ({
  getToggleProps,
  isClickAnywhere = false,
  isExpanded,
  children,
  testId,
  onExpandedBackgroundColor,
  paddingX = 24,
  paddingY = 24,
}: ExpandableHeadProps): JSX.Element => {
  const headToggleProps = isClickAnywhere ? getToggleProps : undefined;
  const iconToggleProps = isClickAnywhere ? undefined : getToggleProps;
  return (
    <StyledHead
      className={isExpanded ? 'expanded' : 'collapsed'}
      data-testid={testId}
      onExpandedBackgroundColor={onExpandedBackgroundColor}
      isClickAnywhere={isClickAnywhere}
      {...headToggleProps}
    >
      <Padding x={paddingX} y={paddingY} style={{ zIndex: 0 }}>
        <Flexbox alignItems="center" justifyContent="space-between">
          <div>{children}</div>
          <StyledIcon data-testid={`${testId}-trigger`} {...iconToggleProps}>
            <Chevron />
          </StyledIcon>
        </Flexbox>
      </Padding>
    </StyledHead>
  );
};

const StyledHead = styled.div<{ onExpandedBackgroundColor?: string; isClickAnywhere?: boolean }>`
  outline: 0;
  cursor: ${({ isClickAnywhere }) => (isClickAnywhere ? 'pointer' : 'default')};
  position: relative;
  transition: background-color 0.2s ease;

  &.expanded {
    background-color: ${({ onExpandedBackgroundColor }) => onExpandedBackgroundColor || 'inherit'};
    transition: background-color 0.3s ease;
  }

  &:hover {
    background: ${({ isClickAnywhere }) => {
      return isClickAnywhere ? colors.steel[100] : 'inherit';
    }};
  }
`;

const StyledIcon = styled.div`
  cursor: pointer;
  outline: none;
  transition: transform 0.3s ease;
  transform: rotate(180deg);
  border-radius: 100px;
  margin-left: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  .expanded & {
    transition: transform 0.3s ease;
    transform: rotate(0);
  }

  &:hover {
    background: ${colors.steel[100]};
  }

  & svg {
    display: block;
    margin-bottom: 2px;
  }
`;
