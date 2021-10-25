import * as React from 'react';
import { Padding } from '../../padding';
import { Text } from '../../text';

interface CounterProps {
  length: number;
  maxLength: number;
}

export function Counter(props: CounterProps): JSX.Element {
  const { length, maxLength } = props;

  return (
    <Padding y={8}>
      <Text textAlign="right" size="small">
        {length} / {maxLength}
      </Text>
    </Padding>
  );
}
