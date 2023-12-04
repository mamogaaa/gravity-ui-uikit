import React from 'react';
export interface DialogHeaderProps {
    caption?: React.ReactNode;
    insertBefore?: React.ReactNode;
    insertAfter?: React.ReactNode;
    className?: string;
    id?: string;
}
export declare function DialogHeader(props: DialogHeaderProps): React.JSX.Element;
