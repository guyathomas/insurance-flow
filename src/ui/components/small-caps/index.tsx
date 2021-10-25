import * as React from 'react';
import { Text } from '../text';

interface Props {
  children: React.ReactNode;
  color?: string;
}

export function SmallCaps(props: Props): JSX.Element {
  const { children, color } = props;

  return (
    <Text
      style={{ letterSpacing: '1px', textTransform: 'uppercase', fontSize: '11px', lineHeight: '17px' }}
      color={color}
      weight={600}
    >
      {children}
    </Text>
  );
}
