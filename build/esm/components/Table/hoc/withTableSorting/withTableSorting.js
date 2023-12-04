import { __rest } from "tslib";
import React from 'react';
import _memoize from 'lodash/memoize';
import { block } from '../../../utils/cn';
import { getComponentName } from '../../../utils/getComponentName';
import { Table } from '../../Table';
import { SortIndicator } from './SortIndicator/SortIndicator';
import './withTableSorting.css';
export const TableSortIndicator = SortIndicator;
const b = block('table');
export function withTableSorting(TableComponent) {
    var _a;
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableSorting(${componentName})`;
    function defaultCompareFunction(itemA, itemB, columnId) {
        if (itemA[columnId] === itemB[columnId]) {
            return 0;
        }
        else {
            return itemA[columnId] > itemB[columnId] ? 1 : -1;
        }
    }
    return _a = class extends React.Component {
            constructor() {
                var _a;
                super(...arguments);
                this.state = {
                    sort: (_a = this.props.defaultSortState) !== null && _a !== void 0 ? _a : [],
                };
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceColumns = _memoize((columns) => {
                    return columns.map((column) => {
                        const meta = column.meta;
                        if (meta && meta.sort) {
                            return Object.assign(Object.assign({}, column), { meta: Object.assign(Object.assign({}, column.meta), { _originalName: column.name }), name: () => {
                                    const sortState = this.getSortState();
                                    let sortOrder;
                                    if (sortState.length > 0) {
                                        const state = sortState.find((s) => s.column === column.id);
                                        if (state) {
                                            sortOrder = state.order;
                                        }
                                    }
                                    const originContent = Table.getHeadCellContent(column);
                                    const content = [
                                        React.createElement("div", { key: "content", className: b('sort-content') }, originContent),
                                        React.createElement("div", { key: "spacer", className: b('sort-spacer') }),
                                        React.createElement("div", { key: "indicator", className: b('sort-indicator') },
                                            React.createElement(SortIndicator, { order: sortOrder || this.getColumnDefaultSortOrder(column) })),
                                    ];
                                    if (column.align === 'right') {
                                        content.reverse();
                                    }
                                    return (
                                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                    React.createElement("div", { className: b('sort', { active: Boolean(sortOrder) }), onClick: this.handleColumnSortClick.bind(this, column) }, content));
                                } });
                        }
                        else {
                            return column;
                        }
                    });
                });
                this.handleColumnSortClick = (column, event) => {
                    const sortState = this.getSortState();
                    const currentStateIndex = sortState.findIndex((state) => state.column === column.id);
                    const currentState = sortState[currentStateIndex];
                    const nextColumnSort = this.getNextSortForColumn(column, currentState);
                    if (!event.shiftKey) {
                        this.handleSortStateChange(nextColumnSort);
                        return;
                    }
                    if (currentState) {
                        this.handleSortStateChange([
                            ...sortState.slice(0, currentStateIndex),
                            ...sortState.slice(currentStateIndex + 1),
                            ...nextColumnSort,
                        ]);
                    }
                    else {
                        this.handleSortStateChange([...sortState, ...nextColumnSort]);
                    }
                };
            }
            render() {
                const _a = this.props, { columns } = _a, restTableProps = __rest(_a, ["columns"]);
                return (React.createElement(TableComponent, Object.assign({}, restTableProps, { data: this.getSortedData(), columns: this.enhanceColumns(columns) })));
            }
            getSortedData() {
                const { data, columns, disableDataSorting = this.isControlledState() } = this.props;
                const sortState = this.getSortState();
                if (disableDataSorting || sortState.length === 0) {
                    return data;
                }
                return data.slice().sort((itemA, itemB) => {
                    var _a;
                    let i = 0;
                    while (i < sortState.length) {
                        const state = sortState[i++];
                        const column = columns.find((c) => c.id === state.column);
                        const compareFunction = (_a = column === null || column === void 0 ? void 0 : column.meta) === null || _a === void 0 ? void 0 : _a.sort;
                        if (!compareFunction) {
                            continue;
                        }
                        const compareValue = typeof compareFunction === 'function'
                            ? compareFunction(itemA, itemB)
                            : defaultCompareFunction(itemA, itemB, state.column);
                        if (compareValue !== 0) {
                            return state.order === 'asc' ? compareValue : -compareValue;
                        }
                    }
                    return 0;
                });
            }
            getSortState() {
                const { sortState } = this.props;
                const { sort } = this.state;
                return this.isControlledState() ? sortState : sort;
            }
            handleSortStateChange(newSortState) {
                const { onSortStateChange } = this.props;
                if (!this.isControlledState()) {
                    this.setState({ sort: newSortState });
                }
                if (onSortStateChange) {
                    onSortStateChange(newSortState);
                }
            }
            isControlledState() {
                const { sortState, onSortStateChange } = this.props;
                return Boolean(sortState && onSortStateChange);
            }
            getColumnDefaultSortOrder(column) {
                var _a;
                return ((_a = column.meta) === null || _a === void 0 ? void 0 : _a.defaultSortOrder) || 'asc';
            }
            getNextSortForColumn(column, currentState) {
                const defaultOrder = this.getColumnDefaultSortOrder(column);
                const orderStack = defaultOrder === 'desc' ? ['desc', 'asc', undefined] : ['asc', 'desc', undefined];
                const currentIndex = orderStack.indexOf(currentState === null || currentState === void 0 ? void 0 : currentState.order);
                const nextIndex = (currentIndex + 1) % orderStack.length;
                const nextOrder = orderStack[nextIndex];
                if (!nextOrder) {
                    return [];
                }
                return [{ column: column.id, order: nextOrder }];
            }
        },
        _a.displayName = displayName,
        _a;
}
