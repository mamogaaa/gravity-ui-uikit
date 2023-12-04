import React from 'react';
interface LabelOwnProps {
    /** Label icon (at left) */
    icon?: React.ReactNode;
    /** Disabled state */
    disabled?: boolean;
    /** Handler for click on close button */
    onClose?(event: React.MouseEvent<HTMLButtonElement>): void;
    /** Text to copy */
    copyText?: string;
    /** `aria-label` of close button */
    closeButtonLabel?: string;
    /** `aria-label` of copy button */
    copyButtonLabel?: string;
    /** Handler for copy event */
    onCopy?(text: string, result: boolean): void;
    /** Handler for click on label itself */
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    /** Class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Display hover */
    interactive?: boolean;
    /** Label value (shows as "children : value") */
    value?: string;
}
interface LabelDefaultProps {
    /** Label color */
    theme: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'utility' | 'unknown' | 'clear';
    /** Label type (plain, with copy text button or with close button) */
    type: 'default' | 'copy' | 'close';
    /** Label size */
    size: 'xs' | 's' | 'm';
}
export interface LabelProps extends LabelOwnProps, Partial<LabelDefaultProps> {
}
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLDivElement>>;
export {};
