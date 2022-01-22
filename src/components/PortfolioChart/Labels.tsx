import React from 'react';
import { Text } from 'react-native-svg';

interface Props {
  slices?: {
    data: { asset: string; weight: number };
    labelCentroid: [number, number];
    pieCentroid: [number, number];
  }[];
}

export default function Labels({ slices = [] }: Props): JSX.Element {
  return (
    <>
      {slices.map((slice, index) => {
        const { pieCentroid, data } = slice;
        const [x, y] = pieCentroid;

        return (
          <Text
            key={index}
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={16}
            fontWeight="bold"
            stroke="white"
            strokeWidth={0.2}
          >
            {data.asset}
          </Text>
        );
      })}
    </>
  );
}
