import React, { PropsWithChildren, useEffect, useState } from 'react';
import type { HubCallback } from '@aws-amplify/core';
import { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import Context from './Context';
import type { AuthState } from './types';
import { COGNITO_REGION, COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } from '../../../config';

export default function Provider({ children }: PropsWithChildren<{}>): JSX.Element {
  const [auth, setAuth] = useState<AuthState>({ isInitialised: false });

  useEffect(() => {
    const onHubCapsule: HubCallback = async (capsule) => {
      switch (capsule.payload.event) {
        case 'signIn': {
          const user = await Auth.currentAuthenticatedUser();
          console.log('User Sign In', user);
          setAuth({
            isInitialised: true,
            isAuthenticated: true,
            username: user.getUsername(),
          });
          break;
        }
        case 'signUp':
          console.log('User Sign Up');
          break;
        case 'signOut':
          console.log('User Signed Out');
          setAuth({
            isInitialised: true,
            isAuthenticated: false,
          });
          break;
        case 'signIn_failure':
          console.log('User Sign In Failed');
          break;
        case 'configured': {
          console.log('Configured');
          try {
            const user = await Auth.currentAuthenticatedUser();
            console.log('Found User', user);
            if (!auth.isInitialised) {
              setAuth(
                user
                  ? {
                      isInitialised: true,
                      isAuthenticated: true,
                      username: user.getUsername(),
                    }
                  : {
                      isInitialised: true,
                      isAuthenticated: false,
                    },
              );
            }
          } catch {
            setAuth({
              isInitialised: true,
              isAuthenticated: false,
            });
          }
          break;
        }
      }
    };

    Hub.listen('auth', onHubCapsule);

    return () => {
      Hub.remove('auth', onHubCapsule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Auth.configure({
      Auth: {
        mandatorySignIn: true,
        region: COGNITO_REGION,
        userPoolId: COGNITO_USER_POOL_ID,
        userPoolWebClientId: COGNITO_CLIENT_ID,
      },
    });
  }, []);

  return <Context.Provider value={auth}>{children}</Context.Provider>;
}
