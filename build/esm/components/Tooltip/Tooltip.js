import React from 'react';
import { KeyCode } from '../../constants';
import { useForkRef } from '../../hooks';
import { useBoolean } from '../../hooks/private';
import { Popup } from '../Popup';
import { block } from '../utils/cn';
import './Tooltip.css';
const b = block('tooltip');
const DEFAULT_PLACEMENT = ['bottom', 'top'];
export const Tooltip = (props) => {
    const { children, content, disabled, placement = DEFAULT_PLACEMENT } = props;
    const [anchorElement, setAnchorElement] = React.useState(null);
    const tooltipVisible = useTooltipVisible(anchorElement, props);
    const renderPopup = () => {
        return (React.createElement(Popup, { id: props.id, role: "tooltip", className: b(null, props.className), style: props.style, open: tooltipVisible && !disabled, placement: placement, anchorRef: { current: anchorElement }, disablePortal: props.disablePortal, disableEscapeKeyDown: true, disableOutsideClick: true, disableLayer: true },
            React.createElement("div", { className: b('content', props.contentClassName) }, content)));
    };
    const child = React.Children.only(children);
    const childRef = child.ref;
    const ref = useForkRef(setAnchorElement, childRef);
    return (React.createElement(React.Fragment, null,
        React.cloneElement(child, { ref }),
        anchorElement ? renderPopup() : null));
};
function useTooltipVisible(anchor, { openDelay = 250, closeDelay }) {
    const [tooltipVisible, showTooltip, hideTooltip] = useBoolean(false);
    const timeoutRef = React.useRef();
    const isFocusWithinRef = React.useRef(false);
    React.useEffect(() => {
        if (!anchor) {
            return undefined;
        }
        function handleMouseEnter() {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(showTooltip, openDelay);
        }
        function handleMouseLeave() {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(hideTooltip, closeDelay);
        }
        function handleFocusWithin(e) {
            if (!isFocusWithinRef.current && document.activeElement === e.target) {
                isFocusWithinRef.current = true;
                clearTimeout(timeoutRef.current);
                showTooltip();
            }
        }
        function handleBlurWithin(e) {
            if (isFocusWithinRef.current &&
                !e.currentTarget.contains(e.relatedTarget)) {
                isFocusWithinRef.current = false;
                clearTimeout(timeoutRef.current);
                hideTooltip();
            }
        }
        function handleKeyDown(e) {
            if (e.key === KeyCode.ESCAPE) {
                clearTimeout(timeoutRef.current);
                hideTooltip();
            }
        }
        anchor.addEventListener('mouseenter', handleMouseEnter);
        anchor.addEventListener('mouseleave', handleMouseLeave);
        anchor.addEventListener('focus', handleFocusWithin);
        anchor.addEventListener('blur', handleBlurWithin);
        anchor.addEventListener('keydown', handleKeyDown);
        return () => {
            anchor.removeEventListener('mouseenter', handleMouseEnter);
            anchor.removeEventListener('mouseleave', handleMouseLeave);
            anchor.removeEventListener('focus', handleFocusWithin);
            anchor.removeEventListener('blur', handleBlurWithin);
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [anchor, showTooltip, hideTooltip, openDelay, closeDelay]);
    return tooltipVisible;
}
