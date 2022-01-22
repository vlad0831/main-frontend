import { fontFamily } from 'styled-system';

import join from 'lodash/join';

import { getTypography, mapProps } from './helpers';

interface Props {
  fontFamilyGroup?: string;
  fontFamilyStyle?: string;
}

export const fontFamilyComposite = mapProps((props: Props) => {
  const fGroup = getTypography(props.fontFamilyGroup)(props);
  const fStyle = getTypography(props.fontFamilyStyle)(props);
  const fSeparator = getTypography(`separator.${fGroup}`)(props);

  /* istanbul ignore next */
  if (!fGroup || !fStyle) {
    return props;
  }

  return {
    fontFamily: join([fGroup, fStyle], fSeparator),
    ...props,
  };
})(fontFamily);
