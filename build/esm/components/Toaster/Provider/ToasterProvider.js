import React from 'react';
import { getToastIndex } from '../utilities/getToastIndex';
import { hasToast } from '../utilities/hasToast';
import { removeToast } from '../utilities/removeToast';
import { ToasterContext } from './ToasterContext';
import { ToastsContext } from './ToastsContext';
export const ToasterProvider = React.forwardRef(function ToasterProvider({ children }, ref) {
    const [toasts, setToasts] = React.useState([]);
    const add = React.useCallback((toast) => {
        const { name } = toast;
        setToasts((toasts) => {
            let nextToasts = toasts;
            if (hasToast(toasts, name)) {
                nextToasts = removeToast(toasts, name);
            }
            return [
                ...nextToasts,
                Object.assign(Object.assign({}, toast), { addedAt: Date.now(), ref: React.createRef() }),
            ];
        });
    }, []);
    const remove = React.useCallback((toastName) => {
        setToasts((toasts) => {
            return removeToast(toasts, toastName);
        });
    }, []);
    const removeAll = React.useCallback(() => {
        setToasts(() => []);
    }, []);
    const update = React.useCallback((toastName, override) => {
        setToasts((toasts) => {
            if (!hasToast(toasts, toastName)) {
                return toasts;
            }
            const index = getToastIndex(toasts, toastName);
            return [
                ...toasts.slice(0, index),
                Object.assign(Object.assign({}, toasts[index]), override),
                ...toasts.slice(index + 1),
            ];
        });
    }, []);
    const toastsRef = React.useRef(toasts);
    React.useEffect(() => {
        toastsRef.current = toasts;
    }, [toasts]);
    const has = React.useCallback((toastName) => {
        return toastsRef.current ? hasToast(toastsRef.current, toastName) : false;
    }, []);
    const toasterContext = React.useMemo(() => {
        return {
            add,
            remove,
            removeAll,
            update,
            has,
        };
    }, [add, remove, removeAll, update, has]);
    React.useImperativeHandle(ref, () => ({
        add,
        remove,
        removeAll,
        update,
        has,
    }));
    return (React.createElement(ToasterContext.Provider, { value: toasterContext },
        React.createElement(ToastsContext.Provider, { value: toasts }, children)));
});
ToasterProvider.displayName = 'ToasterProvider';