/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Stack } from '../stack';
import { colors } from '../../theme/colors';
import { fontFamilies } from '../../theme';
import { Padding } from '../padding';
import { Text } from '../text';

export interface GroupItem {
  group: {
    label: string;
    items: MenuItem[];
  };
}

export interface DividerItem {
  divider: boolean;
}

export interface MenuItem {
  label: string;
  href?: string;
  target?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: (isSelected: boolean) => void;
}

interface Props {
  items: (MenuItem | GroupItem | DividerItem)[];
}

export function Menu(props: Props): JSX.Element {
  const { items } = props;

  function renderMenuItem(item: MenuItem): JSX.Element {
    const { label, isSelected, href, target, isDisabled, onClick } = item;

    return (
      <StyledMenuItem
        className={classnames({ isDisabled, isSelected })}
        key={label}
        onClick={(event) => {
          if (!isDisabled && onClick) {
            onClick(!isSelected);
          }
          event.stopPropagation();
        }}
        role="menuitem"
        href={!isDisabled && href}
        target={target}
      >
        <Padding x={16}>{label}</Padding>
      </StyledMenuItem>
    );
  }

  function renderDividerItem(): JSX.Element {
    return <StyledDivider key="divider" />;
  }

  function renderGroupItem(item: GroupItem): JSX.Element {
    const {
      group: { label, items: childItems },
    } = item;
    return (
      <div key={`${label} items`}>
        <Padding x={16} bottom={8}>
          <Text color="light">{label}</Text>
        </Padding>
        {childItems.map(renderMenuItem)}
      </div>
    );
  }

  function isGroupItem(object: any): object is GroupItem {
    return 'group' in object;
  }

  function isDividerItem(object: any): object is DividerItem {
    return 'divider' in object && object.divider === true;
  }

  const menuItems = items.map((item) => {
    if (isGroupItem(item)) {
      return renderGroupItem(item);
    }
    if (isDividerItem(item)) {
      return renderDividerItem();
    }
    return renderMenuItem(item);
  });

  return (
    <div>
      <Stack gap={2} direction="vertical">
        {menuItems}
      </Stack>
    </div>
  );
}

const StyledMenuItem = styled.a`
  color: ${colors.steel[500]};
  cursor: pointer;
  &.isSelected {
    color: ${colors.brand[400]};
  }
  &.isDisabled {
    color: ${colors.steel[200]};
    cursor: not-allowed;
  }
  display: block;
  font-family: ${fontFamilies.body};
  font-size: 13px;
  line-height: 27px;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  &:not(.isDisabled):hover {
    color: ${colors.brand[400]};
    background: ${colors.brand[100]};
    text-decoration: none;
  }
`;

const StyledDivider = styled.div`
  background-color: ${colors.steel[200]};
  height: 1px;
  width: 100%;
`;
