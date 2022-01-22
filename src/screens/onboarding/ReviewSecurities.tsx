import React, { memo, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';

const DATA = ['F', 'Walmart', 'Amazon'];

function ReviewSecurities({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.ReviewSecurities>) {
  const handleChooseWeights = useCallback(() => {
    navigation.navigate(ScreenNames.WeightSecurities);
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section">You are adding:</Title>
        <ScrollView>
          {DATA.map((category) => (
            <Box flexDirection="row" key={category}>
              <Box marginX="xs" marginY="sm">
                <Button color="secondary" title={category} />
              </Box>
            </Box>
          ))}
        </ScrollView>
        <Button color="primary" title="Choose Weights" onPress={handleChooseWeights} />
      </Box>
    </LinearGradient>
  );
}

export default memo(ReviewSecurities);
