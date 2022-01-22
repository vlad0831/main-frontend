import React, { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { LinkSuccess, LinkExit, openLink } from 'react-native-plaid-link-sdk';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, Title } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { bankAccountsSelector, setBankAccounts } from 'store/slices/onboardingSlice';
import { getPlaidLinkToken, saveBankAccount } from 'utils/helper';

function SetupBank({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.SetupBank>) {
  const dispatch = useAppDispatch();
  const bankAccounts = useAppSelector(bankAccountsSelector);
  const [linkToken, setLinkToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchLinkToken = async () => {
      const linkToken = await getPlaidLinkToken();
      if (mounted) {
        setLinkToken(linkToken);
      }
    };

    fetchLinkToken();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlaidSuccess = useCallback(
    async (success: LinkSuccess) => {
      try {
        setLoading(true);
        const newBankAccount = await saveBankAccount(
          success.publicToken,
          success.metadata.institution?.id,
          success.metadata.accounts[0].id,
        );
        dispatch(setBankAccounts(bankAccounts.concat(newBankAccount)));
      } catch {
        return;
      } finally {
        setLoading(false);
      }

      navigation.navigate(ScreenNames.FundYourAccount);
    },
    [bankAccounts, dispatch, navigation],
  );

  const handlePlaidExit = useCallback(
    (exit: LinkExit) => {
      console.log(exit);
      navigation.navigate(ScreenNames.SetupBank);
    },
    [navigation],
  );

  const handlePlaidClick = useCallback(() => {
    openLink({
      tokenConfig: {
        token: linkToken,
        noLoadingState: false,
      },
      onSuccess: handlePlaidSuccess,
      onExit: handlePlaidExit,
    });
  }, [linkToken, handlePlaidSuccess, handlePlaidExit]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="header" textAlign="center">
          We use Plaid to link your bank account.
        </Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          <Text fontSize={22} textAlign="center">
            To make investments, deposits, withdrawals, and securely link your bank to your Allio
            account, we use bank-level security, data encryption, and more.
          </Text>
        </Box>
        <Text fontSize={15} textAlign="center" marginBottom={12}>
          Your data is protected with 256-bit encryption and is never stored on your phone.
        </Text>
        {linkToken && !loading ? (
          <Button
            color="primary"
            title="Link your accounts with Plaid!"
            onPress={handlePlaidClick}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </Box>
    </LinearGradient>
  );
}

export default memo(SetupBank);
