import React from 'react';
import _ from 'lodash';
import { SelectInput } from '../../select-input';
import { TablePaginator as PaginatedTable } from '../index';
import { Padding } from '../../padding';
import { Input } from '../../input';
import { Flexbox } from '../../flexbox';
import { Box } from '../../box';
import { SegmentedControl } from '../../segmented-control';
import { Stack } from '../../stack';
import { Column } from '../../table/lib/types';
import { ExampleDataItem } from './types';

interface Props {
  columns: Column<ExampleDataItem>[];
  data: ExampleDataItem[];
  limit: number;
}

export default function ExampleTableWithFilters({ columns, data, limit }: Props): JSX.Element {
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('Active');
  const [selectedCarrier, setCarrier] = React.useState('');

  const filteredData = React.useMemo(
    () =>
      data
        .filter((policy) => {
          if (!search) return true;
          return policy.name.toLowerCase().includes(search.toLowerCase());
        })
        .filter((policy) => {
          if (!status) return true;
          return policy.status === status;
        })
        .filter((policy) => {
          if (!selectedCarrier) return true;
          return policy.carrier === selectedCarrier;
        }),
    [search, status, selectedCarrier],
  );

  const carrierOptions = React.useMemo(() => {
    const carriers = _.uniq(data.map((policy) => policy.carrier));
    return carriers.map((carrier) => ({
      label: carrier,
      value: carrier,
    }));
  }, []);

  return (
    <>
      <Box borderBottom={1}>
        <Padding size={12}>
          <Flexbox justifyContent="space-between">
            <Stack gap={8} width="400px">
              <SelectInput
                name="status"
                onChange={setCarrier}
                options={[
                  {
                    label: 'All carriers',
                    value: '',
                  },
                  ...carrierOptions,
                ]}
              />
              <SegmentedControl
                value={status}
                onChange={setStatus}
                options={[
                  {
                    label: 'Active',
                    value: 'Active',
                  },
                  {
                    label: 'Inactive',
                    value: 'Inactive',
                  },
                ]}
              />
            </Stack>
            <div style={{ width: 300 }}>
              <Input type="search" placeholder="Search..." onChange={setSearch} />
            </div>
          </Flexbox>
        </Padding>
      </Box>
      <PaginatedTable<ExampleDataItem> data={filteredData} columns={columns} limit={limit} />
    </>
  );
}
