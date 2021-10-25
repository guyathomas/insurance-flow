import { Text } from '../text';
import { TextLink } from '../text-link';

import { format } from 'date-fns';
import React from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import DefinitionListIcon from './definition-list-icons';

export type DefinitionListType =
  | 'name'
  | 'business'
  | 'document'
  | 'date'
  | 'currency'
  | 'dateRange'
  | 'note'
  | 'number';

export type DefinitionListItem =
  | {
      type: Exclude<DefinitionListType, 'currency'>;
      title?: string;
      value: string;
      subValue?: string;
      href?: string;
      onClick?: (e: React.MouseEvent) => unknown;
      target?: '_blank';
    }
  | {
      type: Extract<DefinitionListType, 'currency'>;
      title?: string;
      value: number;
      subValue?: string;
      href?: string;
      onClick?: (e: React.MouseEvent) => unknown;
      target?: '_blank';
    };

interface Props {
  items: DefinitionListItem[];
  hideTitle?: boolean;
}

export function DefinitionList(props: Props): JSX.Element {
  const { items, hideTitle } = props;

  function formatValue(type: DefinitionListType, value: string | number, href?: string): JSX.Element {
    let formattedValue;
    switch (type) {
      case 'date':
        formattedValue = format(value as number, 'YYYY/MM/DD');
        break;
      case 'currency':
        formattedValue = (
          <NumberFormat
            decimalScale={2}
            displayType="text"
            fixedDecimalScale
            prefix="$"
            thousandSeparator
            value={value}
          />
        );
        break;
      default:
        formattedValue = value;
        break;
    }

    return href ? (
      <TextLink variant="secondary" target="_blank" href={href} nowrap={false}>
        {formattedValue}
      </TextLink>
    ) : (
      <Text color="dark">{formattedValue}</Text>
    );
  }

  function formatRow(item: DefinitionListItem, hide?: boolean): JSX.Element {
    const { type, title, value, subValue, href, onClick, target } = item;

    if (hide) {
      return (
        <tr key={title || value}>
          <StyledFlexColumn subValue={subValue}>
            <StyledIconTextWrapper>
              <StyledIconWrapper>
                <DefinitionListIcon type={type} />
              </StyledIconWrapper>
              <div>
                {onClick ? (
                  <StyledTrigger onClick={onClick} target={target}>
                    {formatValue(type, value, href)}
                  </StyledTrigger>
                ) : (
                  formatValue(type, value, href)
                )}
              </div>
              {subValue && <Text color="dark">{subValue}</Text>}
            </StyledIconTextWrapper>
          </StyledFlexColumn>
        </tr>
      );
    }
    return (
      <tr key={title || value}>
        <StyledStaticColumn subValue={subValue}>
          <StyledIconTextWrapper>
            <StyledIconWrapper>
              <DefinitionListIcon type={type} />
            </StyledIconWrapper>
            {title && (
              <Text truncate nowrap>
                {title}
              </Text>
            )}
          </StyledIconTextWrapper>
        </StyledStaticColumn>
        <StyledFlexColumn>
          {onClick ? (
            <StyledTrigger onClick={onClick} target={target}>
              {formatValue(type, value, href)}
            </StyledTrigger>
          ) : (
            formatValue(type, value, href)
          )}
          {subValue && <Text color="dark">{subValue}</Text>}
        </StyledFlexColumn>
      </tr>
    );
  }

  const listItems = items.map((item) => {
    return formatRow(item, hideTitle);
  });

  return (
    <StyledSpacedTable>
      <tbody>{listItems}</tbody>
    </StyledSpacedTable>
  );
}

const StyledIconWrapper = styled.div`
  margin-right: 10px;
  margin-top: 3px;
`;

const StyledStaticColumn = styled.td<{ subValue?: string }>`
  width: auto;
  text-align: left;
  vertical-align: ${({ subValue }) => (subValue !== undefined ? 'top' : 'middle')};
  padding: 4px 0;
`;

const StyledFlexColumn = styled.td<{ subValue?: string }>`
  text-align: left;
  vertical-align: ${({ subValue }) => (subValue !== undefined ? 'top' : 'middle')};
  width: 100%;
  padding: 4px 0;
`;

const StyledSpacedTable = styled.table`
  border-spacing: 0;
`;

const StyledIconTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 16px;
`;

const StyledTrigger = styled.a`
  outline: none;
`;
