"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModifiers = void 0;
const constants_1 = require("../../constants");
const adjustBorderWidth = (width) => {
    return width - constants_1.BORDER_WIDTH * 2;
};
const getMinWidth = (referenceWidth, virtualized) => {
    if (virtualized) {
        return referenceWidth > constants_1.POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE
            ? referenceWidth
            : constants_1.POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE;
    }
    return adjustBorderWidth(referenceWidth);
};
const getPopupWidth = (width, controlWidth, virtualized) => {
    let popupWidth = controlWidth;
    if (typeof width === 'number') {
        popupWidth = width;
    }
    else if (width === 'fit') {
        popupWidth = adjustBorderWidth(controlWidth);
    }
    else {
        popupWidth = getMinWidth(controlWidth, virtualized);
    }
    return `${popupWidth}px`;
};
const getModifiers = (args) => {
    const { width, disablePortal, virtualized } = args;
    // set popper width styles according anchor rect
    const sameWidth = {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state, name }) => {
            var _a;
            // prevents styles applying after popup being opened (in case of multiple selection)
            if ((_a = state.modifiersData[`${name}#persistent`]) === null || _a === void 0 ? void 0 : _a.skip) {
                return;
            }
            const popupWidth = getPopupWidth(width, state.rects.reference.width, virtualized);
            if (typeof width !== 'number' && width !== 'fit') {
                state.styles.popper.minWidth = popupWidth;
                state.styles.popper.width = undefined;
            }
            else {
                state.styles.popper.minWidth = popupWidth;
                state.styles.popper.width = popupWidth;
            }
            state.styles.popper.maxWidth = `max(90vw, ${adjustBorderWidth(state.rects.reference.width)}px)`;
            state.modifiersData[`${name}#persistent`] = {
                skip: typeof width !== 'number',
            };
        },
        effect: ({ state, name }) => {
            // All this code is workaround. Check https://popper.js.org/docs/v2/modifiers/community-modifiers/
            var _a;
            // prevents styles applying after popup being opened (in case of multiple selection)
            if ((_a = state.modifiersData[`${name}#persistent`]) === null || _a === void 0 ? void 0 : _a.skip) {
                return;
            }
            const popupWidth = getPopupWidth(width, state.elements.reference.offsetWidth, virtualized);
            if (typeof width !== 'number' && width !== 'fit') {
                state.elements.popper.style.minWidth = popupWidth;
            }
            else {
                state.elements.popper.style.minWidth = popupWidth;
                state.elements.popper.style.width = popupWidth;
            }
            state.elements.popper.style.maxWidth = `max(90vw, ${state.elements.reference.offsetWidth}px)`;
        },
    };
    // prevents the popper from being cut off by moving it so that it stays visible within its boundary area
    const preventOverflow = {
        name: 'preventOverflow',
        options: { padding: 10, altBoundary: disablePortal, altAxis: true },
    };
    return [sameWidth, preventOverflow];
};
exports.getModifiers = getModifiers;