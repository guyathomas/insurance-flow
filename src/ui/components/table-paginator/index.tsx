import React, { useState, useEffect } from 'react';
import { Table, TableProps } from '../table';
import { Box } from '../box';
import { PaginationControls } from '../pagination-controls';

interface Props<Data> extends TableProps<Data> {
  border?: number;
}

export function TablePaginator<Data>(props: Props<Data>): JSX.Element {
  const {
    border = 0,
    columns,
    data,
    hasAllSelected,
    initialSort,
    initialSortDirection,
    limit = 10,
    loading,
    maxHeight,
    noResults,
    selected,
    setHasAllSelected,
    setSelected,
    stickyColumn,
    testId,
  } = props;

  const pageCount = Math.ceil(data.length / limit);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
  }, [data]);

  const handlePageClick = ({ selected: selectedPage }: { selected: number }): void => {
    const newOffset = Math.ceil(selectedPage * limit);
    setOffset(newOffset);
  };

  return (
    <>
      <Box border={border}>
        <Table
          columns={columns}
          data={data}
          hasAllSelected={hasAllSelected}
          initialSort={initialSort}
          initialSortDirection={initialSortDirection}
          limit={limit}
          loading={loading}
          maxHeight={maxHeight}
          noResults={noResults}
          offset={offset}
          selected={selected}
          setHasAllSelected={setHasAllSelected}
          setSelected={setSelected}
          stickyColumn={stickyColumn}
          testId={testId}
        />
      </Box>
      <PaginationControls pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
}
