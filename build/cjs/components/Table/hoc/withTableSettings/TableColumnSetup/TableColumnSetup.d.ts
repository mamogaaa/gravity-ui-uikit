import React from 'react';
import type { PopperPlacement } from '../../../../../hooks/private';
import type { TableColumnSetupItem } from '../withTableSettings';
type Item = TableColumnSetupItem;
interface SwitcherProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}
export interface TableColumnSetupProps {
    disabled?: boolean;
    /**
     * @deprecated Use renderSwitcher instead
     */
    switcher?: React.ReactElement | undefined;
    renderSwitcher?: (props: SwitcherProps) => React.ReactElement | undefined;
    items: Item[];
    sortable?: boolean;
    filterable?: boolean;
    onUpdate: (updated: Item[]) => void;
    popupWidth?: number | string;
    popupPlacement?: PopperPlacement;
    getItemTitle?: (item: Item) => TableColumnSetupItem['title'];
    showStatus?: boolean;
    className?: string;
}
export declare const TableColumnSetup: (props: TableColumnSetupProps) => React.JSX.Element;
export {};
