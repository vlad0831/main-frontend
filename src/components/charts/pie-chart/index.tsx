import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { PieChart as PieChartView } from 'react-native-svg-charts';
import { useTheme } from 'theme';

import { PieChartProps, PieChartData } from '../types';
import { Title, Text } from '../../core';

import { ChartKey } from './ChartKey';
import { Container, Overview, ChartView, ChartInfo, Meta } from './styles';

/**
 * `<PieChart>`
 */
export const PieChart: React.FC<PieChartProps> = ({
  title,
  height = 250,
  values = [],
  ...rest
}) => {
  const theme = useTheme();
  const [containerWidth, setContainerWidth] = useState<number>(theme.metrics.screenWidth);
  const max = values.reduce((acc: number, value: PieChartData) => acc + value.value, 0);
  const pieData = values.map((value: PieChartData, index: number) => ({
    ...value,
    key: index,
    svg: { fill: value.color },
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <Container onLayout={handleLayout}>
      <ChartView>
        <PieChartView
          style={{ width: Number(height), height: Number(height) }}
          data={pieData}
          innerRadius={height * 0.3}
          padAngle={0}
        />

        <Overview>
          <Title variant="header" accessibilityLabel="Pie Chart Total Value">
            {max}
          </Title>

          {title && (
            <Text color="textGray" fontSize="body2" accessibilityLabel="Pie Chart Title">
              {title.toUpperCase()}
            </Text>
          )}
        </Overview>
      </ChartView>

      <ChartInfo>
        {values.map((value: PieChartData, index: number) => (
          <Meta width={(containerWidth - theme.space.sm * 2) / 3} key={`info-${index}`}>
            <ChartKey {...value} />
          </Meta>
        ))}
      </ChartInfo>
    </Container>
  );
};
