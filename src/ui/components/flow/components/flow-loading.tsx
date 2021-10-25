import * as React from 'react';
import { Spinner } from '../../spinner';

export default function FlowLoading(): JSX.Element {
  return (
    <div style={{ height: 'calc(100vh - 70px)', position: 'relative' }}>
      <Spinner />
    </div>
  );
}
