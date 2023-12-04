import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useForkRef } from '../../hooks';
import { usePopper, useRestoreFocus } from '../../hooks/private';
import { Portal } from '../Portal';
import { FocusTrap, useParentFocusTrap } from '../utils/FocusTrap';
import { block } from '../utils/cn';
import { useLayer } from '../utils/layer-manager';
import { getCSSTransitionClassNames } from '../utils/transition';
import { PopupArrow } from './PopupArrow';
import './Popup.css';
const b = block('popup');
const ARROW_SIZE = 8;
export function Popup({ keepMounted = false, hasArrow = false, offset = [0, 4], open, placement, anchorRef, disableEscapeKeyDown, disableOutsideClick, disableLayer, style, className, contentClassName, modifiers = [], children, onEscapeKeyDown, onOutsideClick, onClose, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, disablePortal, container, strategy, qa, restoreFocus, restoreFocusRef, role, id, focusTrap = false, autoFocus = false, }) {
    const containerRef = React.useRef(null);
    useLayer({
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
    const { attributes, styles, setPopperRef, setArrowRef } = usePopper({
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
    const handleRef = useForkRef(setPopperRef, containerRef, useParentFocusTrap());
    const containerProps = useRestoreFocus({
        enabled: Boolean(restoreFocus && open),
        restoreFocusRef,
    });
    return (React.createElement(Portal, { container: container, disablePortal: disablePortal },
        React.createElement(CSSTransition, { nodeRef: containerRef, in: open, addEndListener: (done) => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', done); }, classNames: getCSSTransitionClassNames(b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true },
            React.createElement("div", Object.assign({ ref: handleRef, style: styles.popper }, attributes.popper, containerProps, { className: b({ open }, className), "data-qa": qa, id: id, role: role }),
                React.createElement(FocusTrap, { enabled: focusTrap && open, disableAutoFocus: !autoFocus },
                    React.createElement("div", { onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onFocus: onFocus, onBlur: onBlur, className: b('content', contentClassName), style: style, tabIndex: -1 },
                        hasArrow && (React.createElement(PopupArrow, { styles: styles.arrow, attributes: attributes.arrow, setArrowRef: setArrowRef })),
                        children))))));
}
