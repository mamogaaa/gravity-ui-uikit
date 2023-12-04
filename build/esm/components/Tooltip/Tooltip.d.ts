import React from 'react';
import type { PopupPlacement } from '../Popup';
import type { DOMProps } from '../types';
import './Tooltip.css';
export interface TooltipProps extends DOMProps, TooltipDelayProps {
    id?: string;
    disabled?: boolean;
    content?: React.ReactNode;
    placement?: PopupPlacement;
    children: React.ReactElement;
    contentClassName?: string;
    disablePortal?: boolean;
}
interface TooltipDelayProps {
    openDelay?: number;
    closeDelay?: number;
}
export declare const Tooltip: (props: TooltipProps) => React.JSX.Element;
export {};
