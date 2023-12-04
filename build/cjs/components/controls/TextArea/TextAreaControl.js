"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaControl = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../../hooks");
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.blockNew)('text-area');
const calculateLinesByScrollHeight = (args) => {
    const { height, lineHeight } = args;
    const paddingTop = Number.isNaN(args.paddingTop) ? 0 : args.paddingTop;
    const paddingBottom = Number.isNaN(args.paddingBottom) ? 0 : args.paddingBottom;
    return (height - paddingTop - paddingBottom) / lineHeight;
};
function TextAreaControl(props) {
    var _a;
    const { name, id, tabIndex, autoComplete, placeholder, value, defaultValue, controlRef, controlProps, size, rows, minRows = 1, maxRows, autoFocus, disabled, onChange, onFocus, onBlur, onKeyDown, onKeyUp, onKeyPress, } = props;
    const innerControlRef = react_1.default.useRef(null);
    const handleRef = (0, hooks_1.useForkRef)(controlRef, innerControlRef);
    const textareaRows = rows || minRows;
    const innerValue = value || ((_a = innerControlRef === null || innerControlRef === void 0 ? void 0 : innerControlRef.current) === null || _a === void 0 ? void 0 : _a.value);
    const resizeHeight = react_1.default.useCallback(() => {
        const control = innerControlRef === null || innerControlRef === void 0 ? void 0 : innerControlRef.current;
        if (control && !rows) {
            const controlStyles = getComputedStyle(control);
            const lineHeight = parseInt(controlStyles.getPropertyValue('line-height'), 10);
            const paddingTop = parseInt(controlStyles.getPropertyValue('padding-top'), 10);
            const paddingBottom = parseInt(controlStyles.getPropertyValue('padding-bottom'), 10);
            const linesWithCarriageReturn = ((innerValue === null || innerValue === void 0 ? void 0 : innerValue.match(/\n/g)) || []).length + 1;
            const linesByScrollHeight = calculateLinesByScrollHeight({
                height: control.scrollHeight,
                paddingTop,
                paddingBottom,
                lineHeight,
            });
            control.style.height = 'auto';
            if (maxRows && maxRows < Math.max(linesByScrollHeight, linesWithCarriageReturn)) {
                control.style.height = `${maxRows * lineHeight + 2 * paddingTop}px`;
            }
            else if (linesWithCarriageReturn > 1 || linesByScrollHeight > 1) {
                control.style.height = `${control.scrollHeight}px`;
            }
        }
    }, [rows, maxRows, innerValue]);
    react_1.default.useEffect(() => {
        resizeHeight();
    }, [resizeHeight, size, value]);
    return (react_1.default.createElement("textarea", Object.assign({}, controlProps, { ref: handleRef, style: Object.assign(Object.assign({}, controlProps === null || controlProps === void 0 ? void 0 : controlProps.style), { height: rows ? 'auto' : undefined }), className: b('control', controlProps === null || controlProps === void 0 ? void 0 : controlProps.className), name: name, id: id, tabIndex: tabIndex, placeholder: placeholder, value: value, defaultValue: defaultValue, rows: textareaRows, autoFocus: autoFocus, autoComplete: autoComplete, onChange: onChange, onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress, disabled: disabled })));
}
exports.TextAreaControl = TextAreaControl;
