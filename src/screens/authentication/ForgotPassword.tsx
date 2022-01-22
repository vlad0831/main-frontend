import React, { memo, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Auth from '@aws-amplify/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import Input from 'components/Input';
import { ScreenNames } from 'utils/enum';
import { validateEmail } from 'utils/helper';
import { AuthenticationStackParamList } from 'utils/types';

function ForgotPasswordScreen({
  navigation,
}: StackScreenProps<AuthenticationStackParamList, ScreenNames.ForgotPassword>) {
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSendOtpCode = useCallback(async () => {
    if (!email || !validateEmail(email)) {
      return;
    }
    setLoading(true);
    await Auth.forgotPassword(email);
    setLoading(false);
    navigation.navigate(ScreenNames.ResetPassword, { email });
  }, [email, navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX={16} alignContent="center" justifyContent="center">
        <Title variant="section" textAlign="center" marginY="sm">
          We will send you an OTP code
        </Title>
        <Input
          textContentType="emailAddress"
          value={email}
          placeholder="Email Address"
          onChangeText={setEmail}
        />
        <Button color="primary" title="Send" disabled={loading} onPress={handleSendOtpCode} />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      </Box>
    </LinearGradient>
  );
}

export default memo(ForgotPasswordScreen);
