import React from 'react';
import type { AuthState } from './types';

export const Context = React.createContext<AuthState>({ isInitialised: false });

export default Context;
