"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeType = void 0;
const getThemeType_1 = require("./getThemeType");
const useThemeValue_1 = require("./useThemeValue");
function useThemeType() {
    const themeValue = (0, useThemeValue_1.useThemeValue)();
    return (0, getThemeType_1.getThemeType)(themeValue);
}
exports.useThemeType = useThemeType;
