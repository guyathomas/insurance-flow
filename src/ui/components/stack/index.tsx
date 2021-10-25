import * as React from 'react';
import styled from 'styled-components';

import { SpacingValue } from '../spacing';
import { AlignItems, JustifyContent, JustifyItems } from '../flexbox';

interface Props {
  direction?: 'vertical' | 'horizontal';
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  gap: SpacingValue;
  children: React.ReactNode;
  width?: string;
  height?: string;
  testId?: string;
  isFluid?: boolean;
  justifyItems?: JustifyItems;
}

interface StyledProps {
  gap: SpacingValue;
  columnCount: number;
  width?: string;
  height?: string;
  isFluid: boolean;
  direction: 'vertical' | 'horizontal';
  alignItems: AlignItems;
  justifyContent: JustifyContent;
  justifyItems?: JustifyItems;
}

export function Stack(props: Props): JSX.Element | null {
  const {
    children,
    gap,
    testId,
    alignItems = 'initial',
    justifyContent = 'initial',
    width = 'auto',
    height = 'auto',
    isFluid = false,
    direction = 'horizontal',
    justifyItems,
  } = props;

  if (!children) return null;

  const columnCount = React.Children.map(children, (item) => item).filter((el) => !!el).length;

  return (
    <StyledStack
      direction={direction}
      gap={gap}
      isFluid={isFluid}
      columnCount={columnCount}
      alignItems={alignItems}
      justifyContent={justifyContent}
      width={width}
      height={height}
      data-testid={testId}
      justifyItems={justifyItems}
    >
      {children}
    </StyledStack>
  );
}

export const StyledStack = styled.div<StyledProps>`
  display: grid;
  ${(props: StyledProps) => {
    const { direction, columnCount, isFluid, gap, alignItems, justifyContent, justifyItems, height, width } = props;
    const childSize = isFluid ? '1fr' : 'max-content';

    if (direction === 'horizontal') {
      return {
        alignItems,
        height,
        justifyContent,
        justifyItems,
        gridAutoFlow: 'column',
        gridColumnGap: `${gap}px`,
        gridTemplateColumns: `repeat(${columnCount}, ${childSize})`,
        width,
      };
    }

    return {
      gridTemplateRows: `repeat(${columnCount}, ${childSize})`,
      gridAutoFlow: 'row',
      gridRowGap: `${gap}px`,
      alignItems,
      justifyContent,
      justifyItems,
      height,
      width,
    };
  }}
`;
