import React from 'react';
export type ContentProps = {
    /** Tooltip's content */
    content?: React.ReactNode;
    /** Tooltip's html content to be rendered via `dangerouslySetInnerHTML` */
    htmlContent?: string;
    /** Tooltip's content className */
    className?: string;
    /** Apply secondary text styles for the content */
    secondary: boolean;
};
export declare const Content: ({ secondary, htmlContent, content, className }: ContentProps) => React.JSX.Element | null;
