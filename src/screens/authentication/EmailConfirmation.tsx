import React, { memo, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Auth from '@aws-amplify/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, Title } from 'components/core';
import Input from 'components/Input';
import { AuthenticationStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { useTheme } from 'theme';

function EmailConfirmation({
  route,
}: StackScreenProps<AuthenticationStackParamList, ScreenNames.EmailConfirmation>) {
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, password } = route.params;

  const handleConfirm = useCallback(async () => {
    if (!code || !email) {
      return;
    }
    setErrorMessage('');
    try {
      setLoading(true);

      const isSuccessful = await Auth.confirmSignUp(email, code);
      if (!isSuccessful) {
        setErrorMessage('Something went wrong while confirming');
        return;
      }

      const session = await Auth.signIn(email, password);
      if (!session) {
        setErrorMessage('Something went wrong while logining');
        return;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [code, email, password]);

  const handleResend = useCallback(async () => {
    if (email) {
      try {
        setLoading(true);
        await Auth.forgotPassword(email);
      } finally {
        setLoading(false);
      }
    }
  }, [email]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX={16} alignContent="center" justifyContent="center">
        <Title variant="section" textAlign="center" marginY="sm">
          Email Confirmation
        </Title>
        <Input value={code} placeholder="Code" onChangeText={setCode} />
        <Button color="primary" title="Next" disabled={!code || loading} onPress={handleConfirm} />
        <Button color="secondary" title="Resend" disabled={loading} onPress={handleResend} />
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

export default memo(EmailConfirmation);
