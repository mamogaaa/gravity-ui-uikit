"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopupVisibility = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const private_1 = require("../../../hooks/private");
function usePopupVisibility(visible, onChangeVisibility, disabled) {
    const [isPopupShown, setPopupShown] = (0, private_1.useConditionallyControlledState)(visible, onChangeVisibility, false);
    const togglePopup = react_1.default.useCallback((open) => {
        setPopupShown((isShown) => {
            if (typeof open === 'boolean') {
                return open;
            }
            return !isShown;
        });
    }, [setPopupShown]);
    const closePopup = react_1.default.useCallback(() => {
        setPopupShown(false);
    }, [setPopupShown]);
    react_1.default.useEffect(() => {
        if (disabled && isPopupShown) {
            closePopup();
        }
    }, [closePopup, disabled, isPopupShown]);
    return {
        isPopupShown,
        togglePopup,
        closePopup,
    };
}
exports.usePopupVisibility = usePopupVisibility;
