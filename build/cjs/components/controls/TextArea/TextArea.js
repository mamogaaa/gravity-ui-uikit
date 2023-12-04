"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../../hooks");
const cn_1 = require("../../utils/cn");
const common_1 = require("../common");
const OuterAdditionalContent_1 = require("../common/OuterAdditionalContent/OuterAdditionalContent");
const utils_1 = require("../utils");
const TextAreaControl_1 = require("./TextAreaControl");
const b = (0, cn_1.blockNew)('text-area');
// eslint-disable-next-line complexity
exports.TextArea = react_1.default.forwardRef(function TextArea(props, ref) {
    const { view = 'normal', size = 'm', pin = 'round-round', name, value, defaultValue, disabled = false, hasClear = false, error, errorMessage: errorMessageProp, validationState: validationStateProp, autoComplete, id: originalId, tabIndex, style, className, qa, controlProps, note, onUpdate, onChange, } = props;
    const { errorMessage, validationState } = (0, utils_1.errorPropsMapper)({
        error,
        errorMessage: errorMessageProp,
        validationState: validationStateProp,
    });
    const [uncontrolledValue, setUncontrolledValue] = react_1.default.useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : '');
    const innerControlRef = react_1.default.useRef(null);
    const [hasVerticalScrollbar, setHasVerticalScrollbar] = react_1.default.useState(false);
    const state = (0, utils_1.getInputControlState)(validationState);
    const handleRef = (0, hooks_1.useForkRef)(props.controlRef, innerControlRef);
    const innerId = (0, hooks_1.useUniqId)();
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isErrorMsgVisible = validationState === 'invalid' && Boolean(errorMessage);
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const id = originalId || innerId;
    const errorMessageId = (0, hooks_1.useUniqId)();
    const noteId = (0, hooks_1.useUniqId)();
    const ariaDescribedBy = [
        controlProps === null || controlProps === void 0 ? void 0 : controlProps['aria-describedby'],
        note ? noteId : undefined,
        isErrorMsgVisible ? errorMessageId : undefined,
    ]
        .filter(Boolean)
        .join(' ');
    const commonProps = {
        id,
        tabIndex,
        name,
        onChange(event) {
            const newValue = event.target.value;
            if (!isControlled) {
                setUncontrolledValue(newValue);
            }
            if (onChange) {
                onChange(event);
            }
            if (onUpdate) {
                onUpdate(newValue);
            }
        },
        autoComplete: (0, utils_1.prepareAutoComplete)(autoComplete),
        controlProps: Object.assign(Object.assign({}, controlProps), { 'aria-describedby': ariaDescribedBy || undefined, 'aria-invalid': validationState === 'invalid' || undefined }),
    };
    const handleClear = (event) => {
        const control = innerControlRef.current;
        if (control) {
            control.focus();
            const syntheticEvent = Object.create(event);
            syntheticEvent.target = control;
            syntheticEvent.currentTarget = control;
            control.value = '';
            if (onChange) {
                onChange(syntheticEvent);
            }
            if (onUpdate) {
                onUpdate('');
            }
        }
        if (!isControlled) {
            setUncontrolledValue('');
        }
    };
    react_1.default.useEffect(() => {
        const control = innerControlRef.current;
        if (control) {
            const currHasVerticalScrollbar = control.scrollHeight > control.clientHeight;
            if (hasVerticalScrollbar !== currHasVerticalScrollbar) {
                setHasVerticalScrollbar(currHasVerticalScrollbar);
            }
        }
    }, [inputValue, hasVerticalScrollbar]);
    return (react_1.default.createElement("span", { ref: ref, style: style, className: b({
            view,
            size,
            disabled,
            state,
            pin: view === 'clear' ? undefined : pin,
            'has-clear': isClearControlVisible,
            'has-scrollbar': hasVerticalScrollbar,
        }, className), "data-qa": qa },
        react_1.default.createElement("span", { className: b('content') },
            react_1.default.createElement(TextAreaControl_1.TextAreaControl, Object.assign({}, props, commonProps, { controlRef: handleRef })),
            isClearControlVisible && (react_1.default.createElement(common_1.ClearButton, { className: b('clear', { size }), size: (0, common_1.mapTextInputSizeToButtonSize)(size), onClick: handleClear }))),
        react_1.default.createElement(OuterAdditionalContent_1.OuterAdditionalContent, { errorMessage: isErrorMsgVisible ? errorMessage : null, errorMessageId: errorMessageId, note: note, noteId: noteId })));
});
