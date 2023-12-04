"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLayoutDefaultTheme = void 0;
const tslib_1 = require("tslib");
/* eslint-disable valid-jsdoc */
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const constants_1 = require("../constants");
/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
const makeLayoutDefaultTheme = ({ override, } = {}) => {
    return (0, merge_1.default)(constants_1.DEFAULT_LAYOUT_THEME, override);
};
exports.makeLayoutDefaultTheme = makeLayoutDefaultTheme;
