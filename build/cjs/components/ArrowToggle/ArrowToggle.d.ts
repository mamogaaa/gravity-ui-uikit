import React from 'react';
export interface ArrowToggleProps {
    size?: number;
    direction?: 'top' | 'left' | 'bottom' | 'right';
    className?: string;
}
export declare function ArrowToggle({ size, direction, className }: ArrowToggleProps): React.JSX.Element;
