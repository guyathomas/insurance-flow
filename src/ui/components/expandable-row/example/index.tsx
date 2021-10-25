import React, { useState, useEffect } from 'react';
import { Padding } from '../../padding';
import { Flexbox, FlexCell } from '../../flexbox';
import { Table } from '../../table';
import { Checkbox } from '../../checkbox';
import { Text } from '../../text';
import { COLUMNS } from './columns';
import { colors } from '../../../theme/colors';
import { ExampleData } from './types';
import { ExpandableRow, ExpandableHead, ExpandableBody } from '..';

const mockData = [];
const times = (x) => (f) => {
  if (x > 0) {
    f(x);
    times(x - 1)(f);
  }
};

times(10)((x) =>
  mockData.push({
    id: x,
    name: 'Marky Mark',
    age: '21',
    email: 'markymarkandthefunkybunch@gmail.com',
    status: x % 2 === 0 ? 'Active' : 'Inactive',
    carrier: x % 2 === 0 ? 'AmTrust Financial Services' : 'Liberty Mutual',
  }),
);

interface CheckBoxProps {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

function ControlledCheckbox({ children, onClick, isActive }: CheckBoxProps): JSX.Element {
  return (
    <Flexbox>
      <FlexCell>
        <Padding right={16}>
          <Checkbox isActive={isActive} onClick={onClick} />
        </Padding>
      </FlexCell>
      <FlexCell flex={2}>{children}</FlexCell>
    </Flexbox>
  );
}

interface Props {
  onSelected?: (rows: ExampleData[]) => unknown;
  onAllSelected?: (value: boolean) => unknown;
}

export function ControlledExample({ onSelected, onAllSelected }: Props): JSX.Element {
  const [hasAllSelected, setHasAllSelected] = useState<boolean>(false);
  const [selected, setSelected] = useState([]);

  const handleAllSelected = (isAllSelected: boolean): void => {
    setHasAllSelected(isAllSelected);
    const selectedData = isAllSelected ? mockData : [];
    setSelected(selectedData);
  };

  useEffect(() => {
    onAllSelected(hasAllSelected);
    onSelected(selected);
  }, [selected, hasAllSelected, onSelected, onAllSelected]);

  return (
    <ExpandableRow>
      <ExpandableHead onExpandedBackgroundColor={colors.steel[200]} paddingX={8}>
        <ControlledCheckbox onClick={() => handleAllSelected(!hasAllSelected)} isActive={hasAllSelected}>
          <Text>
            <strong>General liability</strong>
          </Text>
        </ControlledCheckbox>
      </ExpandableHead>
      <ExpandableBody paddingX={8}>
        <Table
          columns={COLUMNS}
          data={mockData}
          hasAllSelected={hasAllSelected}
          setHasAllSelected={handleAllSelected}
          selected={selected}
          setSelected={(rows: ExampleData[]): void => setSelected(rows)}
        />
      </ExpandableBody>
    </ExpandableRow>
  );
}
