import * as React from 'react';

import { Box } from '../box';
import { Flexbox } from '../flexbox';
import { Padding } from '../padding';
import { SpacingValue } from '../../theme';

interface Props {
  children: React.ReactNode;
  showBorder?: boolean;
  padding?: SpacingValue;
}

export function ModalFooter(props: Props): JSX.Element {
  const { children, showBorder = true, padding = 24 } = props;

  return (
    <Box borderTop={showBorder ? 1 : 0}>
      <Padding size={padding}>
        <Flexbox justifyContent="flex-end">{children}</Flexbox>
      </Padding>
    </Box>
  );
}
