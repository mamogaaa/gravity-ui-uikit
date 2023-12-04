"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toc = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const TocItem_1 = require("./TocItem/TocItem");
const b = (0, cn_1.blockNew)('toc');
exports.Toc = react_1.default.forwardRef(function Toc(props, ref) {
    const { value: activeValue, items, className, onUpdate, qa } = props;
    return (react_1.default.createElement("nav", { className: b(null, className), ref: ref, "data-qa": qa },
        react_1.default.createElement("ul", { className: b('sections') }, items.map(({ value, content, href, items: childrenItems }) => (react_1.default.createElement("li", { key: value !== null && value !== void 0 ? value : href },
            react_1.default.createElement(TocItem_1.TocItem, { content: content, value: value, href: href, active: activeValue === value, onClick: onUpdate }),
            (childrenItems === null || childrenItems === void 0 ? void 0 : childrenItems.length) && (react_1.default.createElement("ul", { className: b('subsections') }, childrenItems === null || childrenItems === void 0 ? void 0 : childrenItems.map(({ value: childrenValue, content: childrenContent, href: childrenHref, }) => (react_1.default.createElement("li", { key: childrenValue !== null && childrenValue !== void 0 ? childrenValue : childrenHref },
                react_1.default.createElement(TocItem_1.TocItem, { content: childrenContent, value: childrenValue, href: childrenHref, childItem: true, active: activeValue === childrenValue, onClick: onUpdate }))))))))))));
});
