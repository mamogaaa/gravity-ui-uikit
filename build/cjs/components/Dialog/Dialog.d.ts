import React from 'react';
import type { ModalCloseReason, ModalProps } from '../Modal';
import type { QAProps } from '../types';
import { DialogBody } from './DialogBody/DialogBody';
import { DialogDivider } from './DialogDivider/DialogDivider';
import { DialogFooter } from './DialogFooter/DialogFooter';
import { DialogHeader } from './DialogHeader/DialogHeader';
interface DialogOwnProps {
    open: boolean;
    children: React.ReactNode;
    onEscapeKeyDown?: ModalProps['onEscapeKeyDown'];
    onEnterKeyDown?: ModalProps['onEnterKeyDown'];
    onOutsideClick?: ModalProps['onOutsideClick'];
    onClose: (event: MouseEvent | KeyboardEvent, reason: ModalCloseReason | 'closeButtonClick') => void;
    onTransitionEnter?: ModalProps['onTransitionEnter'];
    onTransitionEntered?: ModalProps['onTransitionEntered'];
    onTransitionExit?: ModalProps['onTransitionExit'];
    onTransitionExited?: ModalProps['onTransitionExited'];
    className?: string;
    modalClassName?: string;
    size?: 's' | 'm' | 'l';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    container?: HTMLElement;
    disableFocusTrap?: boolean;
    disableAutoFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
}
interface DialogDefaultProps {
    disableBodyScrollLock: boolean;
    disableEscapeKeyDown: boolean;
    disableOutsideClick: boolean;
    keepMounted: boolean;
    hasCloseButton: boolean;
}
export type DialogProps = DialogOwnProps & Partial<DialogDefaultProps>;
type DialogInnerProps = DialogOwnProps & DialogDefaultProps & QAProps;
export declare class Dialog extends React.Component<DialogInnerProps> {
    static defaultProps: DialogDefaultProps;
    static Footer: typeof DialogFooter;
    static Header: typeof DialogHeader;
    static Body: typeof DialogBody;
    static Divider: typeof DialogDivider;
    render(): React.JSX.Element;
    private handleCloseButtonClick;
}
export {};
