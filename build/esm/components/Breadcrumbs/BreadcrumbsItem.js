import React from 'react';
import { Link } from '../Link';
import { block } from '../utils/cn';
const b = block('breadcrumbs');
function Item({ data, isCurrent, isPrevCurrent, renderItem, }) {
    const { text, title, href, action } = data;
    const itemTitle = title || text;
    if (isPrevCurrent || !isCurrent) {
        return (React.createElement(Link, { key: text, view: "secondary", href: href, title: itemTitle, onClick: action, className: b('item', { 'prev-current': isPrevCurrent }) }, renderItem ? renderItem(data, isCurrent, isPrevCurrent) : text));
    }
    return (React.createElement("div", { title: itemTitle, className: b('item', { current: true }) }, renderItem ? renderItem(data, isCurrent, isPrevCurrent) : text));
}
export const BreadcrumbsItem = React.memo(Item);
BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
