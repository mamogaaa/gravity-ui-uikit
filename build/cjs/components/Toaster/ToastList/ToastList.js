"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastList = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_transition_group_1 = require("react-transition-group");
const cn_1 = require("../../utils/cn");
const transition_1 = require("../../utils/transition");
const Toast_1 = require("../Toast/Toast");
const desktopTransitionClassNames = (0, transition_1.getCSSTransitionClassNames)((0, cn_1.block)('toast-animation-desktop'));
const mobileTransitionClassNames = (0, transition_1.getCSSTransitionClassNames)((0, cn_1.block)('toast-animation-mobile'));
function ToastList(props) {
    const { toasts, mobile, removeCallback } = props;
    return (react_1.default.createElement(react_transition_group_1.TransitionGroup, { component: null }, toasts.map((toast) => (react_1.default.createElement(react_transition_group_1.CSSTransition, { key: `${toast.name}_${toast.addedAt}`, nodeRef: toast.ref, classNames: mobile ? mobileTransitionClassNames : desktopTransitionClassNames, addEndListener: (done) => { var _a, _b; return (_b = (_a = toast.ref) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.addEventListener('animationend', done); }, onEnter: () => updateToastHeightCssProperty(toast), onExit: () => updateToastHeightCssProperty(toast) },
        react_1.default.createElement(Toast_1.Toast, Object.assign({}, toast, { mobile: mobile, removeCallback: removeCallback })))))));
}
exports.ToastList = ToastList;
function updateToastHeightCssProperty(toast) {
    var _a;
    if ((_a = toast.ref) === null || _a === void 0 ? void 0 : _a.current) {
        toast.ref.current.style.setProperty('--yc-toast-height', `${toast.ref.current.offsetHeight}px`);
    }
}
