import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import { format } from 'date-fns';
import { MainStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import {
  accountValueSelector,
  bankAccountsSelector,
  portfolioSelector,
} from 'store/slices/onboardingSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  fetchTransactions,
  investmentPerformanceSelector,
  transactionsSelector,
} from 'store/slices/dashboardSlice';
import { LineChart } from 'components';
import { getPercentage, numberWithCommas } from 'utils/helper';
import { convertInstrumentsToAssetClasses } from 'utils/helper';

function Dashboard({ navigation }: StackScreenProps<MainStackParamList, ScreenNames.Dashboard>) {
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const accountValue = useAppSelector(accountValueSelector);
  const investmentPerfomance = useAppSelector(investmentPerformanceSelector);
  const totalValue = accountValue.cash.cashBalance + accountValue.equityValue;
  const portfolio = useAppSelector(portfolioSelector);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  // Fake data for now.
  const storedTransactions = useAppSelector(transactionsSelector);
  const transactions = storedTransactions?.length
    ? storedTransactions
    : [
        {
          id: '1',
          executionDate: '2021-11-18',
          fundingMethod: {
            method: 'Recurring',
          },
          currency: 'USD',
          amount: 50,
        },
        {
          id: '2',
          executionDate: '2021-11-15',
          fundingMethod: {
            method: 'RoundUp',
          },
          currency: 'USD',
          amount: 6.32,
        },
        {
          id: '3',
          executionDate: '2021-11-13',
          fundingMethod: {
            method: 'Widthdrawl',
          },
          currency: 'USD',
          amount: -300,
        },
        {
          id: '4',
          executionDate: '2021-11-10',
          fundingMethod: {
            method: 'Recurring',
          },
          currency: 'USD',
          amount: 50,
        },
        {
          id: '5',
          executionDate: '2021-11-08',
          fundingMethod: {
            method: 'RoundUp',
          },
          currency: 'USD',
          amount: 6.32,
        },
      ];

  const assetClassPortfolio = useMemo(
    () => convertInstrumentsToAssetClasses(portfolio),
    [portfolio],
  );

  const bankAccounts = useAppSelector(bankAccountsSelector);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const displayPerformance = useMemo(() => {
    return investmentPerfomance.map((investment) => ({
      value: investment.equity + investment.cash,
      label: investment.date.slice(5),
    }));
  }, []);

  const handleTransferMoney = useCallback(() => {
    if (bankAccounts.length === 0) {
      Alert.alert('No accounts linked', 'At least one account needed to make transfers', [
        {
          text: 'Back to Dashboard',
          onPress: () => navigation.navigate(ScreenNames.Dashboard),
          style: 'cancel',
        },
        {
          text: 'Add Linked Account',
          onPress: () => navigation.navigate(ScreenNames.LinkedAccounts),
        },
      ]);
    } else {
      navigation.navigate(ScreenNames.TransferMoney);
    }
  }, [navigation, bankAccounts]);

  const handleCustomizePortfolio = useCallback(() => {
    navigation.navigate(ScreenNames.CustomizePortfolio);
  }, [navigation]);

  const handleChangeFunding = useCallback(() => {
    navigation.navigate(ScreenNames.RoundUpsAndRecurring);
  }, [navigation]);

  return (
    <LinearGradient>
      <ScrollView>
        <Box flex={1} paddingX="sm" paddingY="sm">
          <Box marginBottom="sm">
            <LineChart
              title={`Account Value: $${numberWithCommas(totalValue.toFixed(2))}`}
              strokeWidth={2}
              strokeColor="brandPink"
              gridColor="lightGray"
              activeGridColor="brandPink"
              activeGridIndex={10}
              yAxisPrefix="$"
              values={displayPerformance}
            />
          </Box>
          <Box>
            <Button color="primary" title="Transfer Money" onPress={handleTransferMoney} />
          </Box>
          <Box marginY="sm">
            <Title variant="section" marginBottom="sm">
              Account Holdings
            </Title>
            <Title style={{ position: 'absolute', right: 60, top: 7, fontSize: 14 }}>
              {isEnabled ? 'Show $' : 'Show %'}
            </Title>
            <Switch
              trackColor={{ false: '#767577', true: '#4D3ACC' }}
              thumbColor={isEnabled ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#34BEF2"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ position: 'absolute', right: 0 }}
            />
            {isEnabled
              ? assetClassPortfolio.map((allocation) => (
                  <Box key={allocation.id} flexDirection="row" justifyContent="space-between">
                    <Title marginRight="sm">{allocation.asset}</Title>
                    <Title>{getPercentage(allocation.weight, totalValue).toFixed(2)}%</Title>
                  </Box>
                ))
              : assetClassPortfolio.map((allocation) => (
                  <Box key={allocation.id} flexDirection="row" justifyContent="space-between">
                    <Title marginRight="sm">{allocation.asset}</Title>
                    <Title>${allocation.weight.toFixed(2)}</Title>
                  </Box>
                ))}
          </Box>
          <Box>
            <Button
              color="secondary"
              title="Customize Portfolio"
              onPress={handleCustomizePortfolio}
            />
          </Box>
          <Box marginY="sm">
            <Title variant="section" marginBottom="sm">
              Recent & Upcoming Activity
            </Title>
            {transactions.map((transaction) => (
              <Box key={transaction.id} flexDirection="row" justifyContent="space-between">
                <Box flexDirection="row">
                  <Title marginRight="sm">
                    {format(new Date(transaction.executionDate), 'MM/dd/yy')}
                  </Title>
                  <Title>{transaction.fundingMethod.method}</Title>
                </Box>
                <Title textAlign="left">
                  {`${transaction.amount < 0 ? '(' : ''}$${Math.abs(transaction.amount).toFixed(
                    2,
                  )}${transaction.amount < 0 ? ')' : ''}`}
                </Title>
              </Box>
            ))}
          </Box>
          <Box>
            <Button
              color="primary"
              title="Change round-ups and recurring"
              onPress={handleChangeFunding}
            />
          </Box>
        </Box>
      </ScrollView>
    </LinearGradient>
  );
}

export default memo(Dashboard);
