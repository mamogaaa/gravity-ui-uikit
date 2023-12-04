"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withEventBrokerDomHandlers = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const event_broker_1 = require("./event-broker");
const getComponentName_1 = require("./getComponentName");
function withEventBrokerDomHandlers(Component, eventTypes, eventBrokerData) {
    const componentName = (0, getComponentName_1.getComponentName)(Component);
    const displayName = `withEventBroker(${componentName})`;
    const LoggedComponent = react_1.default.forwardRef((props, ref) => {
        const decoratedHandlers = eventTypes.reduce((handlers, eventType) => {
            const originalHandler = props[eventType];
            return Object.assign(Object.assign({}, handlers), { [eventType]: (event) => {
                    event_broker_1.eventBroker.publish(Object.assign({ eventId: eventType.replace(/^on/, '').toLowerCase(), domEvent: event }, eventBrokerData));
                    return originalHandler && originalHandler(event);
                } });
        }, {});
        return react_1.default.createElement(Component, Object.assign({}, props, decoratedHandlers, { ref: ref }));
    });
    LoggedComponent.displayName = displayName;
    return LoggedComponent;
}
exports.withEventBrokerDomHandlers = withEventBrokerDomHandlers;
