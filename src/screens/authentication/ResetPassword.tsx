import React, { memo, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Auth from '@aws-amplify/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, Title } from 'components/core';
import { AuthenticationStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import Input from 'components/Input';
import { OTP_LENGTH } from 'utils/constants';
import { useTheme } from 'theme';

function ResetPasswordScreen({
  navigation,
  route,
}: StackScreenProps<AuthenticationStackParamList, ScreenNames.ResetPassword>) {
  const theme = useTheme();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { email } = route.params;

  const handleCodeChange = useCallback((text) => {
    setErrorMessage('');
    setOtp(text);
  }, []);

  const handlePasswordChange = useCallback((text) => {
    setErrorMessage('');
    setPassword(text);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!email || !otp || !password || otp.length < OTP_LENGTH) {
      return;
    }
    try {
      setLoading(true);
      setErrorMessage('');
      const isSuccessful = await Auth.forgotPasswordSubmit(email, otp, password);
      if (isSuccessful) {
        const session = await Auth.signIn(email, password);
        if (!session) {
          navigation.navigate(ScreenNames.Login);
          return;
        }
      } else {
        setErrorMessage('Something went wrong while resetting password');
      }
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [email, navigation, otp, password]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX={16} alignContent="center" justifyContent="center">
        <Title variant="section" textAlign="center" marginY="sm">
          Input your Code and New Password
        </Title>
        <Input value={otp} placeholder="OTP Code" onChangeText={handleCodeChange} />
        <Input
          value={password}
          placeholder="New Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
        />
        <Button color="primary" title="Confirm" disabled={loading} onPress={handleConfirm} />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
        {!!errorMessage && (
          <Text style={{ color: theme.colors.error }} textAlign="center" marginTop="sm">
            {errorMessage}
          </Text>
        )}
      </Box>
    </LinearGradient>
  );
}

export default memo(ResetPasswordScreen);
