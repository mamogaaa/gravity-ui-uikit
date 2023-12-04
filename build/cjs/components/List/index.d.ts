import React from 'react';
import type { ListProps } from './types';
export * from './List';
export * from './types';
export * from './components/ListItem';
export { ListQa } from './constants';
/** @deprecated Use `<List/>` */
export declare const ListWrapper: {
    (props: ListProps<any>): React.JSX.Element;
    defaultProps: Partial<ListProps<{
        disabled?: boolean | undefined;
    }>>;
};
