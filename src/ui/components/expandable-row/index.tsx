import React, { useState } from 'react';
import useCollapse from 'react-collapsed';
import { Box } from '../box';
import { ExpandableHead } from './components/expandable-head';
import { ExpandableBody } from './components/expandable-body';

interface Props {
  children: React.ReactElement[];
  expanded?: boolean;
}

const animationStyles = {
  transitionDuration: '.2s',
};

export function ExpandableRow({ children, expanded }: Props): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
    expandStyles: animationStyles,
    collapseStyles: animationStyles,
  });

  const headProps = {
    getToggleProps: getToggleProps({
      onClick: () => setIsExpanded((oldExpanded) => !oldExpanded),
    }),
    isExpanded,
  };

  const bodyProps = {
    getCollapseProps,
  };

  return (
    <Box border={1} borderRadius={3} boxShadow="card" style={{ overflow: 'hidden' }}>
      {React.cloneElement(children[0], headProps)}
      {React.cloneElement(children[1], bodyProps)}
    </Box>
  );
}

export { ExpandableHead, ExpandableBody };
