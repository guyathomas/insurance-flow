import * as React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  percentage: number;
  size?: number;
  color?: string;
}

export function PieChart({ percentage, size = 32, color = '#FF7A7A' }: Props): JSX.Element {
  return (
    <StyledPie width={size} height={size} viewBox="0 0 48 48" color={color}>
      <defs>
        <clipPath id="clip-pie-from-border">
          <circle r="16" cx="24" cy="24" width="100" height="100" />
        </clipPath>
      </defs>

      <circle
        className="circular-border"
        r="21"
        cx="24"
        cy="24"
        fill="none"
        style={{
          strokeWidth: '4',
          stroke: `${color}`,
        }}
      />

      <circle
        className="pie"
        clipPath="url(#clip-pie-from-border)"
        r="16"
        cx="24"
        cy="24"
        fill="none"
        style={{
          strokeWidth: '32',
          stroke: `${color}`,
          strokeDasharray: `${percentage}, 100`,
        }}
      />
    </StyledPie>
  );
}

const fillup = keyframes`
  from { stroke-dasharray: 0 100; }
`;

const StyledPie = styled.svg`
  background: transparent;
  transform: rotate(-90deg);

  .pie {
    animation: ${fillup} 1s ease-out forwards;
  }
`;
