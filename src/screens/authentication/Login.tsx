import React, { memo, useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import Auth from '@aws-amplify/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, TextButton } from 'components/core';
import Input from 'components/Input';
import { AuthenticationStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { validateEmail } from 'utils/helper';
import { useTheme } from 'theme';

function LoginScreen({
  navigation,
}: StackScreenProps<AuthenticationStackParamList, ScreenNames.Login>) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      return;
    }

    setLoading(true);
    setShowError(false);

    try {
      const user = await Auth.signIn(email, password);
      if (!user) {
        setShowError(true);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error', error);
        switch (error.name) {
          case 'UserNotConfirmedException':
            navigation.navigate(ScreenNames.EmailConfirmation, { email, password });
            break;
        }
      }

      setShowError(true);
    } finally {
      setLoading(false);
    }
  }, [email, navigation, password]);

  const handleEmailChange = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    setPassword(password);
  }, []);

  const handleForgotPasswordClick = useCallback(() => {
    navigation.navigate(ScreenNames.ForgotPassword);
  }, [navigation]);

  const handleRegisterClick = useCallback(() => {
    navigation.navigate(ScreenNames.Register);
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX={16} alignContent="center" justifyContent="center">
        <Input
          textContentType="emailAddress"
          value={email}
          placeholder="Email Address"
          onChangeText={handleEmailChange}
        />
        <Input
          textContentType="password"
          value={password}
          placeholder="Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
        />
        <Button
          color="secondary"
          title="Sign In"
          disabled={!email || !validateEmail(email) || !password || loading}
          onPress={handleLogin}
        />
        <TextButton onPress={handleForgotPasswordClick} marginTop={20}>
          Forgot password?
        </TextButton>
        <TextButton onPress={handleRegisterClick} marginTop={20}>
          Need to create an account?
        </TextButton>
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
        {showError && (
          <Text style={{ color: theme.colors.error }} textAlign="center" marginTop="sm">
            Email and password combination not found.
          </Text>
        )}
      </Box>
    </LinearGradient>
  );
}

export default memo(LoginScreen);
