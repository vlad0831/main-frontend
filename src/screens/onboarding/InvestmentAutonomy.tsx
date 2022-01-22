import React, { memo, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, TextButton, Title } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';

function InvestmentAutonomy({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.InvestmentAutonomy>) {
  const handleSelfDirected = useCallback(() => {
    navigation.navigate(ScreenNames.SelectSecurities);
  }, [navigation]);

  const handleManaged = useCallback(() => {
    navigation.navigate(ScreenNames.PassionateValues);
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="header" textAlign="center">
          Investing Your Way
        </Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          <Box flexDirection="row" paddingRight="sm">
            <Box marginY={20}>
              <Text fontSize={40}>☔</Text>
            </Box>
            <Box marginY={20}>
              <Text fontSize={22} marginX={20}>
                Personalized Weatherproof portfolios optimized and managed by us
              </Text>
            </Box>
          </Box>
          <Box flexDirection="row" paddingRight="sm">
            <Box marginY={20}>
              <Text fontSize={40}>📊</Text>
            </Box>
            <Box marginY={20}>
              <Text fontSize={22} marginX={20}>
                Build your own portfolio with over 5,000 available stocks and ETFs
              </Text>
            </Box>
          </Box>
          <Text fontSize={22} marginY={20}>
            Most people start with their Weatherproof portfolio. You can add your own investments
            later.
          </Text>
        </Box>
        <Button color="primary" title="Continue to Weatherproof" onPress={handleManaged} />
        <TextButton onPress={handleSelfDirected} marginY={20}>
          Skip this for now - pick my own investments
        </TextButton>
      </Box>
    </LinearGradient>
  );
}

export default memo(InvestmentAutonomy);
