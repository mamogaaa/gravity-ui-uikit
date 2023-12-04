import React from 'react';
import { usePopper as useReactPopper } from 'react-popper';
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
export function usePopper({ anchorRef, placement = DEFAULT_PLACEMENT, offset, modifiers = [], strategy, altBoundary, }) {
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowElement, setArrowElement] = React.useState(null);
    const placements = Array.isArray(placement) ? placement : [placement];
    const { attributes, styles } = useReactPopper(anchorRef === null || anchorRef === void 0 ? void 0 : anchorRef.current, popperElement, {
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
