import React, { memo } from 'react';
import { PieChart } from 'react-native-svg-charts';
import Labels from './Labels';

interface Props {
  data: {
    id: string;
    asset: string;
    weight: number;
  }[];
}

const colors = ['#E3615B', '#F88837', '#3CD695', '#34BEF2'];

function PortfolioChart({ data }: Props) {
  const pieData = data.map(({ id, asset, weight }, index) => ({
    key: id,
    asset,
    weight,
    svg: { fill: colors[index % colors.length] },
    arc: {
      outerRadius: '100%',
      padAngle: 0.02,
    },
  }));

  return (
    <PieChart
      style={{ height: 500 }}
      valueAccessor={({ item }) => item.weight}
      data={pieData}
      labelRadius="90%"
    >
      <Labels />
    </PieChart>
  );
}

export default memo(PortfolioChart);
