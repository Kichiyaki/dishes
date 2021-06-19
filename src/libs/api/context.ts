import { createContext } from 'react';
import { API } from './API';

export const context = createContext({
  api: new API(''),
});
context.displayName = 'API';
