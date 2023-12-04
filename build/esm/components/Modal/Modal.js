import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useBodyScrollLock } from '../../hooks';
import { useRestoreFocus } from '../../hooks/private';
import { Portal } from '../Portal';
import { FocusTrap } from '../utils/FocusTrap';
import { block } from '../utils/cn';
import { useLayer } from '../utils/layer-manager';
import { getCSSTransitionClassNames } from '../utils/transition';
import './Modal.css';
const b = block('modal');
export function Modal({ open = false, keepMounted = false, disableBodyScrollLock = false, disableEscapeKeyDown, disableOutsideClick, disableFocusTrap, disableAutoFocus, focusTrap = true, autoFocus = true, restoreFocusRef, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, onTransitionEnter, onTransitionEntered, onTransitionExit, onTransitionExited, children, style, className, contentClassName, 'aria-labelledby': ariaLabelledBy, 'aria-label': ariaLabel, container, qa, }) {
    const containerRef = React.useRef(null);
    const contentRef = React.useRef(null);
    const [inTransition, setInTransition] = React.useState(false);
    useBodyScrollLock({ enabled: !disableBodyScrollLock && (open || inTransition) });
    const containerProps = useRestoreFocus({
        enabled: open || inTransition,
        restoreFocusRef,
        focusTrapped: true,
    });
    useLayer({
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
    return (React.createElement(Portal, { container: container },
        React.createElement(CSSTransition, { nodeRef: containerRef, in: open, addEndListener: (done) => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', done); }, classNames: getCSSTransitionClassNames(b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true, onEnter: () => {
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
            React.createElement("div", { ref: containerRef, style: style, className: b({ open }, className), "data-qa": qa },
                React.createElement("div", { className: b('table') },
                    React.createElement("div", { className: b('cell') },
                        React.createElement(FocusTrap, { enabled: !disableFocusTrap && focusTrap && open && !inTransition, autoFocus: !disableAutoFocus && autoFocus },
                            React.createElement("div", Object.assign({ ref: contentRef, tabIndex: -1, role: "dialog", "aria-modal": open, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, className: b('content', contentClassName) }, containerProps), children))))))));
}
