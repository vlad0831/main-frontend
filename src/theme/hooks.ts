import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import type { DefaultTheme } from 'styled-components';

export function useTheme(): DefaultTheme {
  return useContext(ThemeContext);
}
