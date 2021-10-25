import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { fontFamilies } from '../../theme';
import { colors } from '../../theme/colors';
import { Flexbox } from '../flexbox';
import { Caret } from '../icons';
import { Padding } from '../padding';

interface Props {
  forcePage?: number;
  onPageChange: ({ selected: number }) => void;
  pageCount: number;
  testId?: string;
}

export function PaginationControls({ forcePage, pageCount, onPageChange, testId }: Props): JSX.Element | null {
  if (pageCount < 2) return null;

  return (
    <Flexbox justifyContent="flex-end">
      <Padding top={24}>
        <StyledPaginationWrapper data-testid={testId}>
          <ReactPaginate
            previousLabel={<Caret rotate={90} display="inline" />}
            nextLabel={<Caret rotate={-90} display="inline" />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            forcePage={forcePage}
          />
        </StyledPaginationWrapper>
      </Padding>
    </Flexbox>
  );
}

const StyledPaginationWrapper = styled.div`
  .pagination {
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  .pagination li {
    display: inline;
  }

  .pagination a {
    border: 1px solid ${colors.steel[200]};
    border-radius: 0;
    color: ${colors.brand[400]};
    cursor: pointer;
    font-family: ${fontFamilies.body};
    font-size: 16px;
    font-weight: 600;
    margin-left: -1px;
    outline: none;
    padding: 6px 12px;
    stroke: ${colors.brand[400]};
  }

  .pagination a:hover {
    background: ${colors.steel[100]};
  }

  .pagination li.active a,
  .pagination li.active path {
    background: ${colors.brand[400]};
    border-color: ${colors.brand[400]};
    color: #fff;
  }

  .pagination li.disabled a,
  .pagination li.disabled path {
    background: ${colors.steel[100]};
    color: ${colors.steel[200]};
    cursor: not-allowed;
    stroke: ${colors.steel[200]};
  }

  .pagination li:first-child a {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }

  .pagination li:last-child a {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }

  // hack: pull icons up in chrome/safari
  .previous svg,
  .next svg {
    position: relative;
    top: -3px;
  }
`;
