import * as React from 'react';
import { Column } from '../../table/lib/types';
import { ExampleDataItem } from './types';
import { TablePaginator as PaginatedTable } from '../index';

interface Props {
  columns: Column<ExampleDataItem>[];
  data: ExampleDataItem[];
  limit: number;
}

export default function StickyColumnTable({ columns, data, limit }: Props): JSX.Element {
  return <PaginatedTable<ExampleDataItem> stickyColumn data={data} columns={columns} limit={limit} border={1} />;
}
