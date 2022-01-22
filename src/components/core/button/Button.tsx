import React, { useState, useCallback } from 'react';
import type { TouchableWithoutFeedbackProps } from 'react-native';
import type { SpaceProps } from 'styled-system';
import { Box } from '../box';
import { Title } from '../title';

import { Container, InnerBase } from './styles';

export interface ButtonProps extends TouchableWithoutFeedbackProps, SpaceProps {
  title: string;
  disabled?: boolean;
  onPress?: () => unknown;
  color?: 'primary' | 'secondary' | 'error';
}

export function Button({
  title,
  disabled = false,
  onPress = () => {},
  color,
  ...rest
}: ButtonProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, [setIsPressed]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, [setIsPressed]);

  return (
    <Box marginY={6} {...rest}>
      <Container
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <InnerBase isPressed={isPressed} isDisabled={disabled} color={color}>
          <Title variant="navigation" color={disabled ? 'textSecondary' : 'textPrimary'}>
            {title}
          </Title>
        </InnerBase>
      </Container>
    </Box>
  );
}
