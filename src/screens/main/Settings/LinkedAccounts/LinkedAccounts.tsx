import React, { memo, useState, useEffect, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinkSuccess, openLink } from 'react-native-plaid-link-sdk';
import { Box, Button, LinearGradient } from 'components/core';
import { AccountInfo } from 'models/main';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { bankAccountsSelector, setBankAccounts } from 'store/slices/onboardingSlice';
import { getPlaidLinkToken, saveBankAccount, deleteBankAccount } from 'utils/helper';
import Account from './Account';

function LinkedAccounts() {
  const dispatch = useAppDispatch();
  const bankAccounts = useAppSelector(bankAccountsSelector);
  const [linkToken, setLinkToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const linkToken = await getPlaidLinkToken();
      setLinkToken(linkToken);
    };

    fetchLinkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteAccount = useCallback(
    async (bankAccountId: string) => {
      setLoading(true);
      try {
        await deleteBankAccount(bankAccountId);
        dispatch(
          setBankAccounts(bankAccounts.filter((bankAccount) => bankAccount.id !== bankAccountId)),
        );
        Alert.alert('Account Deleted!');
      } catch (error: any) {
        console.log(error.response.data);
        Alert.alert('There was an error, please try again');
      } finally {
        setLoading(false);
      }
    },
    [bankAccounts, dispatch],
  );

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
        Alert.alert('Account Added!');
      } finally {
        setLoading(false);
      }
    },
    [bankAccounts, dispatch],
  );

  const handlePlaidClick = useCallback(() => {
    openLink({
      tokenConfig: {
        token: linkToken,
        noLoadingState: false,
      },
      onSuccess: handlePlaidSuccess,
    });
  }, [linkToken, handlePlaidSuccess]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <ScrollView>
          {bankAccounts.map((bankAccount: AccountInfo) => (
            <Account
              key={bankAccount.id}
              plaidLinkedItemId={bankAccount.id}
              onPress={() => handleDeleteAccount(bankAccount.id)}
              title={bankAccount.institutionName}
              subTitle={bankAccount.accountName}
              disabled={loading}
            />
          ))}
        </ScrollView>
        {linkToken && !loading ? (
          <Box paddingTop={10}>
            <Button color="primary" title="Connect New Account" onPress={handlePlaidClick} />
          </Box>
        ) : (
          <ActivityIndicator size="large" style={{ flex: 1 }} />
        )}
      </Box>
    </LinearGradient>
  );
}

export default memo(LinkedAccounts);
