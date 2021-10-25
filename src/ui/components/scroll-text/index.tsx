import { colors } from '../../theme';
import React from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { Text } from '../text';
import { Stack } from '../stack';
import { Padding } from '../padding';

interface Props {
  text?: string | null;
  label?: string;
  onClick?: () => unknown;
  testId?: string;
  maxHeight?: number;
  unstyled?: boolean;
}

export function ScrollText({ text, label, onClick, testId, maxHeight, unstyled = false }: Props): JSX.Element {
  return (
    <StyledScrollText onClick={onClick} data-testid={testId} unstyled={unstyled}>
      <Padding left={24} right={8}>
        <Stack direction="vertical" gap={4}>
          {label && (
            <Text>
              <StyledLabel>{label}</StyledLabel>
            </Text>
          )}
          <Text>
            <StyledCopyContainer>
              <StyledCopy maxHeight={maxHeight}>
                <Padding bottom={24} right={24}>
                  <Markdown>{text}</Markdown>
                </Padding>
              </StyledCopy>
            </StyledCopyContainer>
          </Text>
        </Stack>
      </Padding>
    </StyledScrollText>
  );
}

const defaultStyles = `
  background: rgba(251, 251, 251, 0.73);
  border: 1px solid ${colors.gray_xl};
  border-radius: 3px;
  padding-top: 24px;
`;

// Display default styles or none at all
const StyledScrollText = styled.div<{ unstyled?: boolean }>`
  ${({ unstyled }) => (!unstyled ? defaultStyles : '')};
`;

const StyledLabel = styled.div`
  color: ${colors.gray_l};
`;

const StyledCopyContainer = styled.div`
  position: relative;

  &:after {
    background: linear-gradient(to top, transparent, rgba(251, 251, 251, 0.73));
    content: '';
    height: 10px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const StyledCopy = styled.div<{ maxHeight?: number }>`
  color: ${colors.gray};
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : '350px')};
  overflow: scroll;

  p {
    margin: 0 0 12px 0;
  }

  a {
    word-break: break-all;
  }
`;
