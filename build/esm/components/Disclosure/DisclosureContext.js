import React from 'react';
import { useUniqId } from '../../hooks';
export const DisclosureAttributesContext = React.createContext(undefined);
export const DisclosureToggleContext = React.createContext(undefined);
export function DisclosureProvider(props) {
    const { size, disabled, defaultExpanded, arrowPosition, summary, keepMounted, onUpdate, expanded: controlledExpanded, } = props;
    const [expanded, setExpanded] = React.useState(() => Boolean(defaultExpanded));
    const controlledMode = controlledExpanded !== undefined;
    const handleToggle = () => {
        setExpanded((prev) => !prev);
        const newValue = controlledMode ? !controlledExpanded : !expanded;
        onUpdate(newValue);
    };
    const ariaControls = useUniqId();
    const ariaLabelledby = `disclosure${ariaControls}`;
    return (React.createElement(DisclosureAttributesContext.Provider, { value: {
            size,
            disabled,
            summary,
            arrowPosition,
            keepMounted,
            expanded: controlledMode ? controlledExpanded : expanded,
            ariaControls,
            ariaLabelledby,
        } },
        React.createElement(DisclosureToggleContext.Provider, { value: handleToggle }, props.children)));
}
export function useDisclosureAttributes() {
    const state = React.useContext(DisclosureAttributesContext);
    if (state === undefined) {
        throw new Error('useDisclosureAttributes must be used within DisclosureProvider');
    }
    return state;
}
export function useToggleDisclosure() {
    const state = React.useContext(DisclosureToggleContext);
    if (state === undefined) {
        throw new Error('useToggleDisclosure must be used within DisclosureProvider');
    }
    return state;
}
