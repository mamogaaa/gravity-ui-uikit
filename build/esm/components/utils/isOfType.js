import React from 'react';
export function isOfType(Component) {
    return function isMatching(component) {
        if (!React.isValidElement(component)) {
            return false;
        }
        const { type } = component;
        return (type === React.Component ||
            type.displayName === Component.displayName);
    };
}
