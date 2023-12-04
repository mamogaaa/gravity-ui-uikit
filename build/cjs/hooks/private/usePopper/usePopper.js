"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopper = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_popper_1 = require("react-popper");
const DEFAULT_PLACEMENT = [
    'bottom-start',
    'bottom',
    'bottom-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'left-start',
    'left',
    'left-end',
];
function usePopper({ anchorRef, placement = DEFAULT_PLACEMENT, offset, modifiers = [], strategy, altBoundary, }) {
    const [popperElement, setPopperElement] = react_1.default.useState(null);
    const [arrowElement, setArrowElement] = react_1.default.useState(null);
    const placements = Array.isArray(placement) ? placement : [placement];
    const { attributes, styles } = (0, react_popper_1.usePopper)(anchorRef === null || anchorRef === void 0 ? void 0 : anchorRef.current, popperElement, {
        strategy,
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } },
            { name: 'offset', options: { offset, altBoundary } },
            { name: 'flip', options: { fallbackPlacements: placements.slice(1), altBoundary } },
            ...modifiers,
        ],
        placement: placements[0],
    });
    return {
        attributes,
        styles,
        setPopperRef: setPopperElement,
        setArrowRef: setArrowElement,
    };
}
exports.usePopper = usePopper;
