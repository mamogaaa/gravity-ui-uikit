import React from 'react';
import { Button } from '../../../Button';
import { blockNew } from '../../../utils/cn';
import './PaginationPage.css';
const b = blockNew('pagination-page');
export const PaginationPage = ({ item, size, pageSize, className, onUpdate }) => {
    if (item.simple) {
        return React.createElement("div", { className: b('simple', { size }, className) }, item.page);
    }
    const view = item.current ? 'normal' : 'flat';
    return (React.createElement(Button, { size: size, key: view, view: view, selected: item.current, className: className, onClick: () => onUpdate(item.page, pageSize) }, item.page));
};
