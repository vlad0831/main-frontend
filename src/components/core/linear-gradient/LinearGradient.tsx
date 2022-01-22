import styled from 'styled-components/native';
import ReactNativeLinearGradient from 'react-native-linear-gradient';

export const LinearGradient = styled(ReactNativeLinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.purple, theme.colors.darkBlue],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))`
  flex: 1;
`;
