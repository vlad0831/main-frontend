import styled, { css } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { space } from 'styled-system';

import { Box, BoxProps } from '../box';

type ButtonProps = {
  isPressed: boolean;
  isDisabled: boolean;
  color?: 'primary' | 'secondary' | 'error';
};

export const Container = styled(TouchableWithoutFeedback)`
  height: 50px;
  justify-content: center;

  ${space}
`;

export const InnerBase = styled(Box).attrs(() => ({
  px: 'sm',
  borderRadius: 'sm',
  borderWidth: 0,
}))<BoxProps & ButtonProps>`
  height: 50px;
  justify-content: center;
  align-items: center;

  background-color: ${({ color, theme }) => (color ? theme.colors[color] : 'transparent')};

  ${(props) => {
    return css`
      opacity: ${props.isPressed ? 0.4 : 1};
    `;
  }}
`;
