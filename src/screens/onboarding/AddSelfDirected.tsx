import React, { memo, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Text, Title } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';

function AddSelfDirected({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.AddSelfDirected>) {
  const handleCustom = useCallback(() => {
    navigation.navigate(ScreenNames.SelectSecurities);
  }, [navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate(ScreenNames.KnowYourCustomer);
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="header" textAlign="center">
          Nice work, Your weatherproof portfolio is ready!
        </Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          <Text fontSize={22} textAlign="center">
            Allio manages this portfolio for you.
          </Text>
          <Text fontSize={22} textAlign="center">
            Do you want to add your own stocks and ETFs from over 5,000 available?
          </Text>
        </Box>
        <Button color="primary" title="Choose stocks & ETFs to add now" onPress={handleCustom} />
        <Button color="secondary" title="Maybe later" onPress={handleSkip} />
      </Box>
    </LinearGradient>
  );
}

export default memo(AddSelfDirected);
