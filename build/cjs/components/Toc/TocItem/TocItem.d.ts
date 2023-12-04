import React from 'react';
import type { TocItem as TocItemType } from '../types';
export interface TocItemProps extends TocItemType {
    childItem?: boolean;
    active?: boolean;
    onClick?: (value: string) => void;
}
export declare const TocItem: (props: TocItemProps) => React.JSX.Element;
