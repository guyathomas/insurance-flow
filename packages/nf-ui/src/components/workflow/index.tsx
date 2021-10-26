import React from 'react';
import { useRouter } from 'next/router';
import { SomeJTDSchemaType, Step } from '@guyathomas/nf-common/lib/types';
import { Title } from '../title';
import { Button } from '../button';
import { useAxios, Request } from '../../hooks/axios';

function useStepData<T>(url: string): Request<T> {
  const router = useRouter();
  const step = router.query.step as string;
  const options = {
    url,
    params: {
      step,
    },
  };
  const [fetch, request] = useAxios<T>(options);
  React.useEffect(() => {
    fetch(options);
  }, [step]);
  return request;
}

interface WorkflowProps {
  schemaUrl: string;
}

export const Workflow: React.FC<WorkflowProps> = ({ schemaUrl }) => {
  const router = useRouter();
  const { data, loading, error } = useStepData<Step<SomeJTDSchemaType>>(schemaUrl);

  if (loading || !data?.pageTitle) return <div>Loading</div>;
  if (error) {
    return (
      <span role="img" aria-label="Error loading page">
        Error Loading Page🥲
      </span>
    );
  }

  return (
    <div>
      <Title>{data.pageTitle}</Title>
      {data.previous && (
        <Button
          onClick={() => {
            router.push({ query: { step: data.previous } }, undefined, { shallow: true });
          }}
        >
          Back
        </Button>
      )}
      <Button
        onClick={() => {
          if (data.next) {
            router.push({ query: { step: data.next } }, undefined, { shallow: true });
          }
        }}
      >
        {data.next ? 'Next' : 'Finish'}
      </Button>
    </div>
  );
};
