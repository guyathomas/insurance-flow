import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';
import { Card } from '../card';
import { Flexbox } from '../flexbox';
import { SpreadsheetIcon } from '../icons';
import { Padding } from '../padding';
import { Text } from '../text';

type TemplateIcon = 'spreadsheet';

interface Props {
  header: string;
  icon?: TemplateIcon;
  url: string;
  urlText: string;
}

const StyledAnchor = styled.a`
  display: block;
  text-decoration: none !important;
`;

const ICONS_MAP: { [k in TemplateIcon]: (object) => JSX.Element } = {
  spreadsheet: SpreadsheetIcon,
};

export function TemplateDownloadLink({ header, icon = 'spreadsheet', url, urlText }: Props): JSX.Element {
  const Icon = ICONS_MAP[icon];
  return (
    <StyledAnchor href={url} target="_blank" rel="noopener noreferrer">
      <Card>
        <Padding size={16}>
          <Flexbox alignItems="center">
            <Icon />
            <Flexbox flexDirection="column" marginLeft={16}>
              <Text>{header}</Text>
              <Text color={colors.primary} size="small">
                {urlText}
              </Text>
            </Flexbox>
          </Flexbox>
        </Padding>
      </Card>
    </StyledAnchor>
  );
}
