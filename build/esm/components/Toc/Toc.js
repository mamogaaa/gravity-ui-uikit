import React from 'react';
import { blockNew } from '../utils/cn';
import { TocItem } from './TocItem/TocItem';
import './Toc.css';
const b = blockNew('toc');
export const Toc = React.forwardRef(function Toc(props, ref) {
    const { value: activeValue, items, className, onUpdate, qa } = props;
    return (React.createElement("nav", { className: b(null, className), ref: ref, "data-qa": qa },
        React.createElement("ul", { className: b('sections') }, items.map(({ value, content, href, items: childrenItems }) => (React.createElement("li", { key: value !== null && value !== void 0 ? value : href },
            React.createElement(TocItem, { content: content, value: value, href: href, active: activeValue === value, onClick: onUpdate }),
            (childrenItems === null || childrenItems === void 0 ? void 0 : childrenItems.length) && (React.createElement("ul", { className: b('subsections') }, childrenItems === null || childrenItems === void 0 ? void 0 : childrenItems.map(({ value: childrenValue, content: childrenContent, href: childrenHref, }) => (React.createElement("li", { key: childrenValue !== null && childrenValue !== void 0 ? childrenValue : childrenHref },
                React.createElement(TocItem, { content: childrenContent, value: childrenValue, href: childrenHref, childItem: true, active: activeValue === childrenValue, onClick: onUpdate }))))))))))));
});
