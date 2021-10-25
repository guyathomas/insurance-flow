import React, { createContext, useContext } from 'react';
import parseUrl from 'url';

type Location = parseUrl.UrlWithParsedQuery;
const LocationContext = createContext<Location | null>(null);

interface LocationProviderProps {
  url: string;
  children: React.ReactNode;
}

export function LocationProvider(props: LocationProviderProps): JSX.Element {
  const { url, children } = props;
  const location = parseUrl.parse(url, true);

  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>;
}

/**
 * Get the current location on both the client and server. This is similar
 * to window.location
 */
export function useLocation(): Location {
  const location = useContext(LocationContext);

  if (!location) {
    throw new Error('LocationProvider needs to be added to pages/_app');
  }

  return location;
}
