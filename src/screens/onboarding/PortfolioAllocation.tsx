import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import PortfolioChart from 'components/PortfolioChart';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  assetClassesSelector,
  userAssetClasssesSelector,
  portfolioSelector,
  setUserAssetClasses,
  setPortfolio,
} from 'store/slices/onboardingSlice';
import {
  fetchUserPortfolio,
  convertInstrumentsToAssetClasses,
  saveUserAssetClasses,
} from 'utils/helper';

function PortfolioAllocation({
  navigation,
  route,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.PortfolioAllocation>) {
  const dispatch = useAppDispatch();
  const assetClasses = useAppSelector(assetClassesSelector);
  const userAssetClasses = useAppSelector(userAssetClasssesSelector);
  const portfolio = useAppSelector(portfolioSelector);
  const { lastUpdated } = route.params;
  const [loading, setLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (userAssetClasses.length === 0) {
      try {
        setLoading(true);

        const userAssetClasses = assetClasses.map(({ id }) => id);

        await saveUserAssetClasses(userAssetClasses);

        dispatch(setUserAssetClasses(userAssetClasses.map((id) => ({ id }))));
      } catch {
        Alert.alert('Failed to save the selection.');
        return;
      } finally {
        setLoading(false);
      }
    }

    navigation.navigate(ScreenNames.AddSelfDirected);
  }, [assetClasses, dispatch, navigation, userAssetClasses.length]);

  const handleAdjust = useCallback(() => {
    navigation.navigate(ScreenNames.SelectAssetClasses);
  }, [navigation]);

  const getRecommendedPortfolio = useCallback(async () => {
    try {
      const portfolio = await fetchUserPortfolio(
        userAssetClasses.length === 0 ? assetClasses.map(({ id }) => id) : undefined,
      );
      dispatch(setPortfolio(portfolio));
    } catch (error) {
      console.log({ error });
    }
  }, [dispatch]);

  useEffect(() => {
    getRecommendedPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdated]);

  const assetClassPortfolio = useMemo(
    () => convertInstrumentsToAssetClasses(portfolio),
    [portfolio],
  );

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section">Portfolio Allocation Recommendation</Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          <PortfolioChart data={assetClassPortfolio || []} />
        </Box>
        <Button
          color="primary"
          title="Looks great, Continue!"
          onPress={handleConfirm}
          disabled={loading}
        />
        <Button
          color="secondary"
          title="Adjust my allocations"
          onPress={handleAdjust}
          disabled={loading}
        />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      </Box>
    </LinearGradient>
  );
}

export default memo(PortfolioAllocation);
