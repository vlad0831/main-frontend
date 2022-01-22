import { useContext } from 'react';
import Context from './Context';
import type { AuthState } from './types';
export { default } from './Provider';

export function useAuth(): AuthState {
  return useContext(Context);
}
