import React from 'react';
import { block, blockNew } from '../utils/cn';
import { ThemeContext } from './ThemeContext';
import { ThemeSettingsContext } from './ThemeSettingsContext';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, DEFAULT_THEME, ROOT_CLASS_NAME } from './constants';
import { updateBodyClassName } from './updateBodyClassName';
import { useSystemTheme } from './useSystemTheme';
const b = block(ROOT_CLASS_NAME);
const bNew = blockNew(ROOT_CLASS_NAME);
export function ThemeProvider({ theme = DEFAULT_THEME, systemLightTheme = DEFAULT_LIGHT_THEME, systemDarkTheme = DEFAULT_DARK_THEME, nativeScrollbar = false, scoped = false, rootClassName = '', children, }) {
    const systemTheme = (useSystemTheme() === 'light' ? systemLightTheme : systemDarkTheme);
    const themeValue = theme === 'system' ? systemTheme : theme;
    React.useEffect(() => {
        if (!scoped) {
            updateBodyClassName(themeValue, { 'native-scrollbar': nativeScrollbar }, rootClassName);
        }
    }, [nativeScrollbar, themeValue, scoped, rootClassName]);
    const contextValue = React.useMemo(() => ({
        theme,
        themeValue,
    }), [theme, themeValue]);
    const themeSettingsContext = React.useMemo(() => ({ systemLightTheme, systemDarkTheme }), [systemLightTheme, systemDarkTheme]);
    return (React.createElement(ThemeContext.Provider, { value: contextValue },
        React.createElement(ThemeSettingsContext.Provider, { value: themeSettingsContext }, scoped ? (React.createElement("div", { className: bNew({ theme: themeValue, 'native-scrollbar': nativeScrollbar }, [
                b({ theme: themeValue, 'native-scrollbar': nativeScrollbar }),
                rootClassName,
            ]) }, children)) : (children))));
}
ThemeProvider.displayName = 'ThemeProvider';
