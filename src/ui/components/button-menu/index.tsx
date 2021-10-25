import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Box } from '../box';
import { Tether } from '../tether';
import { Portal } from '../../hooks/portal';
import { PopoverAnimation } from '../popover-animation';
import { Padding } from '../padding';
import { Menu, MenuItem } from '../menu';
import { usePopover } from '../../hooks/popover';
import { Flexbox } from '../flexbox';
import { Caret } from '../icons';
import { Spacing } from '../spacing';
import { colors } from '../../theme/colors';

export type TogglePopover = React.Dispatch<React.SetStateAction<boolean>>;

interface Props {
  items: MenuItem[];
  children: React.ReactNode;
  width?: number;
  variant?: 'primary' | 'secondary';
}

export function ButtonMenu({ children, variant = 'primary', items, width }: Props): JSX.Element {
  const [menuWidth, setMenuWidth] = useState<number | undefined>(width);
  const { popoverRef, isPopoverOpen, togglePopover, targetRef } = usePopover({
    excludeTarget: true,
  });

  useEffect(() => {
    let updatedWidth = width || targetRef.current.offsetWidth;

    // a width should not be skinnier than the target element
    if (width && targetRef.current.offsetWidth && width < targetRef.current.offsetWidth) {
      updatedWidth = targetRef.current.offsetWidth;
    }

    setMenuWidth(updatedWidth);
  }, [targetRef.current, width]);

  return (
    <>
      <Button type="button" size={variant} elementRef={targetRef} onClick={togglePopover} minWidth={menuWidth}>
        <Flexbox justifyContent="center" alignItems="center">
          {children}
          <Spacing width={4} />
          <Caret color={variant === 'primary' ? '#fff' : colors.steel[500]} />
        </Flexbox>
      </Button>
      <Portal name="popover">
        <Tether targetRef={targetRef} targetAnchor="topLeft" anchor="topLeft" yOffset={43} width={menuWidth}>
          <PopoverAnimation isOpen={isPopoverOpen} direction="down">
            <Box border={1} borderRadius={3} elementRef={popoverRef} boxShadow="overlay" backgroundColor="#fff">
              <Padding y={8}>
                <Menu items={items} />
              </Padding>
            </Box>
          </PopoverAnimation>
        </Tether>
      </Portal>
    </>
  );
}
