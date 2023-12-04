import React from 'react';
import { useActionHandlers } from '../../hooks';
import { block } from '../utils/cn';
import './Card.css';
const b = block('card');
export const Card = React.forwardRef(function Card(props, ref) {
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
    const { onKeyDown } = useActionHandlers(onClick);
    return (React.createElement("div", { style: style, ref: ref, role: isClickable ? 'button' : undefined, className: b({
            theme: theme || defaultTheme,
            view: view || defaultView,
            type,
            selected,
            size,
            disabled,
            clickable: isClickable,
        }, className), onClick: handleClick, onKeyDown: isClickable ? onKeyDown : undefined, tabIndex: isClickable ? 0 : undefined, "data-qa": qa }, children));
});
