import React from 'react';
import type { DOMProps, QAProps } from '../types';
import type { LayerCloseReason } from '../utils/layer-manager';
import type { LayerExtendableProps } from '../utils/layer-manager/LayerManager';
export interface ModalProps extends DOMProps, LayerExtendableProps, QAProps {
    open?: boolean;
    keepMounted?: boolean;
    disableBodyScrollLock?: boolean;
    /** @deprecated Use focusTrap instead */
    disableFocusTrap?: boolean;
    /** @deprecated Use autoFocus instead */
    disableAutoFocus?: boolean;
    focusTrap?: boolean;
    autoFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    /**
     * Id of visible `<Modal/>` caption element
     */
    'aria-labelledby'?: string;
    /**
     * A11y text
     * Prefer `aria-labelledby` in case caption is visible to user
     */
    'aria-label'?: string;
    container?: HTMLElement;
    contentClassName?: string;
    onTransitionEnter?: VoidFunction;
    onTransitionEntered?: VoidFunction;
    onTransitionExit?: VoidFunction;
    onTransitionExited?: VoidFunction;
}
export type ModalCloseReason = LayerCloseReason;
export declare function Modal({ open, keepMounted, disableBodyScrollLock, disableEscapeKeyDown, disableOutsideClick, disableFocusTrap, disableAutoFocus, focusTrap, autoFocus, restoreFocusRef, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, onTransitionEnter, onTransitionEntered, onTransitionExit, onTransitionExited, children, style, className, contentClassName, 'aria-labelledby': ariaLabelledBy, 'aria-label': ariaLabel, container, qa, }: ModalProps): React.JSX.Element;
