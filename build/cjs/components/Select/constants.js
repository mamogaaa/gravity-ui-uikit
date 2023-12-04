"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectQa = exports.DEFAULT_VIRTUALIZATION_THRESHOLD = exports.QUICK_SEARCH_TIMEOUT = exports.POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE = exports.BORDER_WIDTH = exports.GROUP_ITEM_MARGIN_TOP = exports.MOBILE_ITEM_HEIGHT = exports.SIZE_TO_ITEM_HEIGHT = exports.selectClearBlock = exports.selectListBlock = exports.selectControlButtonBlock = exports.selectControlBlock = exports.selectBlock = void 0;
const cn_1 = require("../utils/cn");
exports.selectBlock = (0, cn_1.blockNew)('select');
exports.selectControlBlock = (0, cn_1.blockNew)('select-control');
exports.selectControlButtonBlock = (0, cn_1.blockNew)('select-control__button');
exports.selectListBlock = (0, cn_1.blockNew)('select-list');
exports.selectClearBlock = (0, cn_1.blockNew)('select-clear');
exports.SIZE_TO_ITEM_HEIGHT = {
    s: 28,
    m: 28,
    l: 32,
    xl: 36,
};
exports.MOBILE_ITEM_HEIGHT = 32;
exports.GROUP_ITEM_MARGIN_TOP = 5;
exports.BORDER_WIDTH = 1;
exports.POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE = 100;
exports.QUICK_SEARCH_TIMEOUT = 2000;
exports.DEFAULT_VIRTUALIZATION_THRESHOLD = 50;
exports.SelectQa = {
    LIST: 'select-list',
    POPUP: 'select-popup',
    SHEET: 'select-sheet',
    CLEAR: 'select-clear',
};
