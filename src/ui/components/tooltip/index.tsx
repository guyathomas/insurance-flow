import classnames from 'classnames';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from '../../hooks/debounced-callback';
import { useTether } from '../../hooks/tether';
import { colors } from '../../theme';

type Position = 'left' | 'right';

interface Props {
  children: React.ReactNode;
  text: string;
  testId?: string;
  tipTestId?: string;
  positionTip?: Position;
  offset?: string;
}

interface TooltipPositon {
  attachment: string;
  targetAttachment: string;
  offset: string;
}

function getTooltipPosition(position: Position, offset?: string): TooltipPositon {
  if (position === 'left') {
    return {
      attachment: 'top right',
      targetAttachment: 'top left',
      offset: offset || '16px 4px',
    };
  }
  // Top right by default
  return {
    attachment: 'top left',
    targetAttachment: 'top right',
    offset: offset || '16px -4px',
  };
}

export function Tooltip({ children, text, testId, tipTestId, positionTip, offset }: Props): JSX.Element {
  const [enabled, setEnabled] = useState(false);

  const { targetRef, elementRef } = useTether(getTooltipPosition(positionTip, offset));

  const classes = classnames({
    tip: true,
    enabled,
  });

  // we should debounce this so onFocus and onMouseEnter dont clash
  const debouncedOnChange = useDebouncedCallback(setEnabled, 150);

  // if visible by focus, and then hovered, we should persist a visible tooltip
  const handleEnabled = (): void => {
    if (enabled) return;
    setEnabled(true);
    if (debouncedOnChange) {
      debouncedOnChange(true);
    }
  };

  // if invisible by blur, and then mouseout, we should persist a invisible tooltip
  const handleDisabled = (): void => {
    if (!enabled) return;
    setEnabled(false);
    if (debouncedOnChange) {
      debouncedOnChange(false);
    }
  };

  return (
    <div>
      <StyledChildren
        data-testid={testId}
        ref={targetRef}
        role="button"
        tabIndex={0}
        onFocus={handleEnabled}
        onBlur={handleDisabled}
        onMouseEnter={handleEnabled}
        onMouseLeave={handleDisabled}
      >
        {children}
      </StyledChildren>
      <StyledTooltip ref={elementRef} className={classes} data-testid={tipTestId}>
        {text}
      </StyledTooltip>
    </div>
  );
}

const StyledTooltip = styled.div`
  background: ${colors.gray_d};
  border-radius: 4px;
  color: #fff;
  display: block;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: normal;
  line-height: 18px;
  max-width: 250px;
  opacity: 0;
  padding: 8px 12px;
  position: fixed;
  pointer-events: none;
  transition: opacity 0.5s ease;
  visibility: hidden;
  z-index: 999;

  &.enabled {
    opacity: 1;
    transition: opacity 0.5s ease;
    visibility: visible;
  }
`;

const StyledChildren = styled.span`
  cursor: pointer;

  &:focus {
    outline: 1px dashed ${colors.gray_l};
  }
`;
