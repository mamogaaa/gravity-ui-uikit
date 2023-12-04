import React from 'react';
import type { RealTheme, Theme } from './types';
export interface ThemeContextProps {
    theme: Theme;
    themeValue: RealTheme;
}
export declare const ThemeContext: React.Context<ThemeContextProps>;
