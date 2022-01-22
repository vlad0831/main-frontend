import React, { memo } from 'react';
import { Box } from 'components/core';
import Logo from 'components/Logo';
import { Text } from 'components/core';

function SplashScreen() {
  return (
    <Box
      backgroundColor="darkBlue"
      flex={1}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Logo />
      <Text fontSize="h3" color="white" marginTop={10}>
        The weatherproof finance app
      </Text>
    </Box>
  );
}

export default memo(SplashScreen);
