import React from 'react';
import type { PageItem, PaginationProps, PaginationSize } from '../../types';
type Props = {
    item: PageItem;
    size: PaginationSize;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    className?: string;
};
export declare const PaginationPage: ({ item, size, pageSize, className, onUpdate }: Props) => React.JSX.Element;
export {};
