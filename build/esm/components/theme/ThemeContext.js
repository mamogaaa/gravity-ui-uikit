import React from 'react';
import { DEFAULT_LIGHT_THEME, DEFAULT_THEME } from './constants';
const initialValue = {
    theme: DEFAULT_THEME,
    themeValue: DEFAULT_LIGHT_THEME,
};
export const ThemeContext = React.createContext(initialValue);
ThemeContext.displayName = 'ThemeContext';
