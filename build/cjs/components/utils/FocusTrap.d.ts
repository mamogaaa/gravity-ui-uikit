import React from 'react';
interface FocusTrapProps {
    enabled?: boolean;
    /** @deprecated Use autoFocus instead */
    disableAutoFocus?: boolean;
    autoFocus?: boolean;
    children: React.ReactElement;
}
export declare function FocusTrap({ children, enabled, disableAutoFocus, autoFocus, }: FocusTrapProps): React.JSX.Element;
export declare function useParentFocusTrap(): ((node: HTMLElement | null) => void) | undefined;
export {};
