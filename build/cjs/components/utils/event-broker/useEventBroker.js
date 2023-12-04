"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventBroker = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const EventBroker_1 = require("./EventBroker");
function useEventBroker(subscription, broker = EventBroker_1.eventBroker) {
    react_1.default.useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}
exports.useEventBroker = useEventBroker;
