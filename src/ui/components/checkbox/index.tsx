import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

function IconActive(props: IconProps): JSX.Element {
  const { disabled } = props;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect width="20" height="20" rx="3" fill={disabled ? colors.steel[300] : colors.brand[400]} />
      <g>
        {/* eslint-disable max-len */}
        <path
          d="M8.07574 14.2985L4.17574 10.3985C3.94144 10.1642 3.94144 9.78431 4.17574 9.54999L5.02425 8.70145C5.25855 8.46713 5.63847 8.46713 5.87278 8.70145L8.50001 11.3287L14.1272 5.70145C14.3615 5.46715 14.7415 5.46715 14.9758 5.70145L15.8243 6.54999C16.0586 6.78429 16.0586 7.16419 15.8243 7.39852L8.92427 14.2985C8.68994 14.5328 8.31004 14.5328 8.07574 14.2985V14.2985Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

const StyledIconActive = styled(IconActive)`
  display: block;
  cursor: pointer;
  &.disabled {
    cursor: not-allowed;
  }
`;

const StyledIconInactive = styled.div<IconProps>`
  height: 20px;
  width: 20px;
  border-radius: 3px;
  border: 1px solid ${colors.steel[300]};
  background: white;
  box-sizing: border-box;
  cursor: pointer;
  &.disabled {
    cursor: not-allowed;
    border-color: ${colors.steel[200]} !important;
  }
  &:hover {
    border-color: ${colors.brand[400]};
  }
`;

const StyledContainer = styled.div`
  border-radius: 3px;
  height: 20px;
  width: 20px;
  &:hover {
    box-shadow: 0 0 0 3px ${colors.brand[200]}50, 0 0 0 1px inset ${colors.brand[400]};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${colors.brand[200]}50;
  }
  &.disabled {
    cursor: not-allowed;
    box-shadow: none !important;
  }
`;

interface Props {
  isActive?: boolean;
  onClick?: (isActive: boolean) => unknown;
  disabled?: boolean;
  testId?: string;
}

interface IconProps {
  className?: string;
  disabled?: boolean;
}

export function Checkbox(props: Props): JSX.Element {
  const { isActive, onClick, disabled, testId } = props;

  return (
    <StyledContainer
      data-testid={testId}
      className={classNames({ disabled })}
      onClick={(e) => {
        if (onClick && !disabled) {
          e.stopPropagation();
          onClick(!isActive);
        }
      }}
      role="checkbox"
      aria-checked={isActive}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.keyCode === 32 && onClick && !disabled) {
          e.stopPropagation();
          onClick(!isActive);
        }
      }}
    >
      {isActive ? (
        <StyledIconActive className={classNames({ disabled })} disabled={disabled} />
      ) : (
        <StyledIconInactive className={classNames({ disabled })} disabled={disabled} />
      )}
    </StyledContainer>
  );
}
