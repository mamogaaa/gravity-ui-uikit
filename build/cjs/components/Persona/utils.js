"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwoLetters = exports.extractTextView = exports.extractTextValue = void 0;
const tslib_1 = require("tslib");
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const extractTextValue = (text = '') => {
    if (text && typeof text === 'object') {
        return text.value;
    }
    return text;
};
exports.extractTextValue = extractTextValue;
const extractTextView = (text = '') => {
    if (text && typeof text === 'object') {
        return text.content;
    }
    return text;
};
exports.extractTextView = extractTextView;
function getTwoLetters(text) {
    const words = text.split(' ');
    return [(0, get_1.default)(words, '[0][0]'), (0, get_1.default)(words, '[1][0]')].filter(Boolean).join('');
}
exports.getTwoLetters = getTwoLetters;
