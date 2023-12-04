import React from 'react';
import './DialogHeader.css';
export interface DialogHeaderProps {
    caption?: React.ReactNode;
    insertBefore?: React.ReactNode;
    insertAfter?: React.ReactNode;
    className?: string;
    id?: string;
}
export declare function DialogHeader(props: DialogHeaderProps): React.JSX.Element;
