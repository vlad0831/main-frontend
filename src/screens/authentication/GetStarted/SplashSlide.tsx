import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from 'components/core';
import { ImageBackground } from 'components/core/box/ImageBackground';
import theme from 'theme/themes/dark';

interface SplashSlideProps {
  title: string;
  description: string;
  swipeText: string;
  copy?: string;
  altCopy?: string;
  source: number;
}

const styles = StyleSheet.create({
  hideText: {
    opacity: 0,
  },
});

const hiddenText =
  'Invest through market storms using the strategies of the 1% with a platform built for you';

export default function SplashSlide({
  title,
  description,
  copy,
  altCopy,
  swipeText,
  source,
}: SplashSlideProps): JSX.Element {
  return (
    <Box flex={1}>
      <ImageBackground
        flex={1}
        bottom={copy === hiddenText ? 80 : 20}
        alignItems="center"
        source={source}
        resizeMode="contain"
      ></ImageBackground>
      <Box bottom={75} marginLeft={20} width={280}>
        <Text color="white" fontSize="h1" fontWeight="800" marginBottom={10}>
          {title}
        </Text>
        <Text color="white" fontWeight="600" fontSize="h2">
          {description}
        </Text>
        <Text
          color="white"
          fontSize="h3"
          fontWeight="400"
          marginTop={30}
          style={copy === hiddenText && styles.hideText}
        >
          {copy}
          <Text color={theme.colors.green} fontSize="h3" fontWeight="600" marginTop={30}>
            {altCopy}
          </Text>
        </Text>
      </Box>
      <Box bottom={40} alignSelf="center">
        <Text color="gray" fontSize="h3" fontWeight="500">
          {swipeText}
        </Text>
      </Box>
    </Box>
  );
}
