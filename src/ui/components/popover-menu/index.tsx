import React, { useState } from 'react';
import { useTether, TetherOptions } from '../../hooks/tether';
import { IconButton, IconType } from '../icon-button';
import { useKeyEvent } from '../../hooks/key-event';
import { Popover } from '../popover';
import { Box } from '../box';
import { Padding } from '../padding';

export type TogglePopover = React.Dispatch<React.SetStateAction<boolean>>;

interface Props {
  options: TetherOptions;
  type: IconType;
  children: (toggle: TogglePopover) => React.ReactNode;
}

export function PopoverMenu(props: Props): JSX.Element {
  const { options, children, type } = props;
  const [visible, setVisible] = useState(false);

  const { targetRef, elementRef } = useTether(options);

  useKeyEvent(
    'Tab',
    () => {
      setVisible(false);
    },
    [],
  );

  return (
    <>
      <IconButton
        type={type}
        onClick={(event) => {
          setVisible(true);
          event.stopPropagation();
        }}
        innerRef={targetRef}
      />
      <Popover isOpen={visible} onToggle={setVisible} innerRef={elementRef}>
        <Box style={{ background: 'white' }} border={1} borderRadius={3} boxShadow="overlay">
          <Padding top={8} bottom={8}>
            {children(setVisible)}
          </Padding>
        </Box>
      </Popover>
    </>
  );
}
