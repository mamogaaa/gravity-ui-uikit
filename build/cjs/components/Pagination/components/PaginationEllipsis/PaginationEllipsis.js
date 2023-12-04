"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationEllipsis = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../../utils/cn");
const b = (0, cn_1.blockNew)('pagination-ellipsis');
const PaginationEllipsis = ({ size, className }) => {
    return react_1.default.createElement("div", { className: b({ size }, className) }, "...");
};
exports.PaginationEllipsis = PaginationEllipsis;
