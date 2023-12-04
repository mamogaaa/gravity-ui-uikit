"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsSeparator = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('breadcrumbs');
function BreadcrumbsSeparator({ renderItemDivider }) {
    return (react_1.default.createElement("div", { "aria-hidden": true, className: b('divider') }, renderItemDivider ? renderItemDivider() : '/'));
}
exports.BreadcrumbsSeparator = BreadcrumbsSeparator;
BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
