"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const private_1 = require("../../../hooks/private");
const Button_1 = require("../../Button");
const Icon_1 = require("../../Icon");
const cn_1 = require("../../utils/cn");
const i18n_1 = tslib_1.__importDefault(require("../i18n"));
const b = (0, cn_1.block)('toast');
const DEFAULT_TIMEOUT = 5000;
const TITLE_ICONS = {
    info: icons_1.CircleInfo,
    success: icons_1.CircleCheck,
    warning: icons_1.TriangleExclamation,
    error: icons_1.TriangleExclamation,
    utility: icons_1.Thunderbolt,
};
function renderActions({ actions, onClose }) {
    if (!actions || !actions.length) {
        return null;
    }
    return (react_1.default.createElement("div", { className: b('actions') }, actions.map(({ label, onClick, view = 'outlined', removeAfterClick = true }, index) => {
        const onActionClick = () => {
            onClick();
            if (removeAfterClick) {
                onClose();
            }
        };
        return (react_1.default.createElement(Button_1.Button, { key: `${label}__${index}`, className: b('action'), onClick: onActionClick, type: "button", size: 'l', view: view, width: "auto" }, label));
    })));
}
function renderIconByType({ type }) {
    if (!type) {
        return null;
    }
    return react_1.default.createElement(Icon_1.Icon, { data: TITLE_ICONS[type], size: 20, className: b('icon', { [type]: true }) });
}
exports.Toast = react_1.default.forwardRef(function Toast(props, ref) {
    const { name, content, actions, title, className, type, renderIcon, autoHiding: timeoutProp = DEFAULT_TIMEOUT, isClosable = true, mobile = false, removeCallback, } = props;
    const onClose = react_1.default.useCallback(() => removeCallback(name), [removeCallback, name]);
    const timeout = typeof timeoutProp === 'number' ? timeoutProp : undefined;
    const closeOnTimeoutProps = (0, private_1.useCloseOnTimeout)({ onClose, timeout });
    const mods = {
        mobile,
        [type || 'default']: true,
    };
    const hasTitle = Boolean(title);
    const hasContent = Boolean(content);
    const icon = renderIcon ? renderIcon(props) : renderIconByType({ type });
    return (react_1.default.createElement("div", Object.assign({ ref: ref, className: b(mods, className) }, closeOnTimeoutProps, { "data-toast": true }),
        icon && react_1.default.createElement("div", { className: b('icon-container') }, icon),
        react_1.default.createElement("div", { className: b('container') },
            hasTitle && react_1.default.createElement("h3", { className: b('title') }, title),
            isClosable && (react_1.default.createElement(Button_1.Button, { size: 's', view: "flat", className: b('btn-close'), onClick: onClose, extraProps: { 'aria-label': (0, i18n_1.default)('label_close-button') } },
                react_1.default.createElement(Icon_1.Icon, { data: icons_1.Xmark }))),
            hasContent && (react_1.default.createElement("div", { className: b('content', { 'without-title': !hasTitle }) }, content)),
            renderActions({ actions, onClose }))));
});
