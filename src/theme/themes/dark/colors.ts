import type { DefaultTheme } from 'styled-components';

const colors: DefaultTheme['colors'] = {
  // System colors
  black: '#000000',
  white: '#FFFFFF',
  // blue: '#157DFB',
  clear: 'rgba(0, 0, 0, 0)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  lightGray: '#F4F4F5',
  lightBlack: '#111',

  // Brand colors
  brandPink: '#F44C7F',
  pinkOverlay: 'rgba(244, 76, 127, 0.1)', // #F44C7F<brandPink> to alpha 10%

  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#FFFFFF',
  textGray: '#8F94A2',

  primary: '#34BEF2',
  secondary: '#3CD695',
  error: '#E3615B',

  // Primary colors
  darkBlue: '#121625',
  purple: '#4D3ACC',
  blue: '#34BEF2',

  // Secondary colors
  green: '#3CD695',
  red: '#E3615B',
  orange: '#F88837',
};

export default colors;
