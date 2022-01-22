import styled from 'styled-components/native';

import { getMetrics } from 'theme';

import { Box, BoxProps } from '../../core';

interface DotProps extends BoxProps {
  size: number;
}

export const Container = styled(Box).attrs({
  p: 'sm',
})<BoxProps>`
  text-align: center;
  max-width: ${(props) => getMetrics('screenWidth')(props)}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ChartView = styled(Box)<BoxProps>`
  position: relative;
`;

export const Overview = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChartInfo = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Meta = styled(Box).attrs({
  p: 'sm',
})<BoxProps>`
  max-width: 130px;
`;

export const Dot = styled(Box).attrs((props: DotProps) => ({
  width: props.size,
  height: props.size,
  borderRadius: props.size / 2,
}))<DotProps>``;
