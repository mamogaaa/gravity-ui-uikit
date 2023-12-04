"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
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
const PopupArrow_1 = require("./PopupArrow");
const b = (0, cn_1.block)('popup');
const ARROW_SIZE = 8;
function Popup({ keepMounted = false, hasArrow = false, offset = [0, 4], open, placement, anchorRef, disableEscapeKeyDown, disableOutsideClick, disableLayer, style, className, contentClassName, modifiers = [], children, onEscapeKeyDown, onOutsideClick, onClose, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, disablePortal, container, strategy, qa, restoreFocus, restoreFocusRef, role, id, focusTrap = false, autoFocus = false, }) {
    const containerRef = react_1.default.useRef(null);
    (0, layer_manager_1.useLayer)({
        open,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [anchorRef, containerRef],
        enabled: !disableLayer,
        type: 'popup',
    });
    const { attributes, styles, setPopperRef, setArrowRef } = (0, private_1.usePopper)({
        anchorRef,
        placement,
        // Take arrow size into offset account
        offset: hasArrow ? [offset[0], offset[1] + ARROW_SIZE] : offset,
        strategy,
        altBoundary: disablePortal,
        modifiers: [
            // Properly display arrow within rounded container
            { name: 'arrow', options: { enabled: hasArrow, padding: 4 } },
            // Prevent border hiding
            { name: 'preventOverflow', options: { padding: 1, altBoundary: disablePortal } },
            ...modifiers,
        ],
    });
    const handleRef = (0, hooks_1.useForkRef)(setPopperRef, containerRef, (0, FocusTrap_1.useParentFocusTrap)());
    const containerProps = (0, private_1.useRestoreFocus)({
        enabled: Boolean(restoreFocus && open),
        restoreFocusRef,
    });
    return (react_1.default.createElement(Portal_1.Portal, { container: container, disablePortal: disablePortal },
        react_1.default.createElement(react_transition_group_1.CSSTransition, { nodeRef: containerRef, in: open, addEndListener: (done) => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', done); }, classNames: (0, transition_1.getCSSTransitionClassNames)(b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true },
            react_1.default.createElement("div", Object.assign({ ref: handleRef, style: styles.popper }, attributes.popper, containerProps, { className: b({ open }, className), "data-qa": qa, id: id, role: role }),
                react_1.default.createElement(FocusTrap_1.FocusTrap, { enabled: focusTrap && open, disableAutoFocus: !autoFocus },
                    react_1.default.createElement("div", { onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onFocus: onFocus, onBlur: onBlur, className: b('content', contentClassName), style: style, tabIndex: -1 },
                        hasArrow && (react_1.default.createElement(PopupArrow_1.PopupArrow, { styles: styles.arrow, attributes: attributes.arrow, setArrowRef: setArrowRef })),
                        children))))));
}
exports.Popup = Popup;
