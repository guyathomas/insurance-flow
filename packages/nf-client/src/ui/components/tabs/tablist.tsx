import React from 'react';
import { Padding } from '../padding';
import styled from 'styled-components';
import { Stack } from '../stack';
import { Tab } from './hook';
import { Tab as TabItem } from './tab';
import { SpacingValue } from '../../theme';

interface Props {
  border?: boolean;
  disableOtherTabs?: boolean;
  fluid?: boolean;
  onChange: (index: number) => void;
  tabs: Tab[];
  variant?: string;
  width?: string | number;
  paddingStart?: SpacingValue;
}

interface StyledProps {
  variant?: string;
  border?: boolean;
}

export function TabList(props: Props): JSX.Element {
  const { tabs, paddingStart, width, fluid = false, onChange, disableOtherTabs, variant, border = false } = props;

  const activeIndex = tabs.findIndex((tab) => tab.isActive);

  return (
    <StyledNav style={{ width }} variant={variant} border={border} data-testid="root">
      <Padding left={paddingStart || 0}>
        <Stack
          gap={variant ? 4 : 24}
          direction="horizontal"
          alignItems="center"
          justifyContent="flex-start"
          isFluid={fluid}
        >
          {tabs.map((tab, index) => {
            const isDisabled = disableOtherTabs && index > activeIndex;
            return (
              <TabItem
                variant={variant}
                id={tab.id}
                panelId={tab.panelId}
                key={tab.id}
                onClick={() => onChange(index)}
                isActive={tab.isActive}
                isDisabled={isDisabled}
              >
                {tab.label}
              </TabItem>
            );
          })}
        </Stack>
      </Padding>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  position: relative;
  &:after {
    content: '';
    background-color: ${({ border, variant }: StyledProps) => (variant || border ? '#dbdbdb' : 'transparent')};
    bottom: ${({ variant }: StyledProps) => (variant ? '0px' : '-2px')};
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 0;
  }
`;
