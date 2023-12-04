"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsMore = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const DropdownMenu_1 = require("../DropdownMenu");
const Link_1 = require("../Link");
const cn_1 = require("../utils/cn");
const i18n_1 = tslib_1.__importDefault(require("./i18n"));
const b = (0, cn_1.block)('breadcrumbs');
function BreadcrumbsMore({ popupStyle, popupPlacement, items }) {
    return (react_1.default.createElement(DropdownMenu_1.DropdownMenu, { items: items, popupProps: {
            className: b('popup', {
                staircase: popupStyle === 'staircase',
            }),
            placement: popupPlacement,
        }, renderSwitcher: ({ onClick }) => (react_1.default.createElement(Link_1.Link, { view: "secondary", title: (0, i18n_1.default)('label_more'), className: b('item', { more: true }), onClick: onClick }, "...")) }));
}
exports.BreadcrumbsMore = BreadcrumbsMore;
BreadcrumbsMore.displayName = 'Breadcrumbs.More';
