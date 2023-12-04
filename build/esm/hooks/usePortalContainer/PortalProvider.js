import React from 'react';
export const PortalContext = React.createContext({ current: null });
PortalContext.displayName = 'PortalContext';
export function PortalProvider({ container, children }) {
    return React.createElement(PortalContext.Provider, { value: container }, children);
}
