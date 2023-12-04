import React from 'react';
import { ArrowToggle } from '../../ArrowToggle';
import { useDisclosureAttributes, useToggleDisclosure } from '../DisclosureContext';
import { b } from '../cn';
const ComponentSizeToIconSizeMap = {
    m: 14,
    l: 16,
    xl: 20,
};
export function DisclosureSummary({ children: renderFunction }) {
    const handleToggle = useToggleDisclosure();
    const { ariaControls, ariaLabelledby: id, expanded, disabled } = useDisclosureAttributes();
    return renderFunction({ onClick: handleToggle, ariaControls, id, expanded, disabled });
}
export function DefaultDisclosureSummary({ onClick, ariaControls, id, expanded, disabled, }) {
    const { size, summary, arrowPosition } = useDisclosureAttributes();
    return (React.createElement("button", { type: "button", "aria-expanded": expanded, className: b('trigger', { disabled, 'arrow-right': arrowPosition === 'right' }), "aria-controls": ariaControls, id: id, onClick: onClick, disabled: disabled },
        React.createElement(ArrowToggle, { size: ComponentSizeToIconSizeMap[size], direction: expanded ? 'top' : 'bottom' }),
        summary));
}
DisclosureSummary.displayName = 'DisclosureSummary';
