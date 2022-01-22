import React, { memo, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import PortfolioChart from 'components/PortfolioChart';
import { useAppDispatch } from 'store/hook';
import {
  setUserAssetClasses,
  setPortfolio,
  setUserInvestmentValues,
} from 'store/slices/onboardingSlice';
import { MainStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { convertInstrumentsToAssetClasses, savePortfolioPreferences } from 'utils/helper';

function ReviewPortfolio({
  navigation,
  route,
}: StackScreenProps<MainStackParamList, ScreenNames.ReviewPortfolio>) {
  const { values, sectors, portfolio, changed } = route.params;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (!changed) {
      navigation.navigate(ScreenNames.Dashboard);
      return;
    }

    try {
      setLoading(true);

      await savePortfolioPreferences(values, sectors);

      dispatch(setUserInvestmentValues(values.map((id) => ({ id }))));
      dispatch(setUserAssetClasses(sectors.map((id) => ({ id }))));
      dispatch(setPortfolio(portfolio));
    } catch {
      return;
    } finally {
      setLoading(false);
    }

    navigation.navigate(ScreenNames.Dashboard);
  }, [changed, dispatch, navigation, portfolio, sectors, values]);

  const assetClassPortfolio = useMemo(
    () => convertInstrumentsToAssetClasses(portfolio),
    [portfolio],
  );

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section">Here is your portfolio!</Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          <PortfolioChart data={assetClassPortfolio || []} />
        </Box>
        <Button color="primary" title="Looks great!" onPress={handleConfirm} disabled={loading} />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      </Box>
    </LinearGradient>
  );
}

export default memo(ReviewPortfolio);
