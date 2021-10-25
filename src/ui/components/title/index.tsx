import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { colors } from '../../theme/colors';

export type TitleSizes = 32 | 24 | 17;
type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
  size?: TitleSizes;
  children: React.ReactNode;
  marginBottom?: number;
  marginTop?: number;
  style?: React.CSSProperties;
  weight?: number;
  as?: HeadingSize;
}

export function Title(props: Props): JSX.Element {
  const { as = 'h1', size = 32, children, marginBottom = 0, marginTop = 0, style = {}, weight = 600 } = props;

  const className = classnames({
    title: true,
    h1: size === 32,
    h2: size === 24,
    h3: size === 17,
  });

  return (
    <StyledTitle
      as={as}
      className={className}
      style={{
        ...style,
        marginBottom,
        marginTop,
        fontWeight: weight,
      }}
    >
      {children}
    </StyledTitle>
  );
}

const StyledTitle = styled.div`
  font-family: 'PublicoText-Bold';
  -webkit-font-smoothing: antialiased; /* adds cleaner font aliasing */
  color: ${colors.steel[500]};
  &.h1 {
    font-family: 'PublicoText-Bold';
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.02em;
  }
  &.h2 {
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: -0.02em;
  }
  &.h3 {
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;
    line-height: 21px;
  }
`;
