import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type AnimationDirection = 'up' | 'down' | 'left' | 'right';
type Coordinate = {
  x: number;
  y: number;
};

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  direction: AnimationDirection;
}

const animationDirections: Record<AnimationDirection, Coordinate> = {
  up: {
    x: 0,
    y: 10,
  },
  down: {
    x: 0,
    y: -10,
  },
  left: {
    x: -10,
    y: 0,
  },
  right: {
    x: 10,
    y: 0,
  },
};

export function PopoverAnimation(props: Props): JSX.Element {
  const { isOpen, children, direction } = props;
  const { x, y } = animationDirections[direction];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x, y, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 300 } }}
          exit={{
            y,
            x,
            opacity: 0,
            transition: {
              type: 'spring',
              damping: 10,
              stiffness: 100,
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
