"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sp = exports.spacing = void 0;
/* eslint-disable valid-jsdoc */
const cn_1 = require("../../utils/cn");
const utils_1 = require("../utils");
const b = (0, cn_1.block)('s');
/**
 * Utility to generate predefined css classes to describe position between components
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#spacing-utility
 */
const spacing = (props, className) => {
    const classes = [];
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const value = props[key];
            if (typeof value !== 'undefined') {
                classes.push(b(`${key}_${(0, utils_1.makeCssMod)(value)}`));
            }
        }
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
exports.spacing = spacing;
// alias
exports.sp = exports.spacing;
