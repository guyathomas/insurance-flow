import React from 'react';
import { useRouter } from 'next/router';
import { useAxios, Request, RequestHook } from '../../hooks/axios';
import { AxiosRequestConfig } from 'axios';

export function useStepData<T>(url: string): Request<T> {
  const router = useRouter();
  const step = router.query.step as string;
  const options: AxiosRequestConfig = {
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

export function useSaveStep<T>(url: string): RequestHook<T> {
  const router = useRouter();
  const step = router.query.step as string;
  const options: AxiosRequestConfig = {
    url,
    params: {
      step,
    },
    method: 'POST',
  };
  return useAxios<T>(options);
}
