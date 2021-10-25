import React from 'react';
import styled from 'styled-components';
import { Padding } from '../padding';
import { colors } from '../../theme';
import { Flexbox } from '../flexbox';
import { Text } from '../text';

interface StatProps {
  label: string;
  children: JSX.Element;
}

interface StatItemProps {
  label: string;
  children: JSX.Element;
}

interface StatListProps {
  children: React.ReactElement<StatProps>[] | React.ReactElement<StatProps>;
}

export function StatItem(props: StatItemProps): JSX.Element {
  const { label, children } = props;

  return (
    <>
      <Padding bottom={4}>
        <Text color="light" size="small">
          {label}
        </Text>
      </Padding>
      <StyledValue>{children}</StyledValue>
    </>
  );
}

export function Stat(props: StatProps): JSX.Element {
  const { children, label } = props;

  return (
    <StyledBox>
      <Padding y={4} right={8}>
        <StatItem label={label}>{children}</StatItem>
      </Padding>
    </StyledBox>
  );
}

export function StatList(props: StatListProps): JSX.Element {
  const { children } = props;
  return (
    <Flexbox alignItems="flex-start" flexDirection="row">
      {children}
    </Flexbox>
  );
}

const StyledValue = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

const StyledBox = styled.div`
  border-left: 1px solid ${colors.gray_xl};
  padding: 0 8px 0 8px;
  height: 48px;

  > div {
    padding-left: 8px;
  }

  &:first-child {
    border: none;
    padding-left: 0;

    > div {
      padding-left: 0px;
    }
  }
`;
