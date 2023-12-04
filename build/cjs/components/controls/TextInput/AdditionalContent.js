"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalContent = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.block)('text-input');
exports.AdditionalContent = react_1.default.forwardRef(function AdditionalContent({ placement, children, onClick }, ref) {
    if (!children) {
        return null;
    }
    return (
    // It is used to focus the control input if non-interaction element is provided.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    react_1.default.createElement("div", { ref: ref, className: b('additional-content', { placement }), onClick: onClick }, children));
});
