import {
  ImageBackground as RNImageBackground,
  ImageBackgroundProps as RNImageBackgroundProps,
} from 'react-native';
import styled from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

export type ImageBackgroundProps = RNImageBackgroundProps &
  SpaceProps &
  ColorProps &
  BackgroundProps &
  BorderProps &
  LayoutProps &
  FlexboxProps &
  PositionProps;

export const ImageBackground = styled(RNImageBackground)<ImageBackgroundProps>`
  ${space}
  ${color}
  ${background}
  ${border}
  ${layout}
  ${flexbox}
  ${position}
`;
