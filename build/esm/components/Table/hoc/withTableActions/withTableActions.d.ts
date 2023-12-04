import React from 'react';
import type { MenuItemProps } from '../../../Menu';
import type { TableColumnConfig, TableDataItem, TableProps } from '../../Table';
import './withTableActions.css';
export declare const actionsColumnId = "_actions";
export declare function enhanceSystemColumn<I>(columns: TableColumnConfig<I>[], enhancer: (systemColumn: TableColumnConfig<I>) => void): TableColumnConfig<I>[];
export interface TableAction<I> {
    text: string;
    handler: (item: I, index: number, event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) => void;
    disabled?: boolean;
    theme?: MenuItemProps['theme'];
    icon?: MenuItemProps['iconStart'];
}
export interface TableActionGroup<I> {
    title: string;
    items: TableActionConfig<I>[];
}
export type TableActionConfig<I> = TableAction<I> | TableActionGroup<I>;
/**
 * common sizes for Menu and Button
 */
export type TableRowActionsSize = 's' | 'm' | 'l' | 'xl';
export interface WithTableActionsProps<I> {
    getRowActions: (item: I, index: number) => TableActionConfig<I>[];
    rowActionsSize?: TableRowActionsSize;
}
export declare function withTableActions<I extends TableDataItem, E extends {} = {}>(TableComponent: React.ComponentType<TableProps<I> & E>): React.ComponentType<TableProps<I> & WithTableActionsProps<I> & E>;
