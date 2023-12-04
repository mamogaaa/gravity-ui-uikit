"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFilter = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const controls_1 = require("../../../controls");
const cn_1 = require("../../../utils/cn");
const b = (0, cn_1.blockNew)('select-filter');
const style = {
    padding: '4px 4px 0',
};
exports.SelectFilter = react_1.default.forwardRef((props, ref) => {
    const { onChange, onKeyDown, renderFilter, size, value, placeholder } = props;
    const inputRef = react_1.default.useRef(null);
    react_1.default.useImperativeHandle(ref, () => ({
        focus: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true }); },
    }), []);
    return renderFilter ? (renderFilter({ onChange, onKeyDown, value, ref: inputRef, style })) : (react_1.default.createElement("div", { className: b(), style: style },
        react_1.default.createElement(controls_1.TextInput, { controlRef: inputRef, controlProps: { className: b('input'), size: 1 }, size: size, value: value, placeholder: placeholder, onUpdate: onChange, onKeyDown: onKeyDown })));
});
exports.SelectFilter.displayName = 'SelectFilter';
