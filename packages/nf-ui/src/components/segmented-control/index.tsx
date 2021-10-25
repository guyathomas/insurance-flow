import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import { colors } from '../../theme';
import { Text } from '../text';
import { Flexbox } from '../flexbox';

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value?: string;
  onChange: (value: string) => unknown;
  fluid?: boolean;
}

export function SegmentedControl(props: Props): JSX.Element {
  const { options, value, onChange, fluid = false } = props;

  const containerClassName = classnames({
    fluid,
  });

  const items = options.map((option) => {
    const isActive = value === option.value;
    const className = classnames({
      isActive,
      fluid,
    });
    return (
      <StyledOption
        key={option.value}
        data-testid={`segmentedcontrol:option:${option.value}`}
        className={className}
        onClick={() => onChange(option.value)}
        role="checkbox"
        aria-checked={isActive}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            onChange(option.value);
          }
        }}
      >
        <Text color={isActive ? 'active' : 'dark'} weight={600}>
          {option.label}
        </Text>
      </StyledOption>
    );
  });

  return (
    <StyledDiv className={containerClassName}>
      <Flexbox flexWrap="wrap">{items}</Flexbox>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  display: inline-block;
  height: 40px;
  box-sizing: border-box;
  width: max-content;

  &.fluid {
    width: 100%;
  }
`;

const StyledOption = styled.div`
  padding: 8px 16px 9px;
  border-right: 1px solid #dbdbdb;
  cursor: pointer;
  text-align: center;

  :last-child {
    border-right: none;
  }

  &.fluid {
    flex: 1;
  }

  &.isActive {
    background-color: ${colors.primary_xxxl};
  }
`;
