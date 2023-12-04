import React from 'react';
import { createFocusTrap } from 'focus-trap';
import { useForkRef, useUniqId } from '../../hooks';
const focusTrapContext = React.createContext(undefined);
export function FocusTrap({ children, enabled = true, disableAutoFocus, autoFocus = true, }) {
    const nodeRef = React.useRef(null);
    const setAutoFocusRef = React.useRef(!disableAutoFocus && autoFocus);
    React.useEffect(() => {
        setAutoFocusRef.current = !disableAutoFocus && autoFocus;
    });
    const focusTrapRef = React.useRef();
    const containersRef = React.useRef({});
    const updateContainerElements = React.useCallback(() => {
        var _a;
        (_a = focusTrapRef.current) === null || _a === void 0 ? void 0 : _a.updateContainerElements([
            nodeRef.current,
            ...Object.values(containersRef.current),
        ]);
    }, []);
    const actions = React.useMemo(() => ({
        addNode(id, node) {
            var _a;
            if (containersRef.current[id] !== node && !((_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.contains(node))) {
                containersRef.current[id] = node;
                updateContainerElements();
            }
        },
        removeNode(id) {
            if (containersRef.current[id]) {
                delete containersRef.current[id];
                updateContainerElements();
            }
        },
    }), [updateContainerElements]);
    const handleNodeRef = React.useCallback((node) => {
        var _a;
        if (enabled && node) {
            nodeRef.current = node;
            if (!focusTrapRef.current) {
                focusTrapRef.current = createFocusTrap([], {
                    initialFocus: () => setAutoFocusRef.current && getFocusElement(node),
                    fallbackFocus: () => node,
                    returnFocusOnDeactivate: false,
                    escapeDeactivates: false,
                    clickOutsideDeactivates: false,
                    allowOutsideClick: true,
                });
            }
            updateContainerElements();
            focusTrapRef.current.activate();
        }
        else {
            (_a = focusTrapRef.current) === null || _a === void 0 ? void 0 : _a.deactivate();
            nodeRef.current = null;
        }
    }, [enabled, updateContainerElements]);
    const child = React.Children.only(children);
    if (!React.isValidElement(child)) {
        throw new Error('Children must contain only one valid element');
    }
    const childRef = child.ref;
    const ref = useForkRef(handleNodeRef, childRef);
    return (React.createElement(focusTrapContext.Provider, { value: actions }, React.cloneElement(child, { ref })));
}
export function useParentFocusTrap() {
    const actions = React.useContext(focusTrapContext);
    const id = useUniqId();
    return React.useMemo(() => {
        if (!actions) {
            return undefined;
        }
        return (node) => {
            if (node) {
                actions.addNode(id, node);
            }
            else {
                actions.removeNode(id);
            }
        };
    }, [actions, id]);
}
function getFocusElement(root) {
    if (!(document.activeElement instanceof HTMLElement) ||
        !root.contains(document.activeElement)) {
        if (!root.hasAttribute('tabIndex')) {
            if (process.env.NODE_ENV !== 'production') {
                // used only in dev build
                // eslint-disable-next-line no-console
                console.error('@gravity-ui/uikit: focus-trap content node does node accept focus.');
            }
            root.setAttribute('tabIndex', '-1');
        }
        return root;
    }
    return document.activeElement;
}