import React, { memo, useContext } from 'react';
import { Box, LinearGradient, Title } from 'components/core';
import CheckBox from 'components/CheckBox';
import { useAppSelector } from 'store/hook';
import { assetClassesSelector } from 'store/slices/onboardingSlice';
import { capitalise } from 'utils/helper';
import PortfolioContext from './PortfolioContext';

function Sectors() {
  const assetClasses = useAppSelector(assetClassesSelector);
  const { selectedSectors, onSectorChange } = useContext(PortfolioContext);

  return (
    <LinearGradient>
      <Box flex={1} paddingX="sm" paddingY="sm">
        <Title variant="section">
          Choose which exposures you want. You&apos;ll need to select at least 5 to keep your
          portfolio diverse!
        </Title>
        <Box flex={1} alignContent="center" justifyContent="center">
          {assetClasses.map((assetClass) => (
            <CheckBox
              key={assetClass.id}
              label={capitalise(assetClass.name)}
              checked={selectedSectors.has(assetClass.id)}
              onChange={() => onSectorChange(assetClass.id)}
            />
          ))}
        </Box>
      </Box>
    </LinearGradient>
  );
}

export default memo(Sectors);
