import React, { memo, ComponentType } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from 'utils/enum';
import { RootStackParamList } from 'utils/types';
import SplashScreen from 'screens/Splash';
import { useAuth } from 'providers/Auth';
import AuthenticatedContext from 'providers/Authenticated/Context';
import AuthenticationNavigator from './Authentication';
import AuthenticatedNavigator from './Authenticated';

function withAuthenticated<T>(Component: ComponentType<T>, state: { username: string }) {
  return (props: T) => (
    <AuthenticatedContext.Provider value={state}>
      <Component {...props} />
    </AuthenticatedContext.Provider>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useAuth();

  if (!auth.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!auth.isAuthenticated ? (
        <RootStack.Screen name={ScreenNames.Authentication} component={AuthenticationNavigator} />
      ) : (
        <RootStack.Screen
          name={ScreenNames.Authenticated}
          component={withAuthenticated(AuthenticatedNavigator, auth)}
        />
      )}
    </RootStack.Navigator>
  );
}

export default memo(RootNavigator);
