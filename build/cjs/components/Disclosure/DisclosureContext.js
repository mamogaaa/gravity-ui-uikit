"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToggleDisclosure = exports.useDisclosureAttributes = exports.DisclosureProvider = exports.DisclosureToggleContext = exports.DisclosureAttributesContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../hooks");
exports.DisclosureAttributesContext = react_1.default.createContext(undefined);
exports.DisclosureToggleContext = react_1.default.createContext(undefined);
function DisclosureProvider(props) {
    const { size, disabled, defaultExpanded, arrowPosition, summary, keepMounted, onUpdate, expanded: controlledExpanded, } = props;
    const [expanded, setExpanded] = react_1.default.useState(() => Boolean(defaultExpanded));
    const controlledMode = controlledExpanded !== undefined;
    const handleToggle = () => {
        setExpanded((prev) => !prev);
        const newValue = controlledMode ? !controlledExpanded : !expanded;
        onUpdate(newValue);
    };
    const ariaControls = (0, hooks_1.useUniqId)();
    const ariaLabelledby = `disclosure${ariaControls}`;
    return (react_1.default.createElement(exports.DisclosureAttributesContext.Provider, { value: {
            size,
            disabled,
            summary,
            arrowPosition,
            keepMounted,
            expanded: controlledMode ? controlledExpanded : expanded,
            ariaControls,
            ariaLabelledby,
        } },
        react_1.default.createElement(exports.DisclosureToggleContext.Provider, { value: handleToggle }, props.children)));
}
exports.DisclosureProvider = DisclosureProvider;
function useDisclosureAttributes() {
    const state = react_1.default.useContext(exports.DisclosureAttributesContext);
    if (state === undefined) {
        throw new Error('useDisclosureAttributes must be used within DisclosureProvider');
    }
    return state;
}
exports.useDisclosureAttributes = useDisclosureAttributes;
function useToggleDisclosure() {
    const state = react_1.default.useContext(exports.DisclosureToggleContext);
    if (state === undefined) {
        throw new Error('useToggleDisclosure must be used within DisclosureProvider');
    }
    return state;
}
exports.useToggleDisclosure = useToggleDisclosure;
