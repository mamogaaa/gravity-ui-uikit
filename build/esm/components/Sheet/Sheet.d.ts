import React from 'react';
import type { QAProps } from '../types';
import './Sheet.css';
export interface SheetProps extends QAProps {
    children?: React.ReactNode;
    onClose?: () => void;
    /** Show/hide sheet */
    visible: boolean;
    /** ID of the sheet, used as hash in URL. It's important to specify different `id` values if there can be more than one sheet on the page */
    id?: string;
    /** Title of the sheet window */
    title?: string;
    /** Class name for the sheet window */
    className?: string;
    /** Class name for the sheet content */
    contentClassName?: string;
    /** Class name for the swipe area */
    swipeAreaClassName?: string;
    /** Enable the behavior in which you can close the sheet window with a swipe down if the content is scrolled to its top (`contentNode.scrollTop === 0`) or has no scroll at all */
    allowHideOnContentScroll?: boolean;
    /** Hide top bar with resize handle */
    hideTopBar?: boolean;
}
interface SheetState {
    visible: boolean;
}
export declare class Sheet extends React.Component<SheetProps, SheetState> {
    private static bodyScrollLocksCount;
    private static bodyInitialOverflow;
    static lockBodyScroll(): void;
    static restoreBodyScroll(): void;
    bodyScrollLocked: boolean;
    state: SheetState;
    componentDidMount(): void;
    componentDidUpdate(prevProps: SheetProps): void;
    componentWillUnmount(): void;
    render(): React.ReactPortal | null;
    restoreBodyScroll(): void;
    lockBodyScroll(): void;
    private renderSheet;
    private showSheet;
    private hideSheet;
}
export {};
