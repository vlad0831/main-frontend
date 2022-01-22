import React, { memo, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import { AuthenticationStackParamList } from 'utils/types';
import { ScreenNames } from 'utils/enum';
import { Box, Button } from 'components/core';
import { useTheme } from 'theme';
import SplashSlide from './SplashSlide';
import { TextButton } from 'components/core';

const splashData = [
  {
    id: '1',
    name: 'Welcome to Allio!',
    description: 'The weatherproof finance app',
    copy: 'Invest through market storms using the strategies of the 1% with a platform built for you',
    type: 'type1',
    category: 'category1',
    order: 0,
    tag: ['tag'],
    asset: {
      id: '1',
      name: 'img1',
      description: 'background1',
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      url: require('./umbrella-rain.png') as number,
      tag: ['tag'],
    },
  },
  {
    id: '2',
    name: 'Welcome to Allio!',
    description: 'The weatherproof finance app',
    copy: `Invest through market storms using the strategies of the 1% with a platform ${' '}`,
    altCopy: 'built for you',
    type: 'type2',
    category: 'category2',
    order: 1,
    tag: ['tag'],
    asset: {
      id: '2',
      name: 'img2',
      description: 'background2',
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      url: require('./sunny-weather.png') as number,
      tag: ['tag'],
    },
  },
  {
    id: '3',
    name: 'Welcome to Allio!',
    description: 'The weatherproof finance app',
    copy: `Invest through market storms using the strategies of the 1% with a platform ${' '}`,
    altCopy: 'built for you',
    type: 'type3',
    category: 'category3',
    order: 2,
    tag: ['tag'],
    asset: {
      id: '3',
      name: 'img3',
      description: 'background3',
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      url: require('./windy-day.png') as number,
      tag: ['tag'],
    },
  },
  {
    id: '4',
    name: 'Welcome to Allio!',
    description: 'The weatherproof finance app',
    copy: `Invest through market storms using the strategies of the 1% with a platform ${' '}`,
    altCopy: 'built for you',
    type: 'type4',
    category: 'category4',
    order: 2,
    tag: ['tag'],
    asset: {
      id: '4',
      name: 'img4',
      description: 'background4',
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      url: require('./winter-day.png') as number,
      tag: ['tag'],
    },
  },
];

function GetStartedScreen({
  navigation,
}: StackScreenProps<AuthenticationStackParamList, ScreenNames.GetStarted>) {
  const theme = useTheme();

  const handleGetStarted = useCallback(() => {
    navigation.navigate(ScreenNames.Register);
  }, [navigation]);

  const handleLogin = useCallback(() => {
    navigation.navigate(ScreenNames.Login);
  }, [navigation]);

  return (
    <Box flex={1} backgroundColor={theme.colors.darkBlue}>
      <Box flex={1}>
        <Box marginTop={25}>
          <TextButton
            onPress={handleLogin}
            style={{ alignItems: 'flex-end', marginRight: 20, marginTop: 20 }}
          >
            Log in
          </TextButton>
        </Box>
        <Swiper
          loop
          autoplay
          dotStyle={{ width: 10, height: 10, marginLeft: 12 }}
          activeDotStyle={{ width: 10, height: 10, marginLeft: 12 }}
          dotColor="#34bff275"
          activeDotColor={theme.colors.blue}
        >
          {splashData.map((content) => (
            <Box key={content.id} flex={1} marginBottom={20}>
              <SplashSlide
                title={content.name}
                description={content.description}
                copy={content.copy}
                altCopy={content.altCopy}
                source={content.asset.url}
                swipeText="Swipe to learn more"
              />
            </Box>
          ))}
        </Swiper>
      </Box>
      <Box paddingX={30} paddingY={15}>
        <Button
          style={{ backgroundColor: theme.colors.purple, borderRadius: 10 }}
          title="Get Started"
          onPress={handleGetStarted}
          marginBottom={25}
        />
      </Box>
    </Box>
  );
}

export default memo(GetStartedScreen);
