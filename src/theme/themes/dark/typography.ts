import type { DefaultTheme } from 'styled-components';
import PickingService from 'services/picking';

const group = PickingService.forPlatform(
  {
    web: {
      sfProDisplay: 'SFProDisplay',
    },
    ios: {
      sfProDisplay: 'SFProDisplay',
    },
    android: {
      sfProDisplay: 'SF-Pro-Display',
    },
  },
  {
    sfProDisplay: 'SFProDisplay',
  },
);

const separator = PickingService.forPlatform(
  {
    web: {
      [group.sfProDisplay]: '-',
    },
    ios: {
      [group.sfProDisplay]: '-',
    },
    android: {
      [group.sfProDisplay]: '-',
    },
  },
  {
    [group.sfProDisplay]: '-',
  },
);

const style = {
  regular: 'Regular',
  medium: 'Medium',
  semiBold: 'Semibold',
  bold: 'Bold',
};

const typography: DefaultTheme['typography'] = {
  style,
  group,
  separator,
};

export default typography;
