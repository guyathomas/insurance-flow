/* eslint react/jsx-props-no-spreading: 0 */
import React from 'react';
import styled from 'styled-components';
import { Padding } from '../../padding';
import { SpacingValue } from '../../../theme';

interface ExpandableBodyProps {
  // eslint-disable-next-line
  getCollapseProps?: any;
  children: React.ReactNode;
  paddingX?: SpacingValue;
  paddingBottom?: SpacingValue;
}

export const ExpandableBody = ({
  getCollapseProps,
  children,
  paddingX = 24,
  paddingBottom = 24,
}: ExpandableBodyProps): JSX.Element => (
  <StyledBody {...getCollapseProps()}>
    <Padding bottom={paddingBottom} x={paddingX}>
      {children}
    </Padding>
  </StyledBody>
);

const StyledBody = styled.div`
  overflow: hidden;
`;
