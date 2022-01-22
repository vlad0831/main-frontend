import React from 'react';

import { Text, TextProps } from '../text';

export interface ITitle extends TextProps {
  variant?: 'navigation' | 'header' | 'section' | 'body';
}

const Title: React.FC<ITitle> = ({ variant = 'body', ...rest }) => {
  let size = 'h3';
  let style = 'style.bold';
  const family = 'group.sfProDisplay';

  switch (variant) {
    // This is just for the placeholder.
    // Will be changed later
    case 'header':
      size = 'h1';
      break;
    case 'section':
      size = 'h2';
      break;
    case 'navigation':
      size = 'h3';
      break;
    case 'body':
    default:
      style = 'style.regular';
      break;
  }

  return <Text fontSize={size} fontFamilyGroup={family} fontFamilyStyle={style} {...rest} />;
};

export { Title };
