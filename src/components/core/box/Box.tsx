import styled from 'styled-components/native';
import { View, ViewProps } from 'react-native';
import {
  space,
  color,
  background,
  border,
  layout,
  flexbox,
  position,
  SpaceProps,
  ColorProps,
  BackgroundProps,
  BorderProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
} from 'styled-system';

export type BoxProps = ViewProps &
  SpaceProps &
  ColorProps &
  BackgroundProps &
  BorderProps &
  LayoutProps &
  FlexboxProps &
  PositionProps;

/**
 * `<Box>` wraps the `react-native.View` component
 * in our theme with `styled-system` props.
 * Use `Box` in place of the standard `View` component.
 */
export const Box = styled(View)<BoxProps>`
  ${space}
  ${color}
  ${background}
  ${border}
  ${layout}
  ${flexbox}
  ${position}
`;
