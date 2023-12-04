import React from 'react';
import { Modal } from '../Modal';
import { block } from '../utils/cn';
import { ButtonClose } from './ButtonClose/ButtonClose';
import { DialogBody } from './DialogBody/DialogBody';
import { DialogDivider } from './DialogDivider/DialogDivider';
import { DialogFooter } from './DialogFooter/DialogFooter';
import { DialogHeader } from './DialogHeader/DialogHeader';
import './Dialog.css';
const b = block('dialog');
export class Dialog extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCloseButtonClick = (event) => {
            const { onClose } = this.props;
            onClose(event.nativeEvent, 'closeButtonClick');
        };
    }
    render() {
        const { container, children, open, disableBodyScrollLock, disableEscapeKeyDown, disableOutsideClick, disableFocusTrap, disableAutoFocus, restoreFocusRef, keepMounted, size, className, modalClassName, hasCloseButton, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, onTransitionEnter, onTransitionEntered, onTransitionExit, onTransitionExited, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, qa, } = this.props;
        return (React.createElement(Modal, { open: open, disableBodyScrollLock: disableBodyScrollLock, disableEscapeKeyDown: disableEscapeKeyDown, disableOutsideClick: disableOutsideClick, disableFocusTrap: disableFocusTrap, disableAutoFocus: disableAutoFocus, restoreFocusRef: restoreFocusRef, keepMounted: keepMounted, onEscapeKeyDown: onEscapeKeyDown, onEnterKeyDown: onEnterKeyDown, onOutsideClick: onOutsideClick, onClose: onClose, onTransitionEnter: onTransitionEnter, onTransitionEntered: onTransitionEntered, onTransitionExit: onTransitionExit, onTransitionExited: onTransitionExited, className: b('modal', modalClassName), "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, container: container, qa: qa },
            React.createElement("div", { className: b({ size, 'has-close': hasCloseButton }, className) },
                children,
                hasCloseButton && React.createElement(ButtonClose, { onClose: this.handleCloseButtonClick }))));
    }
}
Dialog.defaultProps = {
    disableBodyScrollLock: false,
    disableEscapeKeyDown: false,
    disableOutsideClick: false,
    keepMounted: false,
    hasCloseButton: true,
};
Dialog.Footer = DialogFooter;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Divider = DialogDivider;
