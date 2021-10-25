import React from 'react';

export type Cell = string | number | boolean;
export type Row = Record<string, Cell>;
export type Formatter<T> = (value: Cell, row: T, isSelected: boolean) => React.ReactNode;
export type Direction = 'ascending' | 'descending';

export interface Column<T> {
  dataField: string;
  format: Formatter<T>;
  label: string;
  minWidth?: string;
  sort?: boolean;
  type?: string;
  width?: string;
  visibleAtBreakpoint?: string;
}
