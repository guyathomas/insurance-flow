import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { Stack } from '../stack';
import { Text } from '../text';
import { Padding } from '../padding';

interface Props {
  backgroundColor?: string;
}

const colorNames = Object.keys(colors);

function generateSwatch(colorName: string): JSX.Element[] {
  return Object.keys(colors[colorName])
    .reverse()
    .map((colorValue) => {
      const colorValueAsNumber = parseInt(colorValue, 10);
      return (
        <StyledSwatch backgroundColor={colors[colorName][colorValue]} key={`${colorName}-${colorValue}`}>
          <Text color={colorValueAsNumber >= 300 ? 'white' : 'default'} textAlign="center">
            {colorName} [{colorValue}]
          </Text>
        </StyledSwatch>
      );
    });
}

function generateSwatches(): JSX.Element[] {
  return colorNames.map((colorName) => (
    <Stack gap={16} direction="vertical">
      {generateSwatch(colorName)}
    </Stack>
  ));
}

export function ColorSwatches(): JSX.Element {
  return (
    <Padding size={24}>
      <Stack gap={24}>{generateSwatches()}</Stack>
    </Padding>
  );
}

const StyledSwatch = styled.div`
  padding: 16px;
  min-width: 100px;
  background-color: ${({ backgroundColor }: Props) => backgroundColor || 'white'};
  border-radius: 6px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.03);
`;
