import * as React from 'react';

import { Box } from '../box';
import { Flexbox } from '../flexbox';
import { IconButton } from '../icon-button';
import { Padding } from '../padding';
import { Title } from '../title';

interface Props {
  onClose: () => unknown;
  titleText: string;
  showBorder?: boolean;
}

export function ModalHeader(props: Props): JSX.Element {
  const { onClose, titleText, showBorder = true } = props;

  return (
    <Box borderBottom={showBorder ? 1 : 0}>
      <Padding size={24}>
        <Flexbox justifyContent="space-between">
          <Title size={17}>{titleText}</Title>
          {onClose ? <IconButton type="close" onClick={onClose} /> : null}
        </Flexbox>
      </Padding>
    </Box>
  );
}
