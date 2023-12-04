import React from 'react';
import { blockNew } from '../../../utils/cn';
import './PaginationEllipsis.css';
const b = blockNew('pagination-ellipsis');
export const PaginationEllipsis = ({ size, className }) => {
    return React.createElement("div", { className: b({ size }, className) }, "...");
};
