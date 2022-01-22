import styled from 'styled-components/native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { space, border, SpaceProps, BorderProps } from 'styled-system';

export const Container = styled(TouchableOpacity)<TouchableOpacityProps & BorderProps & SpaceProps>`
  ${space}
  ${border}
`;
