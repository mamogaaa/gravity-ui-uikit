import React from 'react';
import ReactDOM from 'react-dom';
import { usePortalContainer } from '../../hooks';
export function Portal({ container, children, disablePortal }) {
    const defaultContainer = usePortalContainer();
    const containerNode = container !== null && container !== void 0 ? container : defaultContainer;
    if (disablePortal) {
        return React.createElement(React.Fragment, null, children);
    }
    return containerNode ? ReactDOM.createPortal(children, containerNode) : null;
}
