"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOpen = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const private_1 = require("../../../hooks/private");
const config_1 = require("../config");
const useOpen = ({ initialOpen, disabled, autoclosable, onOpenChange, delayOpening, delayClosing, behavior, shouldBeOpen, }) => {
    const openingTimeout = react_1.default.useRef(null);
    const closingTimeout = react_1.default.useRef(null);
    const [isOpen, setIsOpen] = react_1.default.useState(initialOpen);
    const unsetOpeningTimeout = react_1.default.useCallback(() => {
        if (openingTimeout.current) {
            clearTimeout(openingTimeout.current);
            openingTimeout.current = null;
        }
    }, []);
    const unsetClosingTimeout = react_1.default.useCallback(() => {
        if (closingTimeout.current) {
            clearTimeout(closingTimeout.current);
            closingTimeout.current = null;
        }
    }, []);
    react_1.default.useEffect(() => {
        return () => {
            unsetOpeningTimeout();
            unsetClosingTimeout();
        };
    }, [unsetClosingTimeout, unsetOpeningTimeout]);
    const setTooltipOpen = react_1.default.useCallback((open) => {
        setIsOpen(open);
        shouldBeOpen.current = open;
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(open);
    }, [onOpenChange, shouldBeOpen]);
    const openTooltip = react_1.default.useCallback(() => {
        unsetOpeningTimeout();
        setTooltipOpen(true);
    }, [setTooltipOpen, unsetOpeningTimeout]);
    const closeTooltip = react_1.default.useCallback(() => {
        unsetClosingTimeout();
        setTooltipOpen(false);
    }, [setTooltipOpen, unsetClosingTimeout]);
    react_1.default.useEffect(() => {
        if (disabled) {
            closeTooltip();
        }
    }, [disabled, closeTooltip]);
    (0, private_1.useUpdateEffect)(() => {
        if (autoclosable && !shouldBeOpen.current) {
            closeTooltip();
        }
    }, [autoclosable, closeTooltip, shouldBeOpen]);
    const [defaultDelayOpening, defaultDelayClosing] = config_1.delayByBehavior[behavior];
    const openTooltipDelayed = react_1.default.useCallback(() => {
        openingTimeout.current = setTimeout(() => {
            openingTimeout.current = null;
            openTooltip();
        }, delayOpening !== null && delayOpening !== void 0 ? delayOpening : defaultDelayOpening);
    }, [defaultDelayOpening, delayOpening, openTooltip]);
    const closeTooltipDelayed = react_1.default.useCallback(() => {
        closingTimeout.current = setTimeout(() => {
            closingTimeout.current = null;
            closeTooltip();
        }, delayClosing !== null && delayClosing !== void 0 ? delayClosing : defaultDelayClosing);
    }, [closeTooltip, defaultDelayClosing, delayClosing]);
    return {
        isOpen,
        closingTimeout,
        openTooltip,
        openTooltipDelayed,
        unsetOpeningTimeout,
        closeTooltip,
        closeTooltipDelayed,
        unsetClosingTimeout,
    };
};
exports.useOpen = useOpen;
