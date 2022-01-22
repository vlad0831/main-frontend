import { GridProps as GridPropsRN, AxisProps as AxisPropsRN } from 'react-native-svg-charts';

import { BoxProps } from '../core';

interface CommonChartProps {
  /**
   * Numeric value for for set visible space
   */
  inset?: number;
  /**
   * Stroke/border width of svg element
   */
  strokeWidth?: number;
  /**
   * Stroke/border color of svg element
   */
  strokeColor?: string;
}

export type ChartData = {
  value: number;
  label: string;
};

export type PieChartData = ChartData & {
  color?: string;
};

export type ProgressData = {
  progress: number;
};

export enum ChartType {
  Bar,
  Line,
  Pie,
}

export interface ChartProps extends BoxProps, CommonChartProps {
  /**
   * The title of the chart
   */
  title?: string;
  /**
   * height can be a number or string to speicify chart's height
   */
  height?: number;
  /**
   * Grid count under the chart
   */
  numberOfTicks?: number;
  /**
   * Chart color
   */
  fillColor?: string;
  /**
   * Grid line color
   */
  gridColor?: string;
  /**
   * Active index to specify current cursor line
   */
  activeGridIndex?: number | undefined;
  /**
   * Active grid color
   */
  activeGridColor?: string | undefined;
  /**
   * Number array from chart values
   */
  data?: Array<number>;
  /**
   * Total chart data given by user - pair of x-label, y-values
   */
  values?: Array<ChartData>;
  /**
   * Y axis label prefix
   */
  yAxisPrefix?: string;
}

export interface PieChartProps extends BoxProps {
  /**
   * The title of the chart
   */
  title?: string;
  /**
   * height can be a number or string to speicify chart's height
   */
  height?: number;
  /**
   * Chart data given by user
   */
  values?: Array<PieChartData>;
}

export interface DecoratorProps extends CommonChartProps {
  radius?: number;
  fill?: string;
  data?: Array<number>;
  x?: (value: number) => number;
  y?: (value: number) => number;
}

export interface GridProps extends GridPropsRN<number>, CommonChartProps {
  /**
   * Active index to specify current cursor line
   */
  activeIndex?: number;
  /**
   * Active grid color
   */
  activeColor?: string;
  /**
   * One of Bar | Pie | Line
   */
  type?: ChartType;
  /**
   * Total chart data given by user - pair of x-label, y-values
   */
  data?: Array<number>;
}

export interface AxisProps extends AxisPropsRN<number>, CommonChartProps {
  textSize?: 'label1' | 'label2' | 'label3';
  textColor?: string;
  layoutWidth?: number;
  layoutHeight?: number;
}
