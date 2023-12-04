"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeSettings = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const ThemeSettingsContext_1 = require("./ThemeSettingsContext");
function useThemeSettings() {
    const settings = react_1.default.useContext(ThemeSettingsContext_1.ThemeSettingsContext);
    if (settings === undefined) {
        throw new Error('useThemeSettings must be used within ThemeProvider');
    }
    return settings;
}
exports.useThemeSettings = useThemeSettings;
