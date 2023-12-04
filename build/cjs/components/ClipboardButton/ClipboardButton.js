"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipboardButton = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = require("../Button");
const ClipboardIcon_1 = require("../ClipboardIcon");
const CopyToClipboard_1 = require("../CopyToClipboard");
const types_1 = require("../CopyToClipboard/types");
const Tooltip_1 = require("../Tooltip");
const cn_1 = require("../utils/cn");
const i18n_1 = tslib_1.__importDefault(require("./i18n"));
const b = (0, cn_1.block)('clipboard-button');
const DEFAULT_ICON_SIZE = 24;
const DEFAULT_TIMEOUT = 1000;
const ClipboardButtonComponent = (props) => {
    const { size = DEFAULT_ICON_SIZE, className, qa, hasTooltip = true, tooltipInitialText = (0, i18n_1.default)('startCopy'), tooltipSuccessText = (0, i18n_1.default)('endCopy'), status, onClick, } = props;
    const buttonRef = react_1.default.useRef(null);
    react_1.default.useEffect(() => {
        var _a;
        (_a = buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--yc-button-height', `${size}px`);
    }, [size]);
    return (react_1.default.createElement(Tooltip_1.Tooltip, { disabled: !hasTooltip, content: status === types_1.CopyToClipboardStatus.Success ? tooltipSuccessText : tooltipInitialText },
        react_1.default.createElement(Button_1.Button, { ref: buttonRef, view: "flat", className: b(null, className), qa: qa, onClick: onClick },
            react_1.default.createElement(Button_1.Button.Icon, null,
                react_1.default.createElement(ClipboardIcon_1.ClipboardIcon, { status: status, size: size, className: b('icon') })))));
};
function ClipboardButton(props) {
    const { text, timeout = DEFAULT_TIMEOUT, onCopy, options } = props, buttonProps = tslib_1.__rest(props, ["text", "timeout", "onCopy", "options"]);
    return (react_1.default.createElement(CopyToClipboard_1.CopyToClipboard, { text: text, timeout: timeout, onCopy: onCopy, options: options }, (status) => react_1.default.createElement(ClipboardButtonComponent, Object.assign({}, buttonProps, { status: status }))));
}
exports.ClipboardButton = ClipboardButton;
