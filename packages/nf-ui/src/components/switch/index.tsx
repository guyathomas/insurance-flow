import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import { colors } from '../../theme';
import { Flexbox } from '../flexbox';
import { Text, TextSizes } from '../text';

interface SwitchProps {
  enabled: boolean;
  onClick: (enabled: boolean) => unknown;
}

function IconMiniCheck(): JSX.Element {
  return (
    <svg width="8" height="6" viewBox="0 0 8 6" style={{ display: 'block' }}>
      <path
        d="M2.71 5.83314L0.116844 3.23998C-0.0389481 3.08419 -0.0389481 2.83159 0.116844 2.67578L0.681028
        2.11158C0.83682 1.95577 1.08944 1.95577 1.24523 2.11158L2.9921 3.85844L6.73372 0.116844C6.88951 -0.0389481
        7.14213 -0.0389481 7.29792 0.116844L7.8621 0.681044C8.0179 0.836836 8.0179 1.08944 7.8621 1.24524L3.2742
        5.83316C3.1184 5.98895 2.8658 5.98895 2.71 5.83314V5.83314Z"
        fill={colors.primary}
      />
    </svg>
  );
}

function IconMiniCross(): JSX.Element {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" style={{ display: 'block' }}>
      <path
        d="M7.47094 1.46269L4.93364 3.99999L7.47094 6.53729C7.64302 6.70938 7.64302 6.98764 7.47094 7.15972L7.15973
        7.47093C6.98764 7.64301 6.70938 7.64301 6.5373 7.47093L4 4.93363L1.4627 7.47093C1.29062 7.64301 1.01236 7.64301
        0.840276 7.47093L0.529063 7.15972C0.356981 6.98764 0.356981 6.70938 0.529063 6.53729L3.06636 3.99999L0.529063
        1.46269C0.356981 1.29061 0.356981 1.01235 0.529063 0.840269L0.840276 0.529056C1.01236 0.356973 1.29062 0.356973
        1.4627 0.529056L4 3.06636L6.5373 0.529056C6.70938 0.356973 6.98764 0.356973 7.15973 0.529056L7.47094
        0.840269C7.63936 1.01235 7.63936 1.29061 7.47094 1.46269Z"
        fill={colors.gray_l}
      />
    </svg>
  );
}

export function Switch(props: SwitchProps): JSX.Element {
  const { enabled, onClick } = props;

  function onSpace(e: React.KeyboardEvent): void {
    if (e.key === ' ') {
      e.preventDefault();
      onClick(!enabled);
    }
  }

  return (
    <StyledDiv
      role="checkbox"
      aria-checked={enabled}
      tabIndex={0}
      className={classnames({
        switch: true,
        isEnabled: enabled,
      })}
      onKeyDown={onSpace}
      onClick={(e) => {
        e.stopPropagation();
        onClick(!enabled);
      }}
    >
      <StyledHandle enabled={enabled}>
        <StyledIcon>{enabled ? <IconMiniCheck /> : <IconMiniCross />}</StyledIcon>
      </StyledHandle>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: 20px;
  width: 38px;
  background: ${colors.gray_l};
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: background 100ms linear;

  :focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary_l}50;
  }

  &.isEnabled {
    background-color: ${colors.primary};
  }
`;

const StyledHandle = styled.div<{ enabled: boolean }>`
  height: 14px;
  width: 14px;
  background: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 100ms ease-in-out;
  transform: ${({ enabled }) => (enabled ? 'translateX(17px)' : 'none')};
`;

const StyledIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type SwitchWithLabelProps = SwitchProps & {
  size?: TextSizes;
  label: string;
};

export function SwitchWithLabel(props: SwitchWithLabelProps): JSX.Element {
  const { size = 'small', label, onClick, enabled } = props;

  return (
    <Flexbox alignItems="center">
      <Flexbox marginRight={8}>
        <Text size={size}>{label}</Text>
      </Flexbox>
      <Switch onClick={onClick} enabled={enabled} />
    </Flexbox>
  );
}
