import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      black: string;
      white: string;
      clear: string;
      overlay: string;
      lightGray: string;
      lightBlack: string;
      brandPink: string;
      pinkOverlay: string;
      textPrimary: string;
      textSecondary: string;
      textGray: string;
      primary: string;
      secondary: string;
      error: string;
      darkBlue: string;
      purple: string;
      blue: string;
      green: string;
      red: string;
      orange: string;
    };
    metrics: {
      screenWidth: number;
      screenHeight: number;
      statusBarHeight: number;
      statusBarUnsafeHeight: number;
      bottomSpace: number;
      appBarHeight: number;
    };
    typography: {
      style: {
        regular: string;
        medium: string;
        semiBold: string;
        bold: string;
      };
      group: {
        sfProDisplay: string;
      };
      separator: {
        [x: string]: string;
      };
    };
    space: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    radii: {
      xs: number;
      sm: number;
      md: number;
      xl: number;
    };
    fontSizes: {
      h1: number;
      h2: number;
      h3: number;
      subtitle1: number;
      subtitle2: number;
      body1: number;
      body2: number;
      label1: number;
      label2: number;
      label3: number;
      value: number;
    };
    lineHeights: {
      h1: number;
      h2: number;
      h3: number;
      subtitle1: number;
      subtitle2: number;
      body1: number;
      body2: number;
      label1: number;
      label2: number;
      label3: number;
      value: number;
    };
  }
}
