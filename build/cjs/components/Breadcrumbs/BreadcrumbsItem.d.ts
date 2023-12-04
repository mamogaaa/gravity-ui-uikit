import React from 'react';
import type { BreadcrumbsProps, BreadcrumbsItem as IBreadcrumbsItem } from './Breadcrumbs';
interface Props<T extends IBreadcrumbsItem = IBreadcrumbsItem> {
    data: T;
    isCurrent: boolean;
    isPrevCurrent: boolean;
    renderItem?: BreadcrumbsProps<T>['renderItemContent'] | BreadcrumbsProps<T>['renderRootContent'];
}
declare function Item<T extends IBreadcrumbsItem = IBreadcrumbsItem>({ data, isCurrent, isPrevCurrent, renderItem, }: Props<T>): React.JSX.Element;
export declare const BreadcrumbsItem: typeof Item & {
    displayName: string;
};
export {};
