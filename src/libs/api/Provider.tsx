import { useMemo } from 'react';
import { context as Context } from './context';
import { API } from './API';

export interface APIProviderProps {
  apiURL: string;
  children?: React.ReactNode;
}

export const APIProvider = ({ apiURL, children }: APIProviderProps) => {
  const api = useMemo(() => new API(apiURL), [apiURL]);
  return <Context.Provider value={{ api }}>{children}</Context.Provider>;
};
