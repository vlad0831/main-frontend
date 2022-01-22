import styled from 'styled-components';
import React from 'react';
import { G, Line } from 'react-native-svg';
import { XAxis as XAxisUI, YAxis as YAxisUI } from 'react-native-svg-charts';

import { getMetrics, getSpace, getFontSize, getColor } from 'theme';

import { GridProps, AxisProps, ChartType } from './types';

export const Grid = ({
  x,
  y,
  data = [],
  ticks,
  strokeColor,
  activeIndex,
  activeColor,
  direction = 'BOTH',
  type = ChartType.Line,
}: GridProps) => {
  const xSpace = (x(1) - x(0)) / 2;
  return (
    <G>
      {(direction === 'HORIZONTAL' || direction === 'BOTH') &&
        !!ticks &&
        ticks.map((tick: number) => (
          <Line
            key={tick}
            x1={10}
            x2="100%"
            y1={y(tick)}
            y2={y(tick)}
            stroke={strokeColor}
            transform="translate(-5, 0)"
          />
        ))}

      {(direction === 'VERTICAL' || direction === 'BOTH') && (
        <>
          {data.map((value: number, index: number) => (
            <Line
              key={index}
              y1="0%"
              y2="100%"
              x1={x(index) - (type === ChartType.Line ? xSpace : 0)}
              x2={x(index) - (type === ChartType.Line ? xSpace : 0)}
              transform="translate(0, 5)"
              stroke={strokeColor}
              strokeDasharray={index === 0 ? 0 : 4}
            />
          ))}
          <Line
            key={data.length}
            y1="0%"
            y2="100%"
            x1={
              type === ChartType.Line
                ? x(data.length - 1) + xSpace
                : x(data.length - 1) + xSpace * 2
            }
            x2={
              type === ChartType.Line
                ? x(data.length - 1) + xSpace
                : x(data.length - 1) + xSpace * 2
            }
            transform="translate(0, 5)"
            stroke={strokeColor}
          />
          {activeIndex !== undefined && (
            <Line
              key="active-line"
              y1="0%"
              y2="100%"
              x1={x(activeIndex)}
              x2={x(activeIndex)}
              transform="translate(0, 5)"
              stroke={activeColor || strokeColor}
            />
          )}
        </>
      )}
    </G>
  );
};

export const XAxis = styled(XAxisUI).attrs(
  ({ data, inset, textSize, textColor, layoutWidth, ...props }: AxisProps) => {
    layoutWidth = layoutWidth || getMetrics('screenWidth')(props);
    const elementWidth = (layoutWidth - getSpace('sm')(props) * 2 - 30) / data.length;

    return {
      contentInset: {
        left: elementWidth * 0.5 + inset,
        right: elementWidth * 0.5 + inset,
      },
      svg: {
        fontSize: getFontSize(textSize || 'label2')(props),
        fill: getColor(textColor || 'textSecondary')(props),
      },
    };
  },
)<AxisProps>`
  margin-top: ${(props) => props.inset}px;
  height: ${(props) => props.inset * 3}px;
`;

export const YAxis = styled(YAxisUI).attrs(
  ({ data, inset, textSize, textColor, ...props }: AxisProps) => ({
    style: { width: 30 },
    contentInset: {
      top: inset,
      bottom: inset * 2,
    },
    svg: {
      fontSize: getFontSize(textSize || 'label2')(props),
      fill: getColor(textColor || 'textSecondary')(props),
    },
  }),
)<AxisProps>`
  width: 30px;
  margin-bottom: ${(props) => props.inset * 3}px;
`;

export function getMaxValue(numbers: Array<number>): number {
  const maxValue = Math.max(...numbers);
  const digits = Math.floor(Math.log10(maxValue));
  const units = Math.pow(10, digits);

  return Math.ceil(maxValue / units) * units;
}
