import React from 'react';
import { useActionHandlers } from '../../../../hooks';
export const Trigger = ({ open, openOnHover, disabled, className, openTooltip, closeTooltip, closedManually, onClick, children, }) => {
    const handleClick = async (event) => {
        // Ignores click that should close tooltip in case of {openOnHover: true}
        // to prevent situation when user could close tooltip accidentally
        const shouldPreventClosingByClick = open && openOnHover;
        if (disabled || shouldPreventClosingByClick) {
            return;
        }
        const shouldToggleTooltip = !onClick || (await onClick(event));
        if (!shouldToggleTooltip) {
            return;
        }
        const toggleTooltip = () => {
            const nextOpen = !open;
            if (nextOpen) {
                openTooltip();
                closedManually.current = false;
            }
            else {
                closeTooltip();
                closedManually.current = true;
            }
        };
        toggleTooltip();
    };
    const { onKeyDown } = useActionHandlers(handleClick);
    return typeof children === 'function' ? (React.createElement(React.Fragment, null, children({ onClick: handleClick, onKeyDown }))) : (
    // The event handler should only be used to capture bubbled events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", { className: className, onClick: handleClick, onKeyDown: onClick ? onKeyDown : undefined }, children));
};