import React, { memo, useContext } from 'react';
import { Box, LinearGradient, Title } from 'components/core';
import CheckBox from 'components/CheckBox';
import { useAppSelector } from 'store/hook';
import { investmentValuesSelector } from 'store/slices/onboardingSlice';
import PortfolioContext from './PortfolioContext';

function Values() {
  const investmentValues = useAppSelector(investmentValuesSelector);
  const { selectedValues, onValueChange } = useContext(PortfolioContext);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section" marginBottom="sm">
          Are you passionate about any of these values?
        </Title>
        <Title variant="section">Please check as many as you&apos;d like.</Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          {investmentValues.map((investmentValue) => (
            <CheckBox
              key={investmentValue.id}
              label={investmentValue.description}
              checked={selectedValues.has(investmentValue.id)}
              onChange={() => onValueChange(investmentValue.id)}
            />
          ))}
        </Box>
      </Box>
    </LinearGradient>
  );
}

export default memo(Values);
