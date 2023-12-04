"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToasterProvider = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const getToastIndex_1 = require("../utilities/getToastIndex");
const hasToast_1 = require("../utilities/hasToast");
const removeToast_1 = require("../utilities/removeToast");
const ToasterContext_1 = require("./ToasterContext");
const ToastsContext_1 = require("./ToastsContext");
exports.ToasterProvider = react_1.default.forwardRef(function ToasterProvider({ children }, ref) {
    const [toasts, setToasts] = react_1.default.useState([]);
    const add = react_1.default.useCallback((toast) => {
        const { name } = toast;
        setToasts((toasts) => {
            let nextToasts = toasts;
            if ((0, hasToast_1.hasToast)(toasts, name)) {
                nextToasts = (0, removeToast_1.removeToast)(toasts, name);
            }
            return [
                ...nextToasts,
                Object.assign(Object.assign({}, toast), { addedAt: Date.now(), ref: react_1.default.createRef() }),
            ];
        });
    }, []);
    const remove = react_1.default.useCallback((toastName) => {
        setToasts((toasts) => {
            return (0, removeToast_1.removeToast)(toasts, toastName);
        });
    }, []);
    const removeAll = react_1.default.useCallback(() => {
        setToasts(() => []);
    }, []);
    const update = react_1.default.useCallback((toastName, override) => {
        setToasts((toasts) => {
            if (!(0, hasToast_1.hasToast)(toasts, toastName)) {
                return toasts;
            }
            const index = (0, getToastIndex_1.getToastIndex)(toasts, toastName);
            return [
                ...toasts.slice(0, index),
                Object.assign(Object.assign({}, toasts[index]), override),
                ...toasts.slice(index + 1),
            ];
        });
    }, []);
    const toastsRef = react_1.default.useRef(toasts);
    react_1.default.useEffect(() => {
        toastsRef.current = toasts;
    }, [toasts]);
    const has = react_1.default.useCallback((toastName) => {
        return toastsRef.current ? (0, hasToast_1.hasToast)(toastsRef.current, toastName) : false;
    }, []);
    const toasterContext = react_1.default.useMemo(() => {
        return {
            add,
            remove,
            removeAll,
            update,
            has,
        };
    }, [add, remove, removeAll, update, has]);
    react_1.default.useImperativeHandle(ref, () => ({
        add,
        remove,
        removeAll,
        update,
        has,
    }));
    return (react_1.default.createElement(ToasterContext_1.ToasterContext.Provider, { value: toasterContext },
        react_1.default.createElement(ToastsContext_1.ToastsContext.Provider, { value: toasts }, children)));
});
exports.ToasterProvider.displayName = 'ToasterProvider';
