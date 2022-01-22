import React, { memo, useCallback, useMemo, useState } from 'react';
import { Switch } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text } from 'components/core';
import Dropdown from 'react-native-dropdown-enhanced';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import styled from 'styled-components/native';
import { getProjectedValue, numberWithCommas, Frequency } from 'utils/helper';

const HorizontalContainer = styled(Box).attrs({
  px: 'xs',
  pt: 'sm',
})`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

const recurringValues = Array(40)
  .fill(0)
  .map((_, index) => ({
    label: `$${5 * (index + 1)}`,
    value: 5 * (index + 1),
  }));

const recurringFrequencies: { label: string; value: Frequency }[] = [
  { label: 'per day', value: 'daily' },
  { label: 'per week', value: 'weekly' },
  { label: 'per month', value: 'monthly' },
];

function getDays(value: Frequency) {
  switch (value) {
    case 'daily':
      return [{ label: '', value: 0 }];
    case 'weekly':
      return [
        { label: 'Monday', value: 0 },
        { label: 'Tuesday', value: 1 },
        { label: 'Wednesday', value: 2 },
        { label: 'Thursday', value: 3 },
        { label: 'Friday', value: 4 },
        { label: 'Saturday', value: 5 },
        { label: 'Sunday', value: 6 },
      ];
    case 'monthly':
      return Array(31)
        .fill(0)
        .map((_, index) => ({
          label: `${index + 1}`,
          value: index,
        }));
    case 'yearly':
      return [{ label: '', value: 0 }];
  }
}

const initialTransactions = Array(40)
  .fill(0)
  .map((_, index) => ({
    label: `$${5 * (index + 1)}`,
    value: 5 * (index + 1),
  }));

function FundYourAccount({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.FundYourAccount>) {
  const [enableRoundUps, setEnableRoundUps] = useState(true);
  const [recurringValue, setRecurringValue] = useState(() => recurringValues[9]);
  const [recurringFrequency, setRecurringFrequency] = useState(() => recurringFrequencies[1]);
  const recurringDays = useMemo(() => getDays(recurringFrequency.value), [recurringFrequency]);
  const [recurringDay, setRecurringDay] = useState(() => recurringDays[0]);
  const [initialTransaction, setInitialTransaction] = useState(() => initialTransactions[9]);
  const [isUpdating, setIsUpdating] = useState(false);

  const projectedValue = getProjectedValue({
    initialAmount: initialTransaction.value,
    estimatedMonthlyRoundUps: enableRoundUps ? 4.23 : 0, // Made up value for roundups.
    recurringContribution: recurringValue.value,
    recurringFrequency: recurringFrequency.value,
    dailyInterest: 0.000261,
    period: 365,
  });

  const handleToggleRoundUps = useCallback(() => {
    setEnableRoundUps((enableRoundUps) => !enableRoundUps);
  }, []);

  const handleRecurringValueChange = useCallback(
    ({ label, value }: { label: string; value: number | string }) => {
      setRecurringValue({
        label,
        value: +value,
      });
    },
    [],
  );

  const handleRecurringFrequencyChange = useCallback(
    ({ label, value }: { label: string; value: number | string }) => {
      const newValue = `${value}` as Frequency;
      setRecurringFrequency({
        label,
        value: newValue,
      });
      const recurringDays = getDays(newValue);
      setRecurringDay(recurringDays[0]);
    },
    [],
  );

  const handleRecurringDayChange = useCallback(
    ({ label, value }: { label: string; value: number | string }) => {
      setRecurringDay({
        label,
        value: +value,
      });
    },
    [],
  );

  const handleInitialTransactionChange = useCallback(
    ({ label, value }: { label: string; value: number | string }) => {
      setInitialTransaction({
        label,
        value: +value,
      });
    },
    [],
  );

  const handleNavigate = useCallback(async () => {
    // TODO.
    setIsUpdating(true);

    // Fake waiting time for now.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsUpdating(false);

    navigation.dispatch(CommonActions.reset({ routes: [{ name: ScreenNames.Main }] }));
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <HorizontalContainer>
          <Text marginRight="sm" fontSize="h3" textAlign="left">
            Round ups
          </Text>
          <Switch onValueChange={handleToggleRoundUps} value={enableRoundUps} />
        </HorizontalContainer>
        <HorizontalContainer>
          <Text marginRight="sm" fontSize="h3" textAlign="left">
            Recurring
          </Text>
          <Dropdown
            style={{ backgroundColor: 'white', width: 80, borderRadius: 8 }}
            defaultLabel={recurringValue.label}
            defaultValue={recurringValue.value}
            data={recurringValues}
            onSelectedChange={handleRecurringValueChange}
          />
          <Dropdown
            style={{ backgroundColor: 'white', width: 130, borderRadius: 8 }}
            defaultLabel={recurringFrequency.label}
            defaultValue={recurringFrequency.value}
            data={recurringFrequencies}
            onSelectedChange={handleRecurringFrequencyChange}
          />
        </HorizontalContainer>
        <HorizontalContainer style={{ opacity: recurringFrequency.value === 'daily' ? 0 : 1 }}>
          <Text marginRight="sm" fontSize="h3" textAlign="left">
            {'         '}
          </Text>
          <Text
            style={{ width: 80 }}
            marginLeft="sm"
            marginRight="sm"
            fontSize="h3"
            textAlign="right"
          >
            on
          </Text>
          {recurringFrequency.value !== 'daily' && (
            <Dropdown
              key={recurringFrequency.value}
              style={{ backgroundColor: 'white', width: 130, borderRadius: 8 }}
              defaultLabel={recurringDay.label}
              defaultValue={recurringDay.value}
              data={recurringDays}
              onSelectedChange={handleRecurringDayChange}
            />
          )}
        </HorizontalContainer>
        <HorizontalContainer>
          <Text marginRight="sm" fontSize="h3" textAlign="left">
            One time
          </Text>
          <Dropdown
            style={{ backgroundColor: 'white', width: 80, borderRadius: 8 }}
            defaultLabel={initialTransaction.label}
            defaultValue={initialTransaction.value}
            data={initialTransactions}
            onSelectedChange={handleInitialTransactionChange}
          />
        </HorizontalContainer>
        <Box flex={1} alignContent="center" justifyContent="center">
          <Text marginTop="sm" marginBottom="sm" fontSize="h3" textAlign="center">
            With these settings, in a year your portfolio could be worth*
          </Text>
          <Text marginTop="sm" fontSize={64} textAlign="center">
            {`$${numberWithCommas(projectedValue.toFixed(2))}`}
          </Text>
        </Box>
        <Button color="primary" title="Confirm" onPress={handleNavigate} disabled={isUpdating} />
        <Text marginTop="sm" marginBottom="sm" textAlign="center">
          * assuming 10% annual investment returns and typical contribution from roundups.
        </Text>
      </Box>
    </LinearGradient>
  );
}

export default memo(FundYourAccount);
