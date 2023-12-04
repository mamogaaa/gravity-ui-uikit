import React from 'react';
import { useMobile } from '../mobile';
import { blockNew } from '../utils/cn';
import { PaginationButton, PaginationEllipsis, PaginationInput, PaginationPage, PaginationPageOf, PaginationPageSizer, } from './components';
import { usePagination } from './hooks/usePagination';
import './Pagination.css';
const b = blockNew('pagination');
export const Pagination = ({ page, pageSize, total, onUpdate, compact: propCompact = true, pageSizeOptions, showPages = true, showInput = false, className, }) => {
    const [mobile] = useMobile();
    const size = mobile ? 'l' : 'm';
    const compact = mobile ? true : propCompact;
    const { items, numberOfPages } = usePagination({ page, pageSize, total, mobile });
    const pagination = items
        .map((item) => {
        switch (item.type) {
            case 'page':
                return (showPages && (React.createElement(PaginationPage, { key: item.key, size: size, pageSize: pageSize, item: item, onUpdate: onUpdate, className: b('pagination-item') })));
            case 'ellipsis':
                return (showPages && (React.createElement(PaginationEllipsis, { key: item.type, size: size, className: b('pagination-item') })));
            case 'pageOf':
                return (showPages && (React.createElement(PaginationPageOf, { key: item.type, className: b('pagination-item'), size: size })));
            case 'button':
                return (React.createElement(PaginationButton, { key: item.action, size: size, item: item, page: page, pageSize: pageSize, onUpdate: onUpdate, compact: compact, className: b('pagination-item') }));
            default:
                return null;
        }
    })
        .filter(Boolean);
    return (React.createElement("div", { className: b(null, className) },
        pagination,
        showInput && (React.createElement(PaginationInput, { numberOfPages: numberOfPages, pageSize: pageSize, size: size, onUpdate: onUpdate, className: b('input') })),
        pageSizeOptions && (React.createElement(PaginationPageSizer, { onUpdate: onUpdate, page: page, pageSize: pageSize, pageSizeOptions: pageSizeOptions, size: size, total: total, className: b('page-sizer') }))));
};
