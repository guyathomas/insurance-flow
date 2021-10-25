import { useFetch } from '../../hooks/fetch';
import React from 'react';

interface WorkflowProps {
  schemaUrl: string;
}

export const Workflow: React.FC<WorkflowProps> = ({ schemaUrl }) => {
  const [data, loading, error] = useFetch(schemaUrl);
  if (loading) return <div>Loading</div>;
  if (error)
    return (
      <span role="img" aria-label="Error loading page">
        Error Loading Page🥲
      </span>
    );
  return <div>{JSON.stringify(data)}</div>;
};
