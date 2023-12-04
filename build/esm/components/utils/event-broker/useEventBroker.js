import React from 'react';
import { eventBroker } from './EventBroker';
export function useEventBroker(subscription, broker = eventBroker) {
    React.useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}