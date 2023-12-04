"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPageOf = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../../utils/cn");
const i18n_1 = tslib_1.__importDefault(require("../../i18n"));
const b = (0, cn_1.blockNew)('pagination-page-of');
const PaginationPageOf = ({ size, className }) => {
    return react_1.default.createElement("div", { className: b({ size }, className) }, (0, i18n_1.default)('label_page-of'));
};
exports.PaginationPageOf = PaginationPageOf;
