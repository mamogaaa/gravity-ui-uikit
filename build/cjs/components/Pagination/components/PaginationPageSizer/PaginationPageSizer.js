"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPageSizer = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Select_1 = require("../../../Select");
const utils_1 = require("../../utils");
const PaginationPageSizer = ({ onUpdate, pageSize, size, page, pageSizeOptions, total, className, }) => {
    const options = pageSizeOptions.map((pageSizeOption) => ({
        value: String(pageSizeOption),
        content: pageSizeOption,
    }));
    const handleUpdate = ([newPageSizeOnUpdate]) => {
        const newPageSize = Number(newPageSizeOnUpdate);
        const numberOfPages = (0, utils_1.getNumberOfPages)(newPageSize, total);
        const hasUpperLimit = numberOfPages > 0;
        if (!hasUpperLimit) {
            onUpdate(1, newPageSize);
            return;
        }
        const newPage = page > numberOfPages ? numberOfPages : page;
        onUpdate(newPage, newPageSize);
    };
    return (react_1.default.createElement(Select_1.Select, { className: className, size: size, onUpdate: handleUpdate, options: options, value: [String(pageSize)] }));
};
exports.PaginationPageSizer = PaginationPageSizer;
