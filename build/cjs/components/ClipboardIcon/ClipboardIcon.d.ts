import React from 'react';
import { CopyToClipboardStatus } from '../CopyToClipboard/types';
export interface ClipboardIconProps {
    size: number;
    status: CopyToClipboardStatus;
    className?: string;
}
export declare function ClipboardIcon({ size, status, className }: ClipboardIconProps): React.JSX.Element;
