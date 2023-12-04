"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDisclosureSummary = exports.DisclosureSummary = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const ArrowToggle_1 = require("../../ArrowToggle");
const DisclosureContext_1 = require("../DisclosureContext");
const cn_1 = require("../cn");
const ComponentSizeToIconSizeMap = {
    m: 14,
    l: 16,
    xl: 20,
};
function DisclosureSummary({ children: renderFunction }) {
    const handleToggle = (0, DisclosureContext_1.useToggleDisclosure)();
    const { ariaControls, ariaLabelledby: id, expanded, disabled } = (0, DisclosureContext_1.useDisclosureAttributes)();
    return renderFunction({ onClick: handleToggle, ariaControls, id, expanded, disabled });
}
exports.DisclosureSummary = DisclosureSummary;
function DefaultDisclosureSummary({ onClick, ariaControls, id, expanded, disabled, }) {
    const { size, summary, arrowPosition } = (0, DisclosureContext_1.useDisclosureAttributes)();
    return (react_1.default.createElement("button", { type: "button", "aria-expanded": expanded, className: (0, cn_1.b)('trigger', { disabled, 'arrow-right': arrowPosition === 'right' }), "aria-controls": ariaControls, id: id, onClick: onClick, disabled: disabled },
        react_1.default.createElement(ArrowToggle_1.ArrowToggle, { size: ComponentSizeToIconSizeMap[size], direction: expanded ? 'top' : 'bottom' }),
        summary));
}
exports.DefaultDisclosureSummary = DefaultDisclosureSummary;
DisclosureSummary.displayName = 'DisclosureSummary';
