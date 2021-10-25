/* eslint max-len: 0 */
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../theme';
import { Padding } from '../padding';
import { Text } from '../text';
import { Flexbox } from '../flexbox';
import { Spinner } from '../spinner';

interface Props {
  label: string;
  onClick?: () => unknown;
  isLoading?: boolean;
  disabled?: boolean;
}

function IconPlus(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path
        d="M10.6565 4.875H7.28149V1.5C7.28149 1.08586 6.94563 0.75 6.53149 0.75H5.78149C5.36735 0.75 5.03149 1.08586 5.03149 1.5V4.875H1.65649C1.24235 4.875 0.906494 5.21086 0.906494 5.625V6.375C0.906494 6.78914 1.24235 7.125 1.65649 7.125H5.03149V10.5C5.03149 10.9141 5.36735 11.25 5.78149 11.25H6.53149C6.94563 11.25 7.28149 10.9141 7.28149 10.5V7.125H10.6565C11.0706 7.125 11.4065 6.78914 11.4065 6.375V5.625C11.4065 5.21086 11.0706 4.875 10.6565 4.875Z"
        fill={colors.primary}
      />
    </svg>
  );
}

export function Dropzone(props: Props): JSX.Element {
  const { label, onClick, isLoading, disabled = false } = props;

  function onKeyDown(e: React.KeyboardEvent): void {
    if (e.key === ' ' && onClick) {
      onClick();
    }
  }

  return (
    <StyledDiv
      className="dropzone"
      onKeyDown={onKeyDown}
      onClick={onClick}
      role="button"
      tabIndex={0}
      disabled={disabled}
    >
      <Padding size={16} width="100%">
        <Flexbox
          alignItems="center"
          justifyContent="center"
          style={{
            position: 'relative',
            minHeight: 23,
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Padding right={8}>
                <IconPlus />
              </Padding>
              <Text textAlign="center" color="active" weight={600}>
                {label}
              </Text>
            </>
          )}
        </Flexbox>
      </Padding>
    </StyledDiv>
  );
}

const StyledDiv = styled.div<{ disabled: boolean }>`
  cursor: pointer;
  border: 1px dashed #dbdbdb;
  display: flex;
  border-radius: 6px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};

  :hover,
  :focus {
    background-color: ${colors.primary_xxxl};
    border-color: ${colors.primary};
    outline: none;
  }
`;
