import { useContext } from 'react';
import { context } from './context';
import { API } from './API';

export const useAPI = (): API => {
  return useContext(context).api;
};
