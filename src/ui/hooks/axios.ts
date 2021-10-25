import { createContext, useContext, useState, useCallback } from 'react';
import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

/**
 * Request states
 */
export interface Request<T> {
  data?: T;
  loading: boolean;
  error?: AxiosError;
}

/**
 * Callback that makes an axios request.
 */
export type Fetch<T> = (options?: AxiosRequestConfig) => Promise<T>;

/**
 * Return value of the request hook
 */
export type RequestHook<T> = [Fetch<T>, Request<T>];

/**
 * Data stored in RequestContext
 */
interface AxiosContextData {
  client: AxiosInstance | null;
}

/**
 * When the hook is called the axios client must be available
 * on this context object.
 */
export const AxiosContext = createContext<AxiosContextData>({
  client: null,
});

/**
 * Hook that returns a fetch function that can be used to make requests.
 * It also returns the request state.
 */
export function useAxios<Data>(defaultOptions: AxiosRequestConfig = {}): RequestHook<Data> {
  const client = useAxiosClient();
  const [data, setData] = useState<Data | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>();

  async function request(options: AxiosRequestConfig = {}): Promise<Data> {
    setLoading(true);
    setError(undefined);
    try {
      const res = await client.request({
        ...defaultOptions,
        ...options,
      });
      setData(res.data);
      return res.data;
    } catch (e) {
      const axiosError = e as AxiosError;
      setError(axiosError);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return [
    useCallback(request, [client]),
    {
      data,
      loading,
      error,
    },
  ];
}

/**
 * Access the axios client directly
 */
export function useAxiosClient(): AxiosInstance {
  const { client } = useContext(AxiosContext);

  if (!client) {
    throw new Error('Axios client must be set on AxiosContext');
  }

  return client;
}
