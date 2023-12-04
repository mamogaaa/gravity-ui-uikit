import React from 'react';
interface OuterAdditionalContentProps {
    note?: React.ReactNode;
    errorMessage?: React.ReactNode;
    noteId?: string;
    errorMessageId?: string;
}
export declare const OuterAdditionalContent: ({ errorMessage, note, noteId, errorMessageId, }: OuterAdditionalContentProps) => React.JSX.Element | null;
export {};
