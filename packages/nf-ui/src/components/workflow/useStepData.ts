import React from 'react';
import { useRouter } from 'next/router';
import { useAxios, Request } from '../../hooks/axios';

export function useStepData<T>(url: string): Request<T> {
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
