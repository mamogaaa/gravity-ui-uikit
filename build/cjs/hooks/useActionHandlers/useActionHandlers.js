"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActionHandlers = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../constants");
/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @return {onKeyDown}
 */
function useActionHandlers(callback) {
    const onKeyDown = react_1.default.useCallback((event) => {
        if (callback &&
            [constants_1.KeyCode.ENTER, constants_1.KeyCode.SPACEBAR, constants_1.KeyCode.SPACEBAR_OLD].includes(event.key)) {
            // eslint-disable-next-line callback-return
            callback(event);
        }
    }, [callback]);
    return { onKeyDown };
}
exports.useActionHandlers = useActionHandlers;
