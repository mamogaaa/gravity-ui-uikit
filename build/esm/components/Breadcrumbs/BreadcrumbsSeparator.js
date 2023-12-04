import React from 'react';
import { block } from '../utils/cn';
const b = block('breadcrumbs');
export function BreadcrumbsSeparator({ renderItemDivider }) {
    return (React.createElement("div", { "aria-hidden": true, className: b('divider') }, renderItemDivider ? renderItemDivider() : '/'));
}
BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
