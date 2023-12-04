import React from 'react';
import type { AlertProps } from './types';
export declare const Alert: {
    (props: AlertProps): React.JSX.Element;
    Icon: ({ className, theme, view, size, }: import("./types").AlertIconProps) => React.JSX.Element | null;
    Title: ({ text, className }: import("./types").AlertTitleProps) => React.JSX.Element;
    Actions: ({ items, children, parentLayout, className, }: import("./types").AlertActionsProps) => React.JSX.Element;
};
