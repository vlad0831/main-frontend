import React, { useCallback, memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, LinearGradient, Title } from 'components/core';
import Input from 'components/Input';
import { OnboardingStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';

const DATA = [
  {
    title: 'Women-Led',
    data: ['GM', 'Spanx', 'Theranos'],
  },
  {
    title: 'Clean Water',
    data: ['Exxon', 'Aquafina', 'Frack Co.'],
  },
  {
    title: 'Spirtual',
    data: ['Smith & Wesson', 'Yankee Candle Co', 'Incensed'],
  },
  {
    title: 'Union Friendly',
    data: ['F', 'Walmart', 'Amazon'],
  },
];

function SelectSecurities({
  navigation,
}: StackScreenProps<OnboardingStackParamList, ScreenNames.SelectSecurities>) {
  const handleReview = useCallback(() => {
    navigation.navigate(ScreenNames.ReviewSecurities);
  }, [navigation]);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Box flexDirection="row">
          <Box flex={1} marginRight="sm">
            <Input placeholder="Search for 5,000+ stocks, ETFs" />
          </Box>
          <Button color="primary" title="Go" />
        </Box>
        <ScrollView>
          {DATA.map((category) => (
            <Box key={category.title}>
              <Box marginY="sm">
                <Title variant="section">{category.title}</Title>
              </Box>
              <Box flexDirection="row">
                {category.data.map((ticker) => (
                  <Box marginX="xs" key={ticker}>
                    <Button color="secondary" title={ticker} />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </ScrollView>
        <Title variant="body" textAlign="center" marginBottom="sm">
          COUNT assets selected
        </Title>
        <Button color="primary" title="Review" onPress={handleReview} />
      </Box>
    </LinearGradient>
  );
}

export default memo(SelectSecurities);
