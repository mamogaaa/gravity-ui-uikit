import React from 'react';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { DragDropContext, Draggable, Droppable, } from 'react-beautiful-dnd';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as ListContainer } from 'react-window';
import { SelectLoadingIndicator } from '../Select/components/SelectList/SelectLoadingIndicator';
import { TextInput } from '../controls';
import { MobileContext } from '../mobile';
import { block } from '../utils/cn';
import { getUniqId } from '../utils/common';
import { ListItem, SimpleContainer, defaultRenderItem } from './components';
import { listNavigationIgnoredKeys } from './constants';
import './List.css';
const b = block('list');
const DEFAULT_ITEM_HEIGHT = 28;
export const listDefaultProps = {
    items: [],
    itemClassName: '',
    filterable: true,
    sortable: false,
    virtualized: true,
    deactivateOnLeave: true,
};
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
export class List extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: this.props.items,
            filter: '',
        };
        this.refFilter = React.createRef();
        this.refContainer = React.createRef();
        this.blurTimer = null;
        this.loadingItem = { value: '__LIST_ITEM_LOADING__', disabled: true };
        this.uniqId = getUniqId();
        this.onKeyDown = (event) => {
            const { activeItem, pageSize } = this.state;
            if (listNavigationIgnoredKeys.includes(event.key)) {
                return;
            }
            switch (event.key) {
                case 'ArrowDown': {
                    this.handleKeyMove(event, 1, -1);
                    break;
                }
                case 'ArrowUp': {
                    this.handleKeyMove(event, -1);
                    break;
                }
                case 'PageDown': {
                    this.handleKeyMove(event, pageSize);
                    break;
                }
                case 'PageUp': {
                    this.handleKeyMove(event, -pageSize);
                    break;
                }
                case 'Home': {
                    this.handleKeyMove(event, this.state.items.length - (activeItem || 0));
                    break;
                }
                case 'End': {
                    this.handleKeyMove(event, -(activeItem || 0) - 1);
                    break;
                }
                case 'Enter': {
                    if (typeof activeItem === 'number' && this.props.onItemClick) {
                        this.props.onItemClick(this.state.items[activeItem], activeItem, true);
                    }
                    break;
                }
                default: {
                    if (this.refFilter.current) {
                        this.refFilter.current.focus();
                    }
                }
            }
        };
        this.renderItemContent = (item, isItemActive, itemIndex) => {
            const { onLoadMore } = this.props;
            if (isObject(item) && 'value' in item && item.value === this.loadingItem.value) {
                return (React.createElement(SelectLoadingIndicator, { onIntersect: itemIndex === 0 ? undefined : onLoadMore }));
            }
            return this.props.renderItem
                ? this.props.renderItem(item, isItemActive, itemIndex)
                : defaultRenderItem(item);
        };
        this.renderItem = ({ index, style, provided, isDragging, }) => {
            var _a;
            const { sortHandleAlign, role } = this.props;
            const { items, activeItem } = this.state;
            const item = this.getItemsWithLoading()[index];
            const sortable = this.props.sortable && items.length > 1 && !this.getFilter();
            const active = index === activeItem || index === this.props.activeItemIndex;
            const selected = Array.isArray(this.props.selectedItemIndex)
                ? this.props.selectedItemIndex.includes(index)
                : index === this.props.selectedItemIndex;
            return (React.createElement(ListItem, { key: index, style: style, itemIndex: index, item: item, sortable: sortable, sortHandleAlign: sortHandleAlign, renderItem: this.renderItemContent, itemClassName: this.props.itemClassName, active: active, selected: selected, onActivate: this.onItemActivate, onClick: this.props.onItemClick, role: role === 'listbox' ? 'option' : 'listitem', listId: (_a = this.props.id) !== null && _a !== void 0 ? _a : this.uniqId, provided: provided, isDragging: isDragging }));
        };
        this.renderVirtualizedItem = ({ index, style, }) => {
            return (React.createElement(Draggable, { draggableId: String(index), index: index, key: `item-key-${index}` }, (provided) => this.renderItem({ index, style, provided })));
        };
        this.filterItem = (filter) => (item) => {
            return String(item).includes(filter);
        };
        this.scrollToIndex = (index) => {
            const container = this.refContainer.current;
            if (container) {
                container.scrollToItem(index);
            }
        };
        this.deactivate = () => {
            if (!this.blurTimer) {
                return;
            }
            if (this.props.deactivateOnLeave) {
                this.setState({ activeItem: undefined });
            }
        };
        this.handleFocus = () => {
            if (this.blurTimer) {
                clearTimeout(this.blurTimer);
                this.blurTimer = null;
            }
        };
        this.handleBlur = () => {
            if (!this.blurTimer) {
                this.blurTimer = setTimeout(this.deactivate, 50);
            }
        };
        this.onUpdateFilterInternal = (value) => {
            const { items, filterItem = this.filterItem, onFilterEnd } = this.props;
            this.setState({
                filter: value,
                items: value ? items.filter(filterItem(value)) : items,
            }, () => {
                if (onFilterEnd) {
                    onFilterEnd({ items: this.state.items });
                }
            });
        };
        this.onFilterUpdate = (value) => {
            if (this.props.onFilterUpdate) {
                this.props.onFilterUpdate(value);
            }
            else {
                this.onUpdateFilterInternal(value);
            }
        };
        this.onItemsRendered = ({ visibleStartIndex, visibleStopIndex, }) => {
            this.setState({
                pageSize: visibleStopIndex - visibleStartIndex,
            });
        };
        this.onItemActivate = (index) => {
            if (!this.state.sorting) {
                this.activateItem(index, false);
            }
        };
        this.onMouseLeave = () => {
            this.deactivate();
        };
        this.onSortStart = () => {
            this.setState({ sorting: true });
        };
        this.onSortEnd = (result) => {
            if (!result.destination) {
                return;
            }
            if (result.source.index === result.destination.index) {
                return;
            }
            const oldIndex = result.source.index;
            const newIndex = result.destination.index;
            if (this.props.onSortEnd) {
                this.props.onSortEnd({ oldIndex, newIndex });
            }
            const nextItems = reorder(this.getItems(), oldIndex, newIndex);
            this.setState({
                activeItem: newIndex,
                items: nextItems,
                sorting: false,
            });
        };
        this.getItemHeight = (index) => {
            const { itemHeight } = this.props;
            if (typeof itemHeight === 'function') {
                const { items } = this.state;
                return itemHeight(items[index], index);
            }
            return itemHeight;
        };
        this.getVirtualizedItemHeight = (index) => {
            return this.getItemHeight(index) || DEFAULT_ITEM_HEIGHT;
        };
    }
    static moveListElement(list, oldIndex, newIndex) {
        if (oldIndex !== newIndex) {
            const [item] = list.splice(oldIndex, 1);
            list.splice(newIndex, 0, item);
        }
        return list;
    }
    static findNextIndex(list, index, step) {
        const dataLength = list.length;
        let currentIndex = (index + dataLength) % dataLength;
        for (let i = 0; i < dataLength; i += 1) {
            if (list[currentIndex] && !list[currentIndex].disabled) {
                return currentIndex;
            }
            currentIndex = (currentIndex + dataLength + step) % dataLength;
        }
        return undefined;
    }
    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(this.props.items, prevProps.items)) {
            const filter = this.getFilter();
            const internalFiltering = filter && !this.props.onFilterUpdate;
            if (internalFiltering) {
                this.onUpdateFilterInternal(filter);
            }
            else {
                this.setState({ items: this.props.items });
            }
        }
        if (this.props.activeItemIndex !== prevProps.activeItemIndex) {
            this.activateItem(this.props.activeItemIndex);
        }
        if (this.props.onChangeActive && this.state.activeItem !== prevState.activeItem) {
            this.props.onChangeActive(this.state.activeItem);
        }
    }
    componentWillUnmount() {
        this.blurTimer = null;
    }
    render() {
        const { emptyPlaceholder, virtualized, className, itemsClassName, qa, role = 'list', } = this.props;
        const { items } = this.state;
        return (React.createElement(MobileContext.Consumer, null, ({ mobile }) => (
        // The event handler should only be used to capture bubbled events
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        React.createElement("div", { className: b({ mobile }, className), "data-qa": qa, tabIndex: -1, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.onKeyDown },
            this.renderFilter(),
            React.createElement("div", { className: b('items', { virtualized }, itemsClassName), style: this.getItemsStyle(), onMouseLeave: this.onMouseLeave, role: role },
                this.renderItems(),
                items.length === 0 && Boolean(emptyPlaceholder) && (React.createElement("div", { className: b('empty-placeholder') }, emptyPlaceholder)))))));
    }
    getItems() {
        return this.state.items;
    }
    getItemsWithLoading() {
        if (this.props.sortable) {
            return this.getItems();
        }
        return this.props.loading ? [...this.state.items, this.loadingItem] : this.getItems();
    }
    getActiveItem() {
        return typeof this.state.activeItem === 'number' ? this.state.activeItem : null;
    }
    activateItem(index, scrollTo = true) {
        if (typeof index === 'number' && scrollTo) {
            this.scrollToIndex(index);
        }
        this.setState({ activeItem: index });
    }
    renderFilter() {
        const { size, filterable, filter = this.state.filter, filterPlaceholder, filterClassName = '', autoFocus, } = this.props;
        if (!filterable) {
            return null;
        }
        return (React.createElement("div", { className: b('filter', filterClassName) },
            React.createElement(TextInput, { controlRef: this.refFilter, size: size, placeholder: filterPlaceholder, value: filter, hasClear: true, onUpdate: this.onFilterUpdate, autoFocus: autoFocus })));
    }
    renderSimpleContainer() {
        const { sortable } = this.props;
        const items = this.getItemsWithLoading();
        if (sortable) {
            return (React.createElement(DragDropContext, { onDragStart: this.onSortStart, onDragEnd: this.onSortEnd },
                React.createElement(Droppable, { droppableId: "droppable", renderClone: (provided, snapshot, rubric) => {
                        return this.renderItem({
                            index: rubric.source.index,
                            provided,
                            isDragging: snapshot.isDragging,
                        });
                    } }, (droppableProvided) => (React.createElement(SimpleContainer, { ref: this.refContainer, itemCount: items.length, provided: droppableProvided, sortable: sortable }, items.map((_item, index) => {
                    return (React.createElement(Draggable, { draggableId: String(index), index: index, key: `item-key-${index}` }, (provided, snapshot) => {
                        return this.renderItem({
                            index,
                            isDragging: snapshot.isDragging,
                            provided,
                            style: { height: this.getItemHeight(index) },
                        });
                    }));
                }))))));
        }
        return (React.createElement(SimpleContainer, { itemCount: items.length, ref: this.refContainer }, items.map((_item, index) => this.renderItem({ index, style: { height: this.getItemHeight(index) } }))));
    }
    renderVirtualizedContainer() {
        const items = this.getItems();
        if (this.props.sortable) {
            return (React.createElement(DragDropContext, { onDragStart: this.onSortStart, onDragEnd: this.onSortEnd },
                React.createElement(Droppable, { droppableId: "droppable", mode: "virtual", renderClone: (provided, snapshot, rubric) => {
                        return this.renderItem({
                            index: rubric.source.index,
                            provided,
                            isDragging: snapshot.isDragging,
                        });
                    } }, (droppableProvided) => (React.createElement(AutoSizer, null, ({ width, height }) => (React.createElement(ListContainer, { ref: this.refContainer, outerRef: droppableProvided.innerRef, width: width, height: height, itemSize: this.getVirtualizedItemHeight, itemData: items, itemCount: items.length, overscanCount: 10, onItemsRendered: this.onItemsRendered, 
                    // this property used to rerender items in viewport
                    // must be last, typescript skips checks for all props behind ts-ignore/ts-expect-error
                    // @ts-expect-error
                    activeItem: this.state.activeItem }, this.renderVirtualizedItem)))))));
        }
        return (React.createElement(AutoSizer, null, ({ width, height }) => (React.createElement(ListContainer, { ref: this.refContainer, width: width, height: height, itemSize: this.getVirtualizedItemHeight, itemData: items, itemCount: items.length, overscanCount: 10, onItemsRendered: this.onItemsRendered, 
            // this property used to rerender items in viewport
            // must be last, typescript skips checks for all props behind ts-ignore/ts-expect-error
            // @ts-expect-error
            activeItem: this.state.activeItem }, this.renderItem))));
    }
    renderItems() {
        if (this.props.virtualized) {
            return this.renderVirtualizedContainer();
        }
        else {
            return this.renderSimpleContainer();
        }
    }
    getFilter() {
        const { filter = this.state.filter } = this.props;
        return filter;
    }
    getItemsStyle() {
        let { itemsHeight } = this.props;
        if (typeof itemsHeight === 'function') {
            itemsHeight = itemsHeight(this.state.items);
        }
        return itemsHeight ? { height: itemsHeight } : undefined;
    }
    handleKeyMove(event, step, defaultItemIndex = 0) {
        event.preventDefault();
        const { activeItem = defaultItemIndex } = this.state;
        this.activateItem(List.findNextIndex(this.state.items, activeItem + step, Math.sign(step)));
    }
}
List.defaultProps = listDefaultProps;
