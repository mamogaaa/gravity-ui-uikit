"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../hooks");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('card');
exports.Card = react_1.default.forwardRef(function Card(props, ref) {
    const { type = 'container', theme, view, size = 'm', children, className, onClick, disabled, selected, style, qa, } = props;
    const isTypeAction = type === 'action';
    const isTypeSelection = type === 'selection';
    const isTypeContainer = type === 'container';
    /* Clickable card — only with type 'action' or 'selection' and not selected or disabled */
    const hasAction = isTypeAction || isTypeSelection;
    const isClickable = hasAction && Boolean(onClick) && !(disabled || selected);
    /* Theme only with type 'container' */
    const defaultTheme = isTypeContainer ? 'normal' : undefined;
    /* View only with type 'container' and 'selection' */
    const defaultView = isTypeContainer || isTypeSelection ? 'outlined' : undefined;
    const handleClick = isClickable ? onClick : undefined;
    const { onKeyDown } = (0, hooks_1.useActionHandlers)(onClick);
    return (react_1.default.createElement("div", { style: style, ref: ref, role: isClickable ? 'button' : undefined, className: b({
            theme: theme || defaultTheme,
            view: view || defaultView,
            type,
            selected,
            size,
            disabled,
            clickable: isClickable,
        }, className), onClick: handleClick, onKeyDown: isClickable ? onKeyDown : undefined, tabIndex: isClickable ? 0 : undefined, "data-qa": qa }, children));
});
