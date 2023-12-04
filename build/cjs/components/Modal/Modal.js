"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_transition_group_1 = require("react-transition-group");
const hooks_1 = require("../../hooks");
const private_1 = require("../../hooks/private");
const Portal_1 = require("../Portal");
const FocusTrap_1 = require("../utils/FocusTrap");
const cn_1 = require("../utils/cn");
const layer_manager_1 = require("../utils/layer-manager");
const transition_1 = require("../utils/transition");
const b = (0, cn_1.block)('modal');
function Modal({ open = false, keepMounted = false, disableBodyScrollLock = false, disableEscapeKeyDown, disableOutsideClick, disableFocusTrap, disableAutoFocus, focusTrap = true, autoFocus = true, restoreFocusRef, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, onTransitionEnter, onTransitionEntered, onTransitionExit, onTransitionExited, children, style, className, contentClassName, 'aria-labelledby': ariaLabelledBy, 'aria-label': ariaLabel, container, qa, }) {
    const containerRef = react_1.default.useRef(null);
    const contentRef = react_1.default.useRef(null);
    const [inTransition, setInTransition] = react_1.default.useState(false);
    (0, hooks_1.useBodyScrollLock)({ enabled: !disableBodyScrollLock && (open || inTransition) });
    const containerProps = (0, private_1.useRestoreFocus)({
        enabled: open || inTransition,
        restoreFocusRef,
        focusTrapped: true,
    });
    (0, layer_manager_1.useLayer)({
        open,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [contentRef],
        type: 'modal',
    });
    return (react_1.default.createElement(Portal_1.Portal, { container: container },
        react_1.default.createElement(react_transition_group_1.CSSTransition, { nodeRef: containerRef, in: open, addEndListener: (done) => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', done); }, classNames: (0, transition_1.getCSSTransitionClassNames)(b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true, onEnter: () => {
                setInTransition(true);
                onTransitionEnter === null || onTransitionEnter === void 0 ? void 0 : onTransitionEnter();
            }, onExit: () => {
                setInTransition(true);
                onTransitionExit === null || onTransitionExit === void 0 ? void 0 : onTransitionExit();
            }, onEntered: () => {
                setInTransition(false);
                onTransitionEntered === null || onTransitionEntered === void 0 ? void 0 : onTransitionEntered();
            }, onExited: () => {
                setInTransition(false);
                onTransitionExited === null || onTransitionExited === void 0 ? void 0 : onTransitionExited();
            } },
            react_1.default.createElement("div", { ref: containerRef, style: style, className: b({ open }, className), "data-qa": qa },
                react_1.default.createElement("div", { className: b('table') },
                    react_1.default.createElement("div", { className: b('cell') },
                        react_1.default.createElement(FocusTrap_1.FocusTrap, { enabled: !disableFocusTrap && focusTrap && open && !inTransition, autoFocus: !disableAutoFocus && autoFocus },
                            react_1.default.createElement("div", Object.assign({ ref: contentRef, tabIndex: -1, role: "dialog", "aria-modal": open, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, className: b('content', contentClassName) }, containerProps), children))))))));
}
exports.Modal = Modal;
