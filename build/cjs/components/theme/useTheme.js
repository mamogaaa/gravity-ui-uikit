"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const ThemeContext_1 = require("./ThemeContext");
function useTheme() {
    const { theme } = react_1.default.useContext(ThemeContext_1.ThemeContext);
    return theme;
}
exports.useTheme = useTheme;
