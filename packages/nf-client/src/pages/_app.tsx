import React from 'react';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { AxiosContext } from '@guyathomas/nf-ui';

const client = axios.create();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AxiosContext.Provider
      value={{
        client,
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </AxiosContext.Provider>
  );
};

export default App;
