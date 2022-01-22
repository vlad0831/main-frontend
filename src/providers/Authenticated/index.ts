import { useContext } from 'react';
import Context from './Context';
import type { AuthenticatedState } from './types';

export function useAuthenticated(): AuthenticatedState {
  return useContext(Context);
}
