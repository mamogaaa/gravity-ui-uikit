import React from 'react';
import './ArrowToggle.css';
export interface ArrowToggleProps {
    size?: number;
    direction?: 'top' | 'left' | 'bottom' | 'right';
    className?: string;
}
export declare function ArrowToggle({ size, direction, className }: ArrowToggleProps): React.JSX.Element;
