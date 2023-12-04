"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("./constants");
const initialValue = {
    theme: constants_1.DEFAULT_THEME,
    themeValue: constants_1.DEFAULT_LIGHT_THEME,
};
exports.ThemeContext = react_1.default.createContext(initialValue);
exports.ThemeContext.displayName = 'ThemeContext';
