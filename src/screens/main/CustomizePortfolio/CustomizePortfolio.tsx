import React, { memo, useCallback, useMemo, useState, Dispatch, SetStateAction } from 'react';
import {
  Alert,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button } from 'components/core';
import { MainStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { useTheme } from 'theme';
import { useAppSelector } from 'store/hook';
import {
  userInvestmentValuesSelector,
  userAssetClasssesSelector,
  portfolioSelector,
} from 'store/slices/onboardingSlice';
import { fetchUserPortfolio, setEquality } from 'utils/helper';
import PortfolioContext from './PortfolioContext';
import Values from './Values';
import Sectors from './Sectors';

const renderScene = SceneMap<
  StackScreenProps<MainStackParamList, ScreenNames.Values | ScreenNames.Sectors>
>({
  values: Values,
  sectors: Sectors,
});

function renderTabBar(setIndex: Dispatch<SetStateAction<number>>, colors: string[]) {
  return (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>;
    },
  ) => {
    const inputRange = props.navigationState.routes.map((_, index) => index);

    return (
      <View style={{ flexDirection: 'row' }}>
        {props.navigationState.routes.map((route, index) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === index ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              key={route.key}
              style={{
                backgroundColor: colors[index % colors.length],
                flex: 1,
                alignItems: 'center',
                padding: 16,
              }}
              onPress={() => setIndex(index)}
            >
              <Animated.Text style={{ opacity, fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
}

function CustomizePortfolio({
  navigation,
}: StackScreenProps<MainStackParamList, ScreenNames.CustomizePortfolio>) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [routes] = useState([
    { key: 'values', title: 'Values' },
    { key: 'sectors', title: 'Sectors' },
  ]);

  const originalPortfolio = useAppSelector(portfolioSelector);

  const userInvestmentValues = useAppSelector(userInvestmentValuesSelector);
  const [selectedValues, setSelectedValues] = useState(
    () => new Set(userInvestmentValues.map(({ id }) => id)),
  );

  const userAssetClasses = useAppSelector(userAssetClasssesSelector);
  const [selectedSectors, setSelectedSectors] = useState(
    () => new Set(userAssetClasses.map(({ id }) => id)),
  );

  const handleValueChange = useCallback((value: string) => {
    setSelectedValues((selectedValues) => {
      const newSelectedValues = new Set(selectedValues);

      if (selectedValues.has(value)) {
        newSelectedValues.delete(value);
      } else {
        newSelectedValues.add(value);
      }

      return newSelectedValues;
    });
  }, []);

  const handleSectorChange = useCallback((sector: string) => {
    setSelectedSectors((selectedSectors) => {
      const newSelectedSectors = new Set(selectedSectors);

      if (selectedSectors.has(sector)) {
        newSelectedSectors.delete(sector);
      } else {
        newSelectedSectors.add(sector);
      }

      return newSelectedSectors;
    });
  }, []);

  const handleReview = useCallback(async () => {
    try {
      const values = Array.from(selectedValues);
      const sectors = Array.from(selectedSectors);

      if (selectedSectors.size < 5) {
        Alert.alert('Please select at least 5 sectors before confirming.');
        return;
      }

      const originalValues = new Set(userInvestmentValues.map(({ id }) => id));
      const originalSectors = new Set(userAssetClasses.map(({ id }) => id));

      const hasNewSelection =
        !setEquality(originalValues, selectedValues) ||
        !setEquality(originalSectors, selectedSectors);

      setLoading(true);

      const portfolio = hasNewSelection
        ? await fetchUserPortfolio(sectors, values)
        : originalPortfolio;

      navigation.navigate(ScreenNames.ReviewPortfolio, {
        values,
        sectors,
        portfolio,
        changed: hasNewSelection,
      });
    } finally {
      setLoading(false);
    }
  }, [
    selectedValues,
    selectedSectors,
    userInvestmentValues,
    userAssetClasses,
    originalPortfolio,
    navigation,
  ]);

  const providerState = useMemo(
    () => ({
      selectedValues,
      selectedSectors,
      onValueChange: handleValueChange,
      onSectorChange: handleSectorChange,
    }),
    [selectedValues, selectedSectors, handleValueChange, handleSectorChange],
  );

  return (
    <Box flex={1} paddingBottom="sm" backgroundColor={theme.colors.darkBlue}>
      <Box flex={1}>
        <PortfolioContext.Provider value={providerState}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar(setIndex, [theme.colors.green, theme.colors.orange])}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </PortfolioContext.Provider>
      </Box>
      <Box paddingX="sm" backgroundColor={theme.colors.darkBlue}>
        <Button
          color="primary"
          title="Review Portfolio"
          onPress={handleReview}
          disabled={loading}
        />
        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      </Box>
    </Box>
  );
}

export default memo(CustomizePortfolio);
