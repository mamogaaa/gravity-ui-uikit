"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../constants");
const hooks_1 = require("../../hooks");
const private_1 = require("../../hooks/private");
const Popup_1 = require("../Popup");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('tooltip');
const DEFAULT_PLACEMENT = ['bottom', 'top'];
const Tooltip = (props) => {
    const { children, content, disabled, placement = DEFAULT_PLACEMENT } = props;
    const [anchorElement, setAnchorElement] = react_1.default.useState(null);
    const tooltipVisible = useTooltipVisible(anchorElement, props);
    const renderPopup = () => {
        return (react_1.default.createElement(Popup_1.Popup, { id: props.id, role: "tooltip", className: b(null, props.className), style: props.style, open: tooltipVisible && !disabled, placement: placement, anchorRef: { current: anchorElement }, disablePortal: props.disablePortal, disableEscapeKeyDown: true, disableOutsideClick: true, disableLayer: true },
            react_1.default.createElement("div", { className: b('content', props.contentClassName) }, content)));
    };
    const child = react_1.default.Children.only(children);
    const childRef = child.ref;
    const ref = (0, hooks_1.useForkRef)(setAnchorElement, childRef);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.cloneElement(child, { ref }),
        anchorElement ? renderPopup() : null));
};
exports.Tooltip = Tooltip;
function useTooltipVisible(anchor, { openDelay = 250, closeDelay }) {
    const [tooltipVisible, showTooltip, hideTooltip] = (0, private_1.useBoolean)(false);
    const timeoutRef = react_1.default.useRef();
    const isFocusWithinRef = react_1.default.useRef(false);
    react_1.default.useEffect(() => {
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
            if (e.key === constants_1.KeyCode.ESCAPE) {
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
