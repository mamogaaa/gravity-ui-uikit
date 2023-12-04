import React from 'react';
import type { PaginationProps, PaginationSize } from '../../types';
import './PaginationInput.css';
type Props = {
    numberOfPages: number;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    size: PaginationSize;
    className?: string;
};
export declare const PaginationInput: ({ numberOfPages, size, pageSize, onUpdate, className }: Props) => React.JSX.Element;
export {};
