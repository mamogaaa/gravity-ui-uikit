"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Modal_1 = require("../Modal");
const cn_1 = require("../utils/cn");
const ButtonClose_1 = require("./ButtonClose/ButtonClose");
const DialogBody_1 = require("./DialogBody/DialogBody");
const DialogDivider_1 = require("./DialogDivider/DialogDivider");
const DialogFooter_1 = require("./DialogFooter/DialogFooter");
const DialogHeader_1 = require("./DialogHeader/DialogHeader");
const b = (0, cn_1.block)('dialog');
class Dialog extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleCloseButtonClick = (event) => {
            const { onClose } = this.props;
            onClose(event.nativeEvent, 'closeButtonClick');
        };
    }
    render() {
        const { container, children, open, disableBodyScrollLock, disableEscapeKeyDown, disableOutsideClick, disableFocusTrap, disableAutoFocus, restoreFocusRef, keepMounted, size, className, modalClassName, hasCloseButton, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, onTransitionEnter, onTransitionEntered, onTransitionExit, onTransitionExited, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, qa, } = this.props;
        return (react_1.default.createElement(Modal_1.Modal, { open: open, disableBodyScrollLock: disableBodyScrollLock, disableEscapeKeyDown: disableEscapeKeyDown, disableOutsideClick: disableOutsideClick, disableFocusTrap: disableFocusTrap, disableAutoFocus: disableAutoFocus, restoreFocusRef: restoreFocusRef, keepMounted: keepMounted, onEscapeKeyDown: onEscapeKeyDown, onEnterKeyDown: onEnterKeyDown, onOutsideClick: onOutsideClick, onClose: onClose, onTransitionEnter: onTransitionEnter, onTransitionEntered: onTransitionEntered, onTransitionExit: onTransitionExit, onTransitionExited: onTransitionExited, className: b('modal', modalClassName), "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, container: container, qa: qa },
            react_1.default.createElement("div", { className: b({ size, 'has-close': hasCloseButton }, className) },
                children,
                hasCloseButton && react_1.default.createElement(ButtonClose_1.ButtonClose, { onClose: this.handleCloseButtonClick }))));
    }
}
exports.Dialog = Dialog;
Dialog.defaultProps = {
    disableBodyScrollLock: false,
    disableEscapeKeyDown: false,
    disableOutsideClick: false,
    keepMounted: false,
    hasCloseButton: true,
};
Dialog.Footer = DialogFooter_1.DialogFooter;
Dialog.Header = DialogHeader_1.DialogHeader;
Dialog.Body = DialogBody_1.DialogBody;
Dialog.Divider = DialogDivider_1.DialogDivider;
