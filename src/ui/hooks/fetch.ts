import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

import { useAxios } from './axios';

export type ReturnValue<T> = [T | undefined, boolean, AxiosError | undefined];

/**
 * Automatically redirect users when a request throws an authentication error
 * @param url string
 * @param params url parameters as key/value pairs
 */
export function useFetch<ResponseData>(url: string, params?: AxiosRequestConfig['params']): ReturnValue<ResponseData> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url,
    params,
  };
  const [fetch, { data, loading, error }] = useAxios<ResponseData>(options);

  useEffect(() => {
    fetch();
  }, []);

  return [data, loading, error];
}
