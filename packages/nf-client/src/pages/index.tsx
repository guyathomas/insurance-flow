import React from 'react';
import { Workflow } from '@guyathomas/nf-ui';

export default function IndexPage(): JSX.Element {
  return <Workflow schemaUrl="/api/flow/test" />;
}
