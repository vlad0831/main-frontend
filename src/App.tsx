import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import AuthProvider from 'providers/Auth';
import store from 'store';
import { themes } from './theme';
import RootNavigator from './routes';
import { SENTRY_DSN } from '../config';

Sentry.init({
  dsn: SENTRY_DSN,
});

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function App() {
  const theme = themes.dark;

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Provider store={store}>
          <NavigationContainer theme={DarkTheme}>
            <RootNavigator />
          </NavigationContainer>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default Sentry.wrap(App);
