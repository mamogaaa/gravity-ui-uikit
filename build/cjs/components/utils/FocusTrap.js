"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useParentFocusTrap = exports.FocusTrap = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const focus_trap_1 = require("focus-trap");
const hooks_1 = require("../../hooks");
const focusTrapContext = react_1.default.createContext(undefined);
function FocusTrap({ children, enabled = true, disableAutoFocus, autoFocus = true, }) {
    const nodeRef = react_1.default.useRef(null);
    const setAutoFocusRef = react_1.default.useRef(!disableAutoFocus && autoFocus);
    react_1.default.useEffect(() => {
        setAutoFocusRef.current = !disableAutoFocus && autoFocus;
    });
    const focusTrapRef = react_1.default.useRef();
    const containersRef = react_1.default.useRef({});
    const updateContainerElements = react_1.default.useCallback(() => {
        var _a;
        (_a = focusTrapRef.current) === null || _a === void 0 ? void 0 : _a.updateContainerElements([
            nodeRef.current,
            ...Object.values(containersRef.current),
        ]);
    }, []);
    const actions = react_1.default.useMemo(() => ({
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
    const handleNodeRef = react_1.default.useCallback((node) => {
        var _a;
        if (enabled && node) {
            nodeRef.current = node;
            if (!focusTrapRef.current) {
                focusTrapRef.current = (0, focus_trap_1.createFocusTrap)([], {
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
    const child = react_1.default.Children.only(children);
    if (!react_1.default.isValidElement(child)) {
        throw new Error('Children must contain only one valid element');
    }
    const childRef = child.ref;
    const ref = (0, hooks_1.useForkRef)(handleNodeRef, childRef);
    return (react_1.default.createElement(focusTrapContext.Provider, { value: actions }, react_1.default.cloneElement(child, { ref })));
}
exports.FocusTrap = FocusTrap;
function useParentFocusTrap() {
    const actions = react_1.default.useContext(focusTrapContext);
    const id = (0, hooks_1.useUniqId)();
    return react_1.default.useMemo(() => {
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
exports.useParentFocusTrap = useParentFocusTrap;
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
