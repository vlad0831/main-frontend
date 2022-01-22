import React from 'react';
import { Text as TextRN, TextProps as TextRNProps } from 'react-native';
import styled from 'styled-components/native';
import {
  space,
  color as colorStyle,
  typography,
  layout,
  flexbox,
  position,
  lineHeight,
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  LineHeightProps,
} from 'styled-system';

import { fontFamilyComposite } from 'theme';

export interface TextProps
  extends TextRNProps,
    SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    FlexboxProps,
    PositionProps,
    LineHeightProps {
  allowFontScaling?: boolean;
  bg?: string;
  color?: string;
  fontFamilyGroup?: string;
  fontFamilyStyle?: string;
  fontSize?: string | number;
}

const StyledText = styled(TextRN)<TextProps>`
  ${space}
  ${colorStyle}
  ${typography}
  ${layout}
  ${lineHeight}
  ${flexbox}
  ${position}
  ${fontFamilyComposite}
`;

/**
 * `<Text>` is the generic component you can use to
 * display text using any styles from our theme.
 */
const Text: React.FC<TextProps> = ({
  allowFontScaling = false,
  bg = 'clear',
  color = 'textPrimary',
  fontFamilyGroup = 'group.sfProDisplay',
  fontFamilyStyle = 'style.regular',
  fontSize = 'body1',
  ...rest
}) => (
  <StyledText
    allowFontScaling={allowFontScaling}
    bg={bg}
    color={color}
    fontFamilyGroup={fontFamilyGroup}
    fontFamilyStyle={fontFamilyStyle}
    fontSize={fontSize}
    {...rest}
  />
);

export { Text };
