import React from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { paramCase } from 'change-case';
import { colors } from '../../theme';
import { Text, TextSizes } from '../text';
import { TextLink } from '../text-link';
import { Stack } from '../stack';
import { Flexbox } from '../flexbox';
import { Padding } from '../padding';
import { Tooltip } from '../tooltip';
import { MiniIconQuestionMark } from '../mini-icons';

function formatCurrency(amount: string | number): JSX.Element {
  return (
    <NumberFormat decimalScale={2} displayType="text" fixedDecimalScale prefix="$" thousandSeparator value={amount} />
  );
}

interface ItemProps {
  value: string | number;
  valueTextSize?: TextSizes;
  valueType?: 'default' | 'currency' | 'href';
  valueHref?: string;
}

function Item({ value, valueTextSize, valueType, valueHref }: ItemProps): JSX.Element {
  if (valueHref) {
    return (
      <TextLink variant="secondary" href={valueHref}>
        <Text size={valueTextSize || 'extraLarge'} weight={300} color="dark">
          {valueType === 'currency' ? formatCurrency(value) : value}
        </Text>
      </TextLink>
    );
  }
  return (
    <Text size={valueTextSize || 'extraLarge'} weight={300} color="dark">
      {valueType === 'currency' ? formatCurrency(value) : value}
    </Text>
  );
}

interface Props {
  label: string;
  valueTextSize?: TextSizes;
  value?: string | number | null;
  valueType?: 'default' | 'currency' | 'href';
  valueHref?: string;
  items?: string[];
  url?: string | null;
  urlText?: string;
  urlExternal?: boolean;
  tooltip?: string;
  onUrlClick?(): unknown;
  testId?: string;
}

export function StackedLineItem({
  label,
  value,
  valueType = 'default',
  valueHref,
  valueTextSize,
  onUrlClick,
  items,
  url,
  urlText,
  urlExternal,
  tooltip,
  testId,
}: Props): JSX.Element {
  const isEmpty = !value && !items && !url;

  const stackTestId = testId ? `${paramCase(label)}-${testId}` : paramCase(label);

  return (
    <Stack testId={stackTestId} direction="vertical" gap={2}>
      <Flexbox alignItems="center">
        <Text size="small">
          <StyledGray>{label}</StyledGray>
        </Text>
        {tooltip && (
          <Padding left={4}>
            <Tooltip text={tooltip}>
              <MiniIconQuestionMark />
            </Tooltip>
          </Padding>
        )}
      </Flexbox>
      {value && <Item value={value} valueType={valueType} valueHref={valueHref} valueTextSize={valueTextSize} />}

      {items && (
        <Stack direction="vertical" gap={2} key={items.length}>
          {items
            .filter((el) => !!el)
            .map((val) => (
              <Text key={val} weight={300} color="dark">
                {val}
              </Text>
            ))}
        </Stack>
      )}

      {url && (
        <Text weight={300}>
          <TextLink
            target={urlExternal ? '_blank' : undefined}
            href={url}
            onClick={(e) => {
              if (onUrlClick) {
                e.preventDefault();
                onUrlClick();
              }
            }}
          >
            {urlText || url}
          </TextLink>
        </Text>
      )}

      {isEmpty && (
        <Text weight={300}>
          <StyledGray data-testid="empty">{'\u2013'}</StyledGray>
        </Text>
      )}
    </Stack>
  );
}

const StyledGray = styled.div`
  color: ${colors.gray};
`;
