import { Column } from '../../table/lib/types';
import { formatters } from '../../table/index';
import { ExampleData } from './types';

export const COLUMNS: Column<ExampleData>[] = [
  {
    label: 'Id',
    dataField: 'id',
    format: formatters.text,
  },
  {
    label: 'Name',
    dataField: 'name',
    format: formatters.text,
  },
  {
    label: 'Age',
    dataField: 'age',
    format: formatters.text,
  },
  {
    label: 'Email',
    dataField: 'email',
    format: formatters.text,
  },
  {
    label: 'Carrier',
    dataField: 'carrier',
    format: formatters.text,
  },
  {
    label: 'Status',
    dataField: 'status',
    format: formatters.badge({
      Active: 'success',
    }),
  },
];
