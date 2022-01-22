import React, { memo, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';

function WeightSecurities({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.WeightSecurities>) {
  const handleConfirmWeights = useCallback(() => {
    navigation.navigate(ScreenNames.SetupBank);
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Button color="primary" title="Confirm Weights" onPress={handleConfirmWeights} />
      </Box>
    </LinearGradient>
  );
}

export default memo(WeightSecurities);
