import React from 'react';
import type { TableColumnConfig, TableDataItem, TableProps } from '../../Table';
interface SortableItem {
    id: string;
    title: React.ReactNode;
    isSelected?: boolean;
    isProtected?: boolean;
}
export interface TableColumnSetupItem {
    id: string;
    title: React.ReactNode;
    selected?: boolean;
    required?: boolean;
}
export type TableSettingsData = Array<{
    id: string;
    isSelected?: boolean;
}>;
export declare function filterColumns<I>(columns: TableColumnConfig<I>[], settings: TableSettingsData): TableColumnConfig<I>[];
export declare function getColumnStringTitle<Data>(column: TableColumnConfig<Data>): string;
export declare function getActualItems<I>(columns: TableColumnConfig<I>[], settings: TableSettingsData): SortableItem[];
export interface WithTableSettingsOptions {
    width?: number | string;
    sortable?: boolean;
}
export interface WithTableSettingsProps {
    /**
     * @deprecated Use factory notation: "withTableSettings({width: <value>})(Table)"
     */
    settingsPopupWidth?: number | string;
    settings: TableSettingsData;
    updateSettings: (data: TableSettingsData) => void;
}
export declare function withTableSettings<I extends TableDataItem, E extends {} = {}>(Component: React.ComponentType<TableProps<I> & E>): React.ComponentType<TableProps<I> & WithTableSettingsProps & E>;
export declare function withTableSettings<I extends TableDataItem, E extends {} = {}>(options?: WithTableSettingsOptions): (Component: React.ComponentType<TableProps<I> & E>) => React.ComponentType<TableProps<I> & WithTableSettingsProps & E>;
export {};
