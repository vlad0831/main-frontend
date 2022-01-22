import React from 'react';

import { PieChartData } from '../types';
import { Text, Box } from '../../core';

import { Dot } from './styles';

/**
 * `<ChartKey>`
 */
export const ChartKey: React.FC<PieChartData> = ({ value, label, color, ...rest }) => {
  return (
    <Box flexDirection="row">
      <Dot size={8} background={color} />

      <Box marginLeft="xxs">
        <Text fontSize="value" textAlign="left" accessibilityLabel="Pie Chart Range Value">
          {value}
        </Text>
        <Text fontSize="body2" color="textGray">
          {label}
        </Text>
      </Box>
    </Box>
  );
};
