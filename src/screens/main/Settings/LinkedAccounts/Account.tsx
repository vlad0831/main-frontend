import React, { memo, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text, Title } from 'components/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'theme';

interface Props {
  plaidLinkedItemId: string;
  title: string;
  subTitle: string;
  disabled?: boolean;
  onPress: (accountId: string) => unknown;
}

function Account({ plaidLinkedItemId, title, subTitle, disabled, onPress }: Props) {
  const theme = useTheme();

  const handlePress = useCallback(() => {
    onPress(plaidLinkedItemId);
  }, [plaidLinkedItemId, onPress]);

  return (
    <Box flex={1} flexDirection="row" marginY="sm" alignItems="center">
      <Box flex={1}>
        <Title variant="section" marginTop={0} marginBottom="sm">
          {title}
        </Title>
        <Text>{subTitle}</Text>
      </Box>
      <Box alignContent="center" alignItems="center">
        {disabled ? (
          <ActivityIndicator size="small" />
        ) : (
          <Icon
            name="delete"
            size={40}
            {...(disabled ? {} : { onPress: handlePress })}
            color={theme.colors.error}
          />
        )}
      </Box>
    </Box>
  );
}

export default memo(Account);
