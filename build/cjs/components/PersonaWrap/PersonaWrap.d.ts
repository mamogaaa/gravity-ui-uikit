import React from 'react';
export interface PersonaWrapProps {
    avatar: React.ReactNode;
    children?: React.ReactNode;
    isEmpty?: boolean;
    theme?: 'default' | 'clear';
    size?: 's' | 'n';
    onClose?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    closeButtonAriaAttributes?: React.AriaAttributes;
}
export declare function PersonaWrap({ size, theme, isEmpty, onClick, onClose, className, avatar, children, style, closeButtonAriaAttributes, }: PersonaWrapProps): React.JSX.Element;
export declare namespace PersonaWrap {
    var displayName: string;
}
