import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, Title } from 'components/core';
import Dropdown, { Selected } from 'react-native-dropdown-enhanced';
import { MainStackParamList } from 'utils/types';
import Input from 'components/Input';
import { ScreenNames } from 'utils/enum';
import { getProjectedValue, numberWithCommas } from 'utils/helper';
import { useAppSelector } from 'store/hook';
import { bankAccountsSelector, accountValueSelector } from 'store/slices/onboardingSlice';
import { query } from 'utils/http';
import { TRANSFER_MONEY } from 'graphql/mutations';
import { AccountValues } from 'models/onboarding';

export enum TransferMoneyType {
  Deposit = 'Deposit',
  Withdrawal = 'Withdrawal',
}

function TransferMoney({
  navigation,
}: StackScreenProps<MainStackParamList, ScreenNames.TransferMoney>) {
  const bankAccounts = useAppSelector(bankAccountsSelector);
  const selectionList = useMemo(
    () =>
      bankAccounts.map((bankAccount) => ({
        label: bankAccount.accountName,
        value: bankAccount.id,
      })),
    [bankAccounts],
  );
  const [bankAccount, setBankAccount] = useState(() => bankAccounts[0]);
  const [amount, setAmount] = useState('');
  const [transferType, setTransferType] = useState<TransferMoneyType | null>(null);
  const [loading, setLoading] = useState(false);
  const accountValues = useAppSelector<AccountValues>(accountValueSelector);
  const totalValue = accountValues.cash.cashBalance + accountValues.equityValue;
  const [futureValue, setFutureValue] = useState(totalValue);

  const handleTransaction = useCallback(async () => {
    if (amount === '') {
      Alert.alert('Please enter an amount');
      return;
    }

    if (transferType === TransferMoneyType.Withdrawal && +amount >= totalValue) {
      Alert.alert('Insufficient funds for this transaction');
      return;
    }

    try {
      setLoading(true);

      const { data } = await query<{
        data: {
          transferMoney: {
            isSuccess: boolean;
            message: string;
          };
        };
      }>(
        TRANSFER_MONEY,
        {
          amount: Number(amount),
          fromAccountId: bankAccount.id,
          transferType,
        },
        true,
      );

      setAmount('');
      navigation.navigate(ScreenNames.Dashboard);
      Alert.alert(data?.transferMoney?.message);
    } catch {
      Alert.alert('Transaction Failed!');
    } finally {
      setLoading(false);
    }
  }, [totalValue, transferType, amount]);

  const handleDepositPress = useCallback(() => {
    setTransferType(TransferMoneyType.Deposit);
  }, []);

  const handleWithdrawPress = useCallback(() => {
    setTransferType(TransferMoneyType.Withdrawal);
  }, []);

  const handleOnSelectedChange = useCallback(
    ({ value }: Selected) => {
      const selectedAccount = bankAccounts.find((bankAccount) => bankAccount.id === value);

      if (selectedAccount) {
        setBankAccount(selectedAccount);
      }
    },
    [bankAccounts],
  );

  const handleOnInputBlur = useCallback(() => {
    setFutureValue(totalValue + (transferType === TransferMoneyType.Deposit ? +amount : -amount));
  }, [totalValue, transferType, amount]);

  const projectedValue = useMemo(
    () =>
      getProjectedValue({
        initialAmount: futureValue,
        estimatedMonthlyRoundUps: 4.23,
        recurringContribution: 10,
        recurringFrequency: 'weekly',
        dailyInterest: 0.000211,
        period: 365,
      }),
    [futureValue],
  );

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box>
              <Button color="primary" title="Put money in" onPress={handleDepositPress} />
              <Button color="secondary" title="Take money out" onPress={handleWithdrawPress} />
              {transferType !== null && (
                <>
                  <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box flex={1}>
                      <Title variant="navigation">Amount:</Title>
                    </Box>
                    <Box flex={1}>
                      <Input
                        keyboardType="numeric"
                        placeholder="$$$"
                        onChangeText={setAmount}
                        blurOnSubmit
                        onEndEditing={handleOnInputBlur}
                        onBlur={handleOnInputBlur}
                      />
                    </Box>
                  </Box>
                  <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box flex={1}>
                      <Title variant="navigation">
                        {transferType === TransferMoneyType.Deposit ? 'From' : 'To'} account:
                      </Title>
                    </Box>
                    <Box flex={1}>
                      <Dropdown
                        style={{ backgroundColor: 'white', width: '100%', borderRadius: 8 }}
                        defaultLabel={bankAccount.accountName}
                        defaultValue={bankAccount.id}
                        data={selectionList}
                        onSelectedChange={handleOnSelectedChange}
                      />
                    </Box>
                  </Box>
                  <Title marginTop="sm" marginBottom="sm" fontSize="h3" textAlign="center">
                    After this transfer, your account value will be:
                  </Title>
                  <Title marginTop="sm" fontSize={50} textAlign="center">
                    ${numberWithCommas(futureValue.toFixed(2))}
                  </Title>
                  <Text marginTop="sm" marginBottom="sm" fontSize="h3" textAlign="center">
                    With these settings, in a year your portfolio could be worth*
                  </Text>
                  <Text marginTop="sm" fontSize={64} textAlign="center">
                    {`$${numberWithCommas(projectedValue.toFixed(2))}`}
                  </Text>
                  <Button
                    color={transferType === TransferMoneyType.Deposit ? 'primary' : 'secondary'}
                    title="Confirm"
                    onPress={handleTransaction}
                    disabled={loading}
                  />
                  {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
                  <Text marginTop="sm" marginBottom="sm" textAlign="center">
                    * assuming 10% annual investment returns and typical contribution from roundups.
                  </Text>
                </>
              )}
            </Box>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Box>
    </LinearGradient>
  );
}

export default memo(TransferMoney);
