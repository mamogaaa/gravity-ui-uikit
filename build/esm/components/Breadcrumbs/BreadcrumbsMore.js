import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import { Link } from '../Link';
import { block } from '../utils/cn';
import i18n from './i18n';
const b = block('breadcrumbs');
export function BreadcrumbsMore({ popupStyle, popupPlacement, items }) {
    return (React.createElement(DropdownMenu, { items: items, popupProps: {
            className: b('popup', {
                staircase: popupStyle === 'staircase',
            }),
            placement: popupPlacement,
        }, renderSwitcher: ({ onClick }) => (React.createElement(Link, { view: "secondary", title: i18n('label_more'), className: b('item', { more: true }), onClick: onClick }, "...")) }));
}
BreadcrumbsMore.displayName = 'Breadcrumbs.More';
