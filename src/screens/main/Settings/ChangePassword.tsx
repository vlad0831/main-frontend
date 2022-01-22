import React, { memo, useCallback, useState } from 'react';
import Auth from '@aws-amplify/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import { MainStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import Input from 'components/Input';

function ChangePassword({
  navigation,
}: StackScreenProps<MainStackParamList, ScreenNames.ChangePassword>) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = useCallback(async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, password, newPassword);
      navigation.navigate('Dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }, [navigation, newPassword, password]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX={16} alignContent="center" justifyContent="center">
        <Input
          textContentType="password"
          value={password}
          placeholder="Current Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Input
          value={newPassword}
          placeholder="New Password"
          secureTextEntry
          onChangeText={setNewPassword}
        />
        <Button color="primary" title="Save" onPress={handleChangePassword} />
        {!!errorMessage && (
          <Title variant="body" marginTop="xs" marginBottom="sm">
            {errorMessage}
          </Title>
        )}
      </Box>
    </LinearGradient>
  );
}

export default memo(ChangePassword);
