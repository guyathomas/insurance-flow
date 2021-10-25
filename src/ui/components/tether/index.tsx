import React, { useState, useEffect } from 'react';
import { useRect } from '@reach/rect';
import { isNumber } from 'lodash';

interface Props {
  children: React.ReactNode;
  targetRef: React.RefObject<HTMLElement>;
  testId?: string;
  targetAnchor?: PopoverAnchor;
  yOffset?: string | number;
  xOffset?: string | number;
  anchor?: PopoverAnchor;
  width?: number;
}

export type Rect = ReturnType<typeof useRect>;
type CSSValue = string | number;
type PopoverAnchor =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'right'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'left'
  | 'center';

function cssValueToString(val: CSSValue): string {
  if (isNumber(val)) {
    return `${val}px`;
  }
  return String(val);
}

function getPopoverTransform(anchor: PopoverAnchor): string {
  if (anchor === 'top') {
    return 'translate(-50%, 0%)';
  }
  if (anchor === 'topRight') {
    return 'translate(-100%, 0%)';
  }
  if (anchor === 'right') {
    return 'translate(-100%, -50%)';
  }
  if (anchor === 'bottomRight') {
    return 'translate(-100%, -100%)';
  }
  if (anchor === 'bottom') {
    return 'translate(-50%, -100%)';
  }
  if (anchor === 'bottomLeft') {
    return 'translate(0%, -100%)';
  }
  if (anchor === 'left') {
    return 'translate(0%, -50%)';
  }
  if (anchor === 'center') {
    return 'translate(-50%, -50%)';
  }
  // Top left by default
  return 'translate(0%, 0%)';
}

function calc(value: number, offset: CSSValue): string {
  return `calc(${value}px + ${cssValueToString(offset)})`;
}

function calculatePositionStyles({
  targetRect,
  targetAnchor = 'bottomLeft',
  anchor = 'topLeft',
  xOffset = 0,
  yOffset = 0,
  width = 'auto',
}: {
  targetRect: Rect;
  targetAnchor?: PopoverAnchor;
  xOffset?: CSSValue;
  yOffset?: CSSValue;
  anchor?: PopoverAnchor;
  width?: CSSValue;
}): React.CSSProperties {
  const transform = getPopoverTransform(anchor);

  const sharedProperties: React.CSSProperties = {
    position: 'absolute',
    transform,
    width: width || 'auto',
    zIndex: 1000,
  };

  if (targetAnchor === 'topLeft') {
    return {
      top: calc(targetRect.top, yOffset),
      left: calc(targetRect.left, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'top') {
    return {
      top: calc(targetRect.top, yOffset),
      left: calc(targetRect.left + targetRect.width / 2, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'topRight') {
    return {
      top: calc(targetRect.top, yOffset),
      left: calc(targetRect.right, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'right') {
    return {
      top: calc(targetRect.top + targetRect.height / 2, yOffset),
      left: calc(targetRect.right, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'bottomRight') {
    return {
      top: calc(targetRect.bottom, yOffset),
      left: calc(targetRect.right, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'bottom') {
    return {
      top: calc(targetRect.bottom, yOffset),
      left: calc(targetRect.left + targetRect.width / 2, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'bottomLeft') {
    return {
      top: calc(targetRect.bottom, yOffset),
      left: calc(targetRect.left, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'left') {
    return {
      top: calc(targetRect.top + targetRect.height / 2, yOffset),
      left: calc(targetRect.left, xOffset),
      ...sharedProperties,
    };
  }

  if (targetAnchor === 'center') {
    return {
      top: calc(targetRect.top + targetRect.height / 2, yOffset),
      left: calc(targetRect.left + targetRect.width / 2, xOffset),
      ...sharedProperties,
    };
  }

  throw new Error('Invalid anchor');
}

interface TetherOptions {
  targetAnchor?: PopoverAnchor;
  yOffset?: string | number;
  xOffset?: string | number;
  anchor?: PopoverAnchor;
  width?: number;
}

/**
 * Accepts an element ref and will return styles that you can place on any other element to position it near the target.
 * @param targetRef HTMLElement React ref
 * @param options
 */
export function useTetherStyles(targetRef: React.RefObject<HTMLElement>, options: TetherOptions): React.CSSProperties {
  const { anchor, xOffset, targetAnchor, yOffset, width } = options;
  const targetRect = useRect(targetRef);
  const [styles, setStyles] = useState<React.CSSProperties>({});

  // Position to targetRef relative to the container
  // It should listen for scroll changes, element size changes, window size changes
  useEffect(() => {
    if (!targetRect) {
      return;
    }
    setStyles(calculatePositionStyles({ targetRect, targetAnchor, xOffset, yOffset, anchor, width }));
  }, [targetRect, targetAnchor, xOffset, yOffset, anchor, width]);

  return styles;
}

export function Tether(props: Props): JSX.Element {
  const {
    children,
    targetRef,
    testId,
    targetAnchor = 'bottomLeft',
    yOffset = 0,
    xOffset = 0,
    anchor = 'topLeft',
    width,
  } = props;

  const styles = useTetherStyles(targetRef, {
    targetAnchor,
    yOffset,
    xOffset,
    anchor,
    width,
  });

  return (
    <div style={styles} data-testid={testId}>
      {children}
    </div>
  );
}
