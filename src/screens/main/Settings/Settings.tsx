import React, { memo, useCallback } from 'react';
import Auth from '@aws-amplify/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient } from 'components/core';
import { MainStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';

function Settings({ navigation }: StackScreenProps<MainStackParamList, ScreenNames.Settings>) {
  const handleLinkedAccounts = useCallback(() => {
    navigation.navigate(ScreenNames.LinkedAccounts);
  }, [navigation]);

  const handleChangePassword = useCallback(() => {
    navigation.navigate(ScreenNames.ChangePassword);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    Auth.signOut();
  }, []);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Button color="primary" title="Name and Contact" disabled />
        <Button color="primary" title="Linked Accounts" onPress={handleLinkedAccounts} />
        <Button color="primary" title="Investor Questionnaire" disabled />
        <Button color="primary" title="Change Password" onPress={handleChangePassword} />
        <Button color="primary" title="Documents & Statements" disabled />
        <Button color="primary" title="Disclosures" disabled />
        <Button color="primary" title="About" disabled />
        <Button color="error" title="Sign Out" onPress={handleLogout} />
      </Box>
    </LinearGradient>
  );
}

export default memo(Settings);
