import styled from 'styled-components/native';
import { LineChart as LineChartUI } from 'react-native-svg-charts';

import { getColor, getMetrics, getSpace } from 'theme';

import { Box, BoxProps } from '../../core';
import { ChartProps, GridProps } from '../types';
import { Grid as GridUI } from '../helpers';

export const Container = styled(Box)<BoxProps>`
  text-align: center;
  max-width: ${(props) => getMetrics('screenWidth')(props)}px;
`;

export const Body = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const LineChartView = styled(LineChartUI).attrs(
  ({ data, inset, strokeColor, strokeWidth, ...props }: ChartProps) => {
    const screenWidth = getMetrics('screenWidth')(props);
    const elementWidth = (screenWidth - getSpace('sm')(props) * 2 - 30) / (data ? data.length : 1);

    return {
      contentInset: {
        left: elementWidth / 2 + (inset || 0),
        right: elementWidth / 2 + (inset || 0),
        top: inset,
      },
      svg: {
        stroke: getColor(strokeColor || 'white')(props),
        strokeWidth,
      },
    };
  },
)<ChartProps>`
  flex: 1;
`;

/* istanbul ignore next */
export const Grid = styled(GridUI).attrs((props: GridProps) => ({
  strokeColor: getColor(props.strokeColor || 'white')(props),
  activeColor: getColor(props.activeColor || 'white')(props),
}))<GridProps>``;
