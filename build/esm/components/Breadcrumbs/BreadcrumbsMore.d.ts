import React from 'react';
import type { BreadcrumbsProps } from './Breadcrumbs';
interface Props extends Pick<BreadcrumbsProps, 'popupPlacement' | 'popupStyle' | 'items'> {
}
export declare function BreadcrumbsMore({ popupStyle, popupPlacement, items }: Props): React.JSX.Element;
export declare namespace BreadcrumbsMore {
    var displayName: string;
}
export {};
