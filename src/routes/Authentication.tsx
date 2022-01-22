import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from 'utils/enum';
import GetStartedScreen from 'screens/authentication/GetStarted';
import LoginScreen from 'screens/authentication/Login';
import ForgotPasswordScreen from 'screens/authentication/ForgotPassword';
import ResetPasswordScreen from 'screens/authentication/ResetPassword';
import EmailConfirmation from 'screens/authentication/EmailConfirmation';
import Register from 'screens/authentication/Register';
import { useTheme } from 'theme';

const AuthenticationStack = createStackNavigator();

function AuthenticationNavigator() {
  const theme = useTheme();

  return (
    <AuthenticationStack.Navigator
      initialRouteName={ScreenNames.GetStarted}
      screenOptions={{
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.purple,
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
      }}
    >
      <AuthenticationStack.Screen
        name={ScreenNames.GetStarted}
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />
      <AuthenticationStack.Screen
        name={ScreenNames.Login}
        component={LoginScreen}
        options={{ title: 'Login', headerLeft: () => null }}
      />
      <AuthenticationStack.Screen
        name={ScreenNames.ForgotPassword}
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password' }}
      />
      <AuthenticationStack.Screen
        name={ScreenNames.ResetPassword}
        component={ResetPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
      <AuthenticationStack.Screen
        name={ScreenNames.Register}
        component={Register}
        options={{ title: 'Create account', headerLeft: () => null }}
      />
      <AuthenticationStack.Screen
        name={ScreenNames.EmailConfirmation}
        component={EmailConfirmation}
        options={{ title: 'Confirm Email' }}
      />
    </AuthenticationStack.Navigator>
  );
}

export default memo(AuthenticationNavigator);
