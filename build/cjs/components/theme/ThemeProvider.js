"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const ThemeContext_1 = require("./ThemeContext");
const ThemeSettingsContext_1 = require("./ThemeSettingsContext");
const constants_1 = require("./constants");
const updateBodyClassName_1 = require("./updateBodyClassName");
const useSystemTheme_1 = require("./useSystemTheme");
const b = (0, cn_1.block)(constants_1.ROOT_CLASS_NAME);
const bNew = (0, cn_1.blockNew)(constants_1.ROOT_CLASS_NAME);
function ThemeProvider({ theme = constants_1.DEFAULT_THEME, systemLightTheme = constants_1.DEFAULT_LIGHT_THEME, systemDarkTheme = constants_1.DEFAULT_DARK_THEME, nativeScrollbar = false, scoped = false, rootClassName = '', children, }) {
    const systemTheme = ((0, useSystemTheme_1.useSystemTheme)() === 'light' ? systemLightTheme : systemDarkTheme);
    const themeValue = theme === 'system' ? systemTheme : theme;
    react_1.default.useEffect(() => {
        if (!scoped) {
            (0, updateBodyClassName_1.updateBodyClassName)(themeValue, { 'native-scrollbar': nativeScrollbar }, rootClassName);
        }
    }, [nativeScrollbar, themeValue, scoped, rootClassName]);
    const contextValue = react_1.default.useMemo(() => ({
        theme,
        themeValue,
    }), [theme, themeValue]);
    const themeSettingsContext = react_1.default.useMemo(() => ({ systemLightTheme, systemDarkTheme }), [systemLightTheme, systemDarkTheme]);
    return (react_1.default.createElement(ThemeContext_1.ThemeContext.Provider, { value: contextValue },
        react_1.default.createElement(ThemeSettingsContext_1.ThemeSettingsContext.Provider, { value: themeSettingsContext }, scoped ? (react_1.default.createElement("div", { className: bNew({ theme: themeValue, 'native-scrollbar': nativeScrollbar }, [
                b({ theme: themeValue, 'native-scrollbar': nativeScrollbar }),
                rootClassName,
            ]) }, children)) : (children))));
}
exports.ThemeProvider = ThemeProvider;
ThemeProvider.displayName = 'ThemeProvider';
