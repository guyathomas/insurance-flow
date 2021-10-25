import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../text';
import { Flexbox } from '../flexbox';
import { Padding } from '../padding';
import { colors, SpacingValue } from '../../theme';
import { Stack } from '../stack';

interface Props {
  href: string;
  name: string;
  fileExtension: string;
  category?: string;
}

export function AttachmentPill(props: Props): JSX.Element {
  const { href, name, fileExtension, category } = props;

  return (
    <StyledPill href={href} target="_blank">
      <Flexbox alignItems="flex-start">
        <Padding right={4}>
          <StyledExtension>{fileExtension}</StyledExtension>
        </Padding>
        <Stack direction="vertical" gap={0}>
          <Text size="small">{name}</Text>
          {category && (
            <Text size="small" weight={300} color="disabled">
              {category}
            </Text>
          )}
        </Stack>
      </Flexbox>
    </StyledPill>
  );
}

interface PillListProps {
  pills: Props[];
  gap?: SpacingValue;
}

export const PillList = ({ pills, gap }: PillListProps): JSX.Element => {
  return (
    <Flexbox alignItems="flex-start" justifyContent="flex-start">
      {pills.map((props: Props) => (
        <StyledPillWrapper gap={gap} key={props.name}>
          <AttachmentPill
            key={props.name}
            href={props.href}
            name={props.name}
            fileExtension={props.fileExtension}
            category={props.category}
          />
        </StyledPillWrapper>
      ))}
    </Flexbox>
  );
};

const StyledPill = styled.a`
  border: 1px solid ${colors.gray_xl};
  border-radius: 3px;
  padding: 2px 8px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    text-decoration: none;
    cursor: pointer;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary_l}30;
  }
`;

const StyledExtension = styled.div`
  background-color: ${colors.pink};
  border-radius: 2px;
  color: #fff;
  font-family: 'Open Sans', sans-serif;
  font-size: 9px;
  font-weight: 600;
  padding: 2px;
  text-transform: uppercase;
  margin: 1px 0;
`;

const StyledPillWrapper = styled.div`
  padding-left: ${({ gap }: { gap?: number }) => `${gap}px` || '4px'};
  &:first-child {
    padding-left: 0;
  }
`;
