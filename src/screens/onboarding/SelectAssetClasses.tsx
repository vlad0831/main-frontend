import React, { memo, useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import CheckBox from 'components/CheckBox';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  assetClassesSelector,
  setUserAssetClasses,
  userAssetClasssesSelector,
} from 'store/slices/onboardingSlice';
import { setEquality, saveUserAssetClasses, capitalise } from 'utils/helper';

function SelectAssetClasses({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.SelectAssetClasses>) {
  const dispatch = useAppDispatch();
  const assetClasses = useAppSelector(assetClassesSelector);
  const userAssetClasses = useAppSelector(userAssetClasssesSelector);
  const [selectedSet, setSelectedSet] = useState(
    () =>
      new Set(
        (userAssetClasses.length === 0 ? assetClasses : userAssetClasses).map(({ id }) => id),
      ),
  );
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((option: string) => {
    setSelectedSet((selectedSet) => {
      const newSelectedSet = new Set(selectedSet);

      if (selectedSet.has(option)) {
        newSelectedSet.delete(option);
      } else {
        newSelectedSet.add(option);
      }

      return newSelectedSet;
    });
  }, []);

  const handleNext = useCallback(async () => {
    if (selectedSet.size < 5) {
      Alert.alert('Please select at least 5 sectors before confirming.');
      return;
    }

    const originalSet = new Set(userAssetClasses.map(({ id }) => id));
    const hasNewSelection = !setEquality(originalSet, selectedSet);

    if (hasNewSelection) {
      try {
        setLoading(true);

        const userAssetClasses = Array.from(selectedSet);

        await saveUserAssetClasses(userAssetClasses);

        dispatch(setUserAssetClasses(userAssetClasses.map((id) => ({ id }))));
      } catch {
        Alert.alert('Failed to save the selection.');
        return;
      } finally {
        setLoading(false);
      }
    }

    navigation.navigate(ScreenNames.PortfolioAllocation, { lastUpdated: Date.now() });
  }, [selectedSet, userAssetClasses, navigation, dispatch]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section">Select Asset Classes</Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          {assetClasses.map((option) => (
            <CheckBox
              key={option.id}
              label={capitalise(option.name)}
              checked={selectedSet.has(option.id)}
              onChange={() => handleChange(option.id)}
            />
          ))}
        </Box>
        <Button color="primary" title="Confirm" onPress={handleNext} disabled={loading} />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      </Box>
    </LinearGradient>
  );
}

export default memo(SelectAssetClasses);
