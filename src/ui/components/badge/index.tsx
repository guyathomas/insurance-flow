import React from 'react';
import { colors } from '../../theme';
import { colors as newColors } from '../../theme/colors';
import { Text } from '../text';
import { SmallCaps } from '../small-caps';
import { Padding } from '../padding';
import styled from 'styled-components';

export type BadgeType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'info-outline'
  | 'dark';

interface Props {
  type?: BadgeType;
  size?: 'small' | 'regular';
  textType?: 'regular' | 'small-caps';
  children: React.ReactNode;
  width?: number;
  elementRef?: React.RefObject<HTMLDivElement>;
}

export function Badge(props: Props): JSX.Element {
  const { children, size = 'small', textType = 'regular', type = 'secondary', width, elementRef } = props;

  return (
    <StyledBadge className={size} data-type={type} width={width} ref={elementRef}>
      {textType === 'small-caps' ? (
        <Padding x={4} y={2}>
          <SmallCaps color="inherit">{children}</SmallCaps>
        </Padding>
      ) : (
        <Text size={size} weight={600} color="inherit" nowrap>
          {children}
        </Text>
      )}
    </StyledBadge>
  );
}

const StyledBadge = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  display: inline-block;
  border-radius: 3px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: center;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};

  &.regular {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  &[data-type='primary'] {
    background-color: ${colors.primary};
    color: white;
  }
  &[data-type='secondary'] {
    background-color: ${colors.gray_xxl};
    color: ${colors.gray};
  }
  &[data-type='tertiary'] {
    border: 1px solid rgba(255, 122, 122, 0.3);
    background-color: transparent;
    color: ${newColors.fire[500]};
  }
  &[data-type='success'] {
    background-color: ${newColors.grass[200]};
    color: ${newColors.grass[500]};
  }
  &[data-type='danger'] {
    background-color: ${colors.red_xl};
    color: ${colors.red_d};
  }
  &[data-type='info'] {
    background-color: ${colors.primary_xl};
    color: ${colors.primary_d};
  }
  &[data-type='info-outline'] {
    border: 1px solid ${newColors.brand[200]};
    background-color: ${newColors.brand[100]};
    color: ${newColors.brand[400]};
  }
  &[data-type='dark'] {
    background-color: ${colors.primary_xxd};
    color: white;
  }
  &[data-type='warning'] {
    background-color: ${newColors.fire[200]};
    color: ${newColors.fire[500]};
  }
`;
