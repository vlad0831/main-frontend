import { themeGet } from '@styled-system/theme-get';

export const mapProps = (mapper: any) => {
  return (func: any) => {
    return (props: any) => {
      return func(mapper(props));
    };
  };
};

/**
 * Get a function that will return a color from the theme
 * when you pass it the props of your component.
 * @see https://styled-system.com/how-it-works#how-it-works
 * @see https://www.npmjs.com/package/@styled-system/theme-get
 *
 * @param key - The name of the color in the theme.
 * @return {function} A function that you can use
 * in a `styled-components` declaration.
 */
export const getColor = (key: string) => {
  return themeGet(`colors.${key}`);
};

/**
 * Get a function that will return a "metric" from the theme
 * when you pass it the props of your component.
 * @see https://styled-system.com/how-it-works#how-it-works
 * @see https://www.npmjs.com/package/@styled-system/theme-get
 *
 * @param key - The name of the metric in the theme.
 * @return {function} A function that you can use
 * in a `styled-components` declaration.
 */
export const getMetrics = (key: string) => {
  return themeGet(`metrics.${key}`);
};

/* istanbul ignore next */
/**
 * Get a function that will return a "space" from the theme
 * when you pass it the props of your component.
 * @see https://styled-system.com/how-it-works#how-it-works
 * @see https://www.npmjs.com/package/@styled-system/theme-get
 *
 * @param key - The name of the space/size in the theme.
 * @return {function} A function that you can use
 * in a `styled-components` declaration.
 */
export const getSpace = (key: string) => {
  return themeGet(`space.${key}`);
};

/* istanbul ignore next */
/**
 * Get a function that will return a radius from the theme
 * when you pass it the props of your component.
 * @see https://styled-system.com/how-it-works#how-it-works
 * @see https://www.npmjs.com/package/@styled-system/theme-get
 *
 * @param key - The name of the radius in the theme.
 * @return {function} A function that you can use
 * in a `styled-components` declaration.
 */
export const getRadii = (key: string) => {
  return themeGet(`radii.${key}`);
};

/**
 * Get a function that will return a font from the theme
 * when you pass it the props of your component.
 * @see https://styled-system.com/how-it-works#how-it-works
 * @see https://www.npmjs.com/package/@styled-system/theme-get
 *
 * @param key - The name of the font in the theme.
 * @return {function} A function that you can use
 * in a `styled-components` declaration.
 */
export function getTypography(key: string) {
  return themeGet(`typography.${key}`);
}

/* istanbul ignore next */
/**
 * Get a function that will return a font size from the theme
 * when you pass it the props of your component.
 * @see https://styled-system.com/how-it-works#how-it-works
 * @see https://www.npmjs.com/package/@styled-system/theme-get
 *
 * @param key - The name of the font size in the theme.
 * @return {function} A function that you can use
 * in a `styled-components` declaration.
 */
export const getFontSize = (key: string) => {
  return themeGet(`fontSizes.${key}`);
};
