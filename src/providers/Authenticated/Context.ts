import React from 'react';
import type { AuthenticatedState } from './types';

export const Context = React.createContext<AuthenticatedState>({
  username: '',
});

export default Context;
