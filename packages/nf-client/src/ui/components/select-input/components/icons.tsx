import React from 'react';

export function IconSelect({ testId }: { testId?: string }): JSX.Element {
  return (
    <svg width="9" height="13" viewBox="0 0 9 13" data-testid={testId}>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 8.1875H8.25L4.125 13L0 8.1875Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 4.8125H8.25L4.125 0L0 4.8125Z" fill="currentColor" />
    </svg>
  );
}
