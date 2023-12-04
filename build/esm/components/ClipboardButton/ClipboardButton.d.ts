import React from 'react';
import type { ButtonProps } from '../Button';
import { CopyToClipboardStatus } from '../CopyToClipboard/types';
import type { CopyToClipboardBaseProps } from '../CopyToClipboard/types';
import type { QAProps } from '../types';
import './ClipboardButton.css';
export interface ClipboardButtonProps extends CopyToClipboardBaseProps, Omit<ClipboardButtonComponentProps, 'status' | 'onClick'>, QAProps {
    /** Time to restore initial state, ms */
    timeout?: number;
}
interface ClipboardButtonComponentProps extends QAProps {
    /** Icon size in pixels */
    size?: number;
    /** Element CSS class */
    className?: string;
    status: CopyToClipboardStatus;
    onClick?: ButtonProps['onClick'];
    /** Disable tooltip. Tooltip won't be shown */
    hasTooltip?: boolean;
    /** Text shown before copy */
    tooltipInitialText?: string;
    /** Text shown after copy */
    tooltipSuccessText?: string;
}
export declare function ClipboardButton(props: ClipboardButtonProps): React.JSX.Element;
export {};
