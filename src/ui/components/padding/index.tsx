import * as React from 'react';
import { SpacingValue } from '../../theme';

interface Props {
  size?: SpacingValue;
  top?: SpacingValue;
  bottom?: SpacingValue;
  left?: SpacingValue;
  right?: SpacingValue;
  x?: SpacingValue;
  y?: SpacingValue;
  width?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Padding(props: Props): JSX.Element {
  const { size, x, y, top, left, bottom, right, children, width = 'auto', style = {} } = props;

  const styles: React.CSSProperties = {
    boxSizing: 'border-box',
    paddingTop: top || y || size,
    paddingLeft: left || x || size,
    paddingRight: right || x || size,
    paddingBottom: bottom || y || size,
    width,
    ...style,
  };

  return <div style={styles}>{children}</div>;
}
