import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { getCSSTransitionClassNames } from '../../utils/transition';
import { useDisclosureAttributes } from '../DisclosureContext';
import { b } from '../cn';
export function DisclosureDetails({ children }) {
    const containerRef = React.useRef(null);
    const { ariaControls, ariaLabelledby, keepMounted, expanded } = useDisclosureAttributes();
    return (React.createElement(CSSTransition, { nodeRef: containerRef, in: expanded, addEndListener: (done) => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', done); }, classNames: getCSSTransitionClassNames(b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true },
        React.createElement("div", { ref: containerRef, id: ariaControls, role: "region", "aria-labelledby": ariaLabelledby, className: b('content', { visible: expanded }) }, children)));
}
DisclosureDetails.displayName = 'DisclosureDetails';
