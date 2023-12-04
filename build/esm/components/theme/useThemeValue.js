import React from 'react';
import { ThemeContext } from './ThemeContext';
export function useThemeValue() {
    const { themeValue } = React.useContext(ThemeContext);
    return themeValue;
}
