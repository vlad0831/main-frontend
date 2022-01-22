import { Dimensions } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import type { DefaultTheme } from 'styled-components';

const windowSize = Dimensions.get('window');
const width = windowSize.width || 375;
const height = windowSize.height || 812;

const STATUS_BAR_HEIGHT = getStatusBarHeight(true);
const STATUS_BAR_UNSAFE_HEIGHT = getStatusBarHeight();
const BOTTOM_SPACE = getBottomSpace();

const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;

const metrics: DefaultTheme['metrics'] = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,

  statusBarHeight: STATUS_BAR_HEIGHT,
  statusBarUnsafeHeight: STATUS_BAR_UNSAFE_HEIGHT,
  bottomSpace: BOTTOM_SPACE,

  appBarHeight: 60,
};

export default metrics;
