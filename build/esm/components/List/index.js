import React from 'react';
import { List, listDefaultProps } from './List';
export * from './List';
export * from './types';
export * from './components/ListItem';
export { ListQa } from './constants';
/** @deprecated Use `<List/>` */
export const ListWrapper = (props) => React.createElement(List, Object.assign({}, props));
ListWrapper.defaultProps = listDefaultProps;
