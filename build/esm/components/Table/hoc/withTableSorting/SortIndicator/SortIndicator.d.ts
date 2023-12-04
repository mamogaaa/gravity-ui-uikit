import React from 'react';
import './SortIndicator.css';
export interface SortIndicatorProps {
    order?: 'asc' | 'desc';
}
export declare function SortIndicator({ order }: SortIndicatorProps): React.JSX.Element;
