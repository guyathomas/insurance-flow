import * as React from 'react';

import { Box } from '../box';

export function ModalBody(props: React.PropsWithChildren<{}>): JSX.Element {
  const { children } = props;
  return (
    <Box borderRadius={6} style={{ background: 'white' }} boxShadow="overlay">
      {children}
    </Box>
  );
}
