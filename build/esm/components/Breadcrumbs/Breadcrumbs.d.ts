import React from 'react';
import type { PopupPlacement } from '../Popup';
import './Breadcrumbs.css';
export interface BreadcrumbsItem {
    text: string;
    action: (event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
    href?: string;
    items?: BreadcrumbsItem[];
    title?: string;
}
export interface BreadcrumbsProps<T extends BreadcrumbsItem = BreadcrumbsItem> {
    items: T[];
    className?: string;
    renderRootContent?: (item: T, isCurrent: boolean) => React.ReactNode;
    renderItemContent?: (item: T, isCurrent: boolean, isPrevCurrent: boolean) => React.ReactNode;
    renderItemDivider?: () => React.ReactNode;
    lastDisplayedItemsCount: LastDisplayedItemsCount;
    firstDisplayedItemsCount: FirstDisplayedItemsCount;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
}
interface BreadcrumbsState<T extends BreadcrumbsItem> {
    calculated: boolean;
    rootItem: T | undefined;
    visibleItems: T[];
    hiddenItems: T[];
    allItems: T[];
}
export declare enum LastDisplayedItemsCount {
    One = 1,
    Two = 2
}
export declare enum FirstDisplayedItemsCount {
    Zero = 0,
    One = 1
}
export declare class Breadcrumbs<T extends BreadcrumbsItem = BreadcrumbsItem> extends React.Component<BreadcrumbsProps<T>, BreadcrumbsState<T>> {
    static defaultProps: {
        popupPlacement: string[];
    };
    static prepareInitialState<T extends BreadcrumbsItem>(props: BreadcrumbsProps<T>): {
        calculated: boolean;
        rootItem: T | undefined;
        visibleItems: T[];
        hiddenItems: never[];
        allItems: T[];
    };
    static getDerivedStateFromProps<T extends BreadcrumbsItem>(props: BreadcrumbsProps<T>, state: BreadcrumbsState<T>): {
        calculated: boolean;
        rootItem: T | undefined;
        visibleItems: T[];
        hiddenItems: never[];
        allItems: T[];
    } | null;
    private container;
    private resizeObserver;
    constructor(props: BreadcrumbsProps<T>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: BreadcrumbsProps<T>): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    renderItem(data: T, isCurrent: boolean, isPrevCurrent: boolean): React.JSX.Element;
    renderItemDivider(): React.JSX.Element;
    renderRootItem(): React.JSX.Element | null;
    renderVisibleItems(): React.JSX.Element[];
    renderMoreItem(): React.JSX.Element | null;
    private recalculate;
    private handleResize;
}
export {};
