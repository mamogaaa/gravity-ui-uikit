import React from 'react';
import { Select } from '../../../Select';
import { getNumberOfPages } from '../../utils';
export const PaginationPageSizer = ({ onUpdate, pageSize, size, page, pageSizeOptions, total, className, }) => {
    const options = pageSizeOptions.map((pageSizeOption) => ({
        value: String(pageSizeOption),
        content: pageSizeOption,
    }));
    const handleUpdate = ([newPageSizeOnUpdate]) => {
        const newPageSize = Number(newPageSizeOnUpdate);
        const numberOfPages = getNumberOfPages(newPageSize, total);
        const hasUpperLimit = numberOfPages > 0;
        if (!hasUpperLimit) {
            onUpdate(1, newPageSize);
            return;
        }
        const newPage = page > numberOfPages ? numberOfPages : page;
        onUpdate(newPage, newPageSize);
    };
    return (React.createElement(Select, { className: className, size: size, onUpdate: handleUpdate, options: options, value: [String(pageSize)] }));
};
