import React from 'react';
import styled from 'styled-components';

import { fontFamilies, colors } from '../../../theme';

function Caret(): JSX.Element {
  return (
    <svg width="9" height="13" viewBox="0 0 9 13">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8.1875H8.25L4.125 13L0 8.1875Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 4.8125H8.25L4.125 0L0 4.8125Z" fill="currentColor" />
    </svg>
  );
}

interface Props {
  children: React.ReactNode;
  minWidth: string;
  value: string;
  onChange: (value: string) => unknown;
}

export default function Select(props: Props): JSX.Element {
  const { children, minWidth, value, onChange } = props;

  return (
    <StyledDiv style={{ minWidth }}>
      <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </StyledSelect>
      <div className="Select-icon">
        <Caret />
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  position: relative;

  .Select-icon {
    color: ${colors.gray};
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  font-family: ${fontFamilies.body};
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #000;
  padding: 0 17px 0 4px;
  height: 24px;
  box-sizing: border-box;
  width: 100%;
  display: block;
  border-radius: 3px;
  background: white;
  -webkit-appearance: none;
  border: 1px solid transparent;

  :hover {
    box-shadow: 0 0 0 1px #dbdbdb;
    cursor: pointer;
  }

  :focus + .Select-icon {
    color: ${colors.primary};
  }

  :focus {
    outline: none;
  }

  :focus,
  :active {
    box-shadow: 0 0 0 3px ${colors.primary_l}30, 0 0 0 1px ${colors.primary};
    outline: none;
    background-color: white;
  }
`;
