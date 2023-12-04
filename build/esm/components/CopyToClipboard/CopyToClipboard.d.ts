import React from 'react';
import { CopyToClipboardStatus } from './types';
import type { CopyToClipboardBaseProps, CopyToClipboardContent } from './types';
interface CopyToClipboardGeneralProps extends CopyToClipboardBaseProps {
    children: CopyToClipboardContent;
}
interface CopyToClipboardDefaultProps {
    timeout: number;
}
interface CopyToClipboardInnerProps extends CopyToClipboardGeneralProps, CopyToClipboardDefaultProps {
}
export interface CopyToClipboardProps extends CopyToClipboardGeneralProps, Partial<CopyToClipboardDefaultProps> {
}
interface CopyToClipboardState {
    status: CopyToClipboardStatus;
}
export declare class CopyToClipboard extends React.Component<CopyToClipboardInnerProps, CopyToClipboardState> {
    static INITIAL_STATUS: CopyToClipboardStatus;
    state: CopyToClipboardState;
    private timerId?;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    private handleCopy;
}
export {};
