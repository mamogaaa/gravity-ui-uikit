import React from 'react';
export declare const PortalContext: React.Context<React.RefObject<HTMLElement>>;
export type PortalProviderProps = React.PropsWithChildren<{
    container: React.RefObject<HTMLElement>;
}>;
export declare function PortalProvider({ container, children }: PortalProviderProps): React.JSX.Element;
