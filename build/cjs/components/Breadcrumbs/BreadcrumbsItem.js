"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Link_1 = require("../Link");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('breadcrumbs');
function Item({ data, isCurrent, isPrevCurrent, renderItem, }) {
    const { text, title, href, action } = data;
    const itemTitle = title || text;
    if (isPrevCurrent || !isCurrent) {
        return (react_1.default.createElement(Link_1.Link, { key: text, view: "secondary", href: href, title: itemTitle, onClick: action, className: b('item', { 'prev-current': isPrevCurrent }) }, renderItem ? renderItem(data, isCurrent, isPrevCurrent) : text));
    }
    return (react_1.default.createElement("div", { title: itemTitle, className: b('item', { current: true }) }, renderItem ? renderItem(data, isCurrent, isPrevCurrent) : text));
}
exports.BreadcrumbsItem = react_1.default.memo(Item);
exports.BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
