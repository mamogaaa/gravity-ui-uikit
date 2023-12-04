"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../constants");
exports.LayoutContext = react_1.default.createContext({
    theme: constants_1.DEFAULT_LAYOUT_THEME,
    activeMediaQuery: 's',
});
