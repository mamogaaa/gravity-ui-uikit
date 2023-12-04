import React from 'react';
export interface PortalProps {
    container?: HTMLElement;
    children?: React.ReactNode;
    disablePortal?: boolean;
}
export declare function Portal({ container, children, disablePortal }: PortalProps): React.JSX.Element | null;
