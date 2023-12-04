import React from 'react';
import type { DroppableProvided } from 'react-beautiful-dnd';
import type { ListItem } from './ListItem';
export type SimpleContainerProps = React.PropsWithChildren<{
    itemCount: number;
    provided?: DroppableProvided;
    sortable?: boolean;
}>;
type RefsList = Record<number, React.RefObject<ListItem>>;
export type SimpleContainerState = {
    refsList: RefsList;
    minWidth?: number;
    minHeight?: number;
};
export declare class SimpleContainer extends React.Component<SimpleContainerProps, SimpleContainerState> {
    static getDerivedStateFromProps({ itemCount }: SimpleContainerProps, prevState: SimpleContainerState): SimpleContainerState;
    node: HTMLDivElement | null;
    constructor(props: SimpleContainerProps);
    componentDidMount(): void;
    render(): React.JSX.Element;
    scrollToItem(index: number): void;
    private setRef;
}
export {};
