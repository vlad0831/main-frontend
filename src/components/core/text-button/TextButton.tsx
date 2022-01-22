import React from 'react';
import { SpaceProps } from 'styled-system';
import { TouchableWithoutFeedbackProps } from 'react-native';

import { Text } from '../text';

import { Container } from './styles';

export interface ITextButton extends TouchableWithoutFeedbackProps, SpaceProps {
  /**
   * Click handler.
   */
  onPress: () => void;

  /**
   * Children text.
   */
  children: string;

  /**
   * Button color.
   */
  color?: string;

  /**
   * Text style.
   */
  fontFamilyStyle?: string;

  /**
   * Text Size.
   */
  fontSize?: string;
}

/**
 * `<TextButton>` is a simple button component with text.
 */
export const TextButton: React.FC<ITextButton> = ({
  onPress,
  children,
  color,
  fontFamilyStyle = 'style.bold',
  fontSize = 'h3',
  ...rest
}) => {
  return (
    <Container onPress={onPress} accessibilityRole="button" {...rest}>
      <Text color={color} fontFamilyStyle={fontFamilyStyle} fontSize={fontSize} textAlign="center">
        {children}
      </Text>
    </Container>
  );
};
