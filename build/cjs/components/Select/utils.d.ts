import React from 'react';
import type { List, ListItemData } from '../List';
import type { SelectOption, SelectOptionGroup, SelectProps, SelectSize } from './types';
export type GroupTitleItem = {
    label: string;
    disabled: true;
};
export type FlattenOption = SelectOption | GroupTitleItem;
export declare const getFlattenOptions: (options: (SelectOption | SelectOptionGroup)[]) => FlattenOption[];
export declare const getPopupItemHeight: (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: SelectSize;
    option: FlattenOption;
    index: number;
    mobile: boolean;
}) => number;
export declare const getOptionsHeight: (args: {
    getOptionHeight?: SelectProps['getOptionHeight'];
    getOptionGroupHeight?: SelectProps['getOptionGroupHeight'];
    size: NonNullable<SelectProps['size']>;
    options: FlattenOption[];
    mobile: boolean;
}) => number;
export declare const getSelectedOptionsContent: (flattenOptions: FlattenOption[], value: string[], renderSelectedOption?: SelectProps['renderSelectedOption']) => React.ReactNode;
export declare const getOptionsFromChildren: (children: SelectProps['children']) => (SelectOption<any> | SelectOptionGroup<any>)[];
export declare const getNextQuickSearch: (keyCode: string, quickSearch: string) => string;
export declare const findItemIndexByQuickSearch: (quickSearch: string, items?: ListItemData<FlattenOption>[]) => number;
export declare const getListItems: (listRef: React.RefObject<List<FlattenOption>>) => ListItemData<FlattenOption>[];
export declare const getActiveItem: (listRef: React.RefObject<List<FlattenOption>>) => ListItemData<FlattenOption> | undefined;
export declare const activateFirstClickableItem: (listRef: React.RefObject<List<FlattenOption>>) => void;
export declare const getFilteredFlattenOptions: (args: {
    options: FlattenOption[];
    filter: string;
    filterOption?: SelectProps['filterOption'];
}) => FlattenOption[];
