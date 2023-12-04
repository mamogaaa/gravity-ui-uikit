import React from 'react';
import { eventBroker } from './event-broker';
import { getComponentName } from './getComponentName';
export function withEventBrokerDomHandlers(Component, eventTypes, eventBrokerData) {
    const componentName = getComponentName(Component);
    const displayName = `withEventBroker(${componentName})`;
    const LoggedComponent = React.forwardRef((props, ref) => {
        const decoratedHandlers = eventTypes.reduce((handlers, eventType) => {
            const originalHandler = props[eventType];
            return Object.assign(Object.assign({}, handlers), { [eventType]: (event) => {
                    eventBroker.publish(Object.assign({ eventId: eventType.replace(/^on/, '').toLowerCase(), domEvent: event }, eventBrokerData));
                    return originalHandler && originalHandler(event);
                } });
        }, {});
        return React.createElement(Component, Object.assign({}, props, decoratedHandlers, { ref: ref }));
    });
    LoggedComponent.displayName = displayName;
    return LoggedComponent;
}