"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyOptions = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../../utils/cn");
const b = (0, cn_1.blockNew)('select-empty-placeholder');
const EmptyOptions = ({ renderEmptyOptions, filter }) => {
    return react_1.default.createElement("div", { className: b({ empty: !renderEmptyOptions }) }, renderEmptyOptions === null || renderEmptyOptions === void 0 ? void 0 : renderEmptyOptions({ filter }));
};
exports.EmptyOptions = EmptyOptions;
