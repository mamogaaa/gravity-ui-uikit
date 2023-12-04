import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { block } from '../../utils/cn';
import { getCSSTransitionClassNames } from '../../utils/transition';
import { Toast } from '../Toast/Toast';
import './ToastAnimation.css';
import './ToastList.css';
const desktopTransitionClassNames = getCSSTransitionClassNames(block('toast-animation-desktop'));
const mobileTransitionClassNames = getCSSTransitionClassNames(block('toast-animation-mobile'));
export function ToastList(props) {
    const { toasts, mobile, removeCallback } = props;
    return (React.createElement(TransitionGroup, { component: null }, toasts.map((toast) => (React.createElement(CSSTransition, { key: `${toast.name}_${toast.addedAt}`, nodeRef: toast.ref, classNames: mobile ? mobileTransitionClassNames : desktopTransitionClassNames, addEndListener: (done) => { var _a, _b; return (_b = (_a = toast.ref) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.addEventListener('animationend', done); }, onEnter: () => updateToastHeightCssProperty(toast), onExit: () => updateToastHeightCssProperty(toast) },
        React.createElement(Toast, Object.assign({}, toast, { mobile: mobile, removeCallback: removeCallback })))))));
}
function updateToastHeightCssProperty(toast) {
    var _a;
    if ((_a = toast.ref) === null || _a === void 0 ? void 0 : _a.current) {
        toast.ref.current.style.setProperty('--yc-toast-height', `${toast.ref.current.offsetHeight}px`);
    }
}
