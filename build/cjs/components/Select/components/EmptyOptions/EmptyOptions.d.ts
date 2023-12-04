import React from 'react';
import type { SelectProps } from '../../types';
type EmptyPlaceholderProps = {
    renderEmptyOptions?: SelectProps['renderEmptyOptions'];
    filter: string;
};
export declare const EmptyOptions: ({ renderEmptyOptions, filter }: EmptyPlaceholderProps) => React.JSX.Element;
export {};
