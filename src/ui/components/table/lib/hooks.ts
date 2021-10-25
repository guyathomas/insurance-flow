import { useState, useMemo } from 'react';
import _ from 'lodash';
import { Direction } from './types';

interface Options<T> {
  data: T[];
  initialSort?: string;
  initialSortDirection?: Direction;
  limit?: number;
  offset?: number;
}

interface Hook<Data> {
  sort: (name: string) => void;
  rows: Data[];
  direction: Direction;
  currentSort?: string;
}

export function useTable<Data>(options: Options<Data>): Hook<Data> {
  const { data, limit, initialSort, initialSortDirection = 'ascending', offset = 0 } = options;
  const [currentSort, setCurrentSort] = useState<string | undefined>(initialSort);
  const [isAscending, setAscending] = useState(initialSortDirection === 'ascending');

  function sort(columnName: string): void {
    if (currentSort === columnName) {
      setAscending(!isAscending);
      return;
    }
    setAscending(true);
    setCurrentSort(columnName);
  }

  const rows = useMemo(() => {
    let sortedRows = data;

    if (currentSort) {
      sortedRows = _.sortBy(data, (row) => {
        const value = _.get(row, currentSort) || '';
        if (typeof value === 'number') {
          return value;
        }
        // if value isn't empty, return string toLowerCase() to sort table case-insensitively
        return String(value).toLowerCase();
      });
    }

    if (!isAscending) {
      sortedRows = sortedRows.reverse();
    }

    const endIndex: number = limit ? limit + offset : sortedRows.length;

    return sortedRows.slice(offset, endIndex);
  }, [currentSort, data, isAscending, limit, offset]);

  return {
    sort,
    rows,
    direction: isAscending ? 'ascending' : 'descending',
    currentSort,
  };
}
