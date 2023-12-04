import React from 'react';
import { KeyCode } from '../../constants';
/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @return {onKeyDown}
 */
export function useActionHandlers(callback) {
    const onKeyDown = React.useCallback((event) => {
        if (callback &&
            [KeyCode.ENTER, KeyCode.SPACEBAR, KeyCode.SPACEBAR_OLD].includes(event.key)) {
            // eslint-disable-next-line callback-return
            callback(event);
        }
    }, [callback]);
    return { onKeyDown };
}
