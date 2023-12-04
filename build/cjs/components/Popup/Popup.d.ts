import React from 'react';
import type { PopperAnchorRef, PopperPlacement, PopperProps } from '../../hooks/private';
import type { DOMProps, QAProps } from '../types';
import type { LayerExtendableProps } from '../utils/layer-manager/LayerManager';
export type PopupPlacement = PopperPlacement;
export type PopupAnchorRef = PopperAnchorRef;
export interface PopupProps extends DOMProps, LayerExtendableProps, PopperProps, QAProps {
    open?: boolean;
    children?: React.ReactNode;
    keepMounted?: boolean;
    hasArrow?: boolean;
    disableLayer?: boolean;
    /** @deprecated Add onClick handler to children */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    disablePortal?: boolean;
    container?: HTMLElement;
    contentClassName?: string;
    restoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    role?: React.AriaRole;
    id?: string;
    focusTrap?: boolean;
    autoFocus?: boolean;
}
export declare function Popup({ keepMounted, hasArrow, offset, open, placement, anchorRef, disableEscapeKeyDown, disableOutsideClick, disableLayer, style, className, contentClassName, modifiers, children, onEscapeKeyDown, onOutsideClick, onClose, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, disablePortal, container, strategy, qa, restoreFocus, restoreFocusRef, role, id, focusTrap, autoFocus, }: PopupProps): React.JSX.Element;
