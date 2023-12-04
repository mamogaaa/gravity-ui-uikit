import React from 'react';
import type { PopoverButtonProps, PopoverTheme } from '../../types';
export type ButtonsProps = {
    /** Tooltip's theme */
    theme: PopoverTheme;
    /**
     * Action button properties
     * The button won't be rendered without them
     */
    tooltipActionButton?: PopoverButtonProps;
    /**
     * Cancel button properties
     * The button won't be rendered without them
     */
    tooltipCancelButton?: PopoverButtonProps;
};
export declare const Buttons: ({ theme, tooltipActionButton, tooltipCancelButton }: ButtonsProps) => React.JSX.Element | null;
