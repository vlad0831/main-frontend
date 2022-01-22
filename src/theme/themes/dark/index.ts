import type { DefaultTheme } from 'styled-components';
import colors from './colors';
import metrics from './metrics';
import space from './spaces';
import radii from './radiis';
import typography from './typography';
import fontSizes from './fontSizes';
import lineHeights from './lineHeights';

const theme: DefaultTheme = {
  name: 'Allio dark theme',
  colors,
  metrics,
  typography,
  space,
  radii,
  fontSizes,
  lineHeights,
};

export default theme;
