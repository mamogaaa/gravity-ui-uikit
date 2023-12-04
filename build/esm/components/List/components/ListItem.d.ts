import React from 'react';
import type { ListItemProps } from '../types';
export declare const defaultRenderItem: <T extends unknown>(item: T) => string;
export declare class ListItem<T = unknown> extends React.Component<ListItemProps<T>> {
    private static publishEvent;
    node: HTMLDivElement | null;
    render(): React.JSX.Element;
    getNode: () => HTMLDivElement | null;
    private setRef;
    private renderSortIcon;
    private renderContent;
    private onClick;
    private onClickCapture;
    private onMouseEnter;
    private onMouseLeave;
}
