"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const mobile_1 = require("../mobile");
const cn_1 = require("../utils/cn");
const components_1 = require("./components");
const usePagination_1 = require("./hooks/usePagination");
const b = (0, cn_1.blockNew)('pagination');
const Pagination = ({ page, pageSize, total, onUpdate, compact: propCompact = true, pageSizeOptions, showPages = true, showInput = false, className, }) => {
    const [mobile] = (0, mobile_1.useMobile)();
    const size = mobile ? 'l' : 'm';
    const compact = mobile ? true : propCompact;
    const { items, numberOfPages } = (0, usePagination_1.usePagination)({ page, pageSize, total, mobile });
    const pagination = items
        .map((item) => {
        switch (item.type) {
            case 'page':
                return (showPages && (react_1.default.createElement(components_1.PaginationPage, { key: item.key, size: size, pageSize: pageSize, item: item, onUpdate: onUpdate, className: b('pagination-item') })));
            case 'ellipsis':
                return (showPages && (react_1.default.createElement(components_1.PaginationEllipsis, { key: item.type, size: size, className: b('pagination-item') })));
            case 'pageOf':
                return (showPages && (react_1.default.createElement(components_1.PaginationPageOf, { key: item.type, className: b('pagination-item'), size: size })));
            case 'button':
                return (react_1.default.createElement(components_1.PaginationButton, { key: item.action, size: size, item: item, page: page, pageSize: pageSize, onUpdate: onUpdate, compact: compact, className: b('pagination-item') }));
            default:
                return null;
        }
    })
        .filter(Boolean);
    return (react_1.default.createElement("div", { className: b(null, className) },
        pagination,
        showInput && (react_1.default.createElement(components_1.PaginationInput, { numberOfPages: numberOfPages, pageSize: pageSize, size: size, onUpdate: onUpdate, className: b('input') })),
        pageSizeOptions && (react_1.default.createElement(components_1.PaginationPageSizer, { onUpdate: onUpdate, page: page, pageSize: pageSize, pageSizeOptions: pageSizeOptions, size: size, total: total, className: b('page-sizer') }))));
};
exports.Pagination = Pagination;
