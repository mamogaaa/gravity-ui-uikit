import { __rest } from "tslib";
import React from 'react';
import _difference from 'lodash/difference';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import _union from 'lodash/union';
import _without from 'lodash/without';
import { Checkbox } from '../../../Checkbox';
import { block } from '../../../utils/cn';
import { getComponentName } from '../../../utils/getComponentName';
import { Table } from '../../Table';
import './withTableSelection.css';
const b = block('table');
export const selectionColumnId = '_selection';
export function withTableSelection(TableComponent) {
    var _a;
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableSelection(${componentName})`;
    return _a = class extends React.Component {
            constructor() {
                super(...arguments);
                this.renderHeadCell = () => {
                    const { data, selectedIds } = this.props;
                    let disabled = true;
                    let checked = data.every((item, index) => {
                        if (this.isDisabled(item, index)) {
                            return true;
                        }
                        else {
                            disabled = false;
                        }
                        const id = Table.getRowId(this.props, item, index);
                        return selectedIds.includes(id);
                    });
                    if (disabled) {
                        checked = false;
                    }
                    return this.renderCheckBox({ disabled, checked, handler: this.handleAllCheckBoxUpdate });
                };
                this.renderBodyCell = (item, index) => {
                    const { selectedIds } = this.props;
                    const id = Table.getRowId(this.props, item, index);
                    const checked = selectedIds.includes(id);
                    return this.renderCheckBox({
                        disabled: this.isDisabled(item, index),
                        checked,
                        handler: this.handleCheckBoxUpdate.bind(this, id, index),
                    });
                };
                this.handleCheckBoxUpdate = (id, index, event) => {
                    const { checked } = event.target;
                    // @ts-ignore shiftKey is defined for click events
                    const isShiftPressed = event.nativeEvent.shiftKey;
                    const { data, selectedIds, onSelectionChange } = this.props;
                    if (isShiftPressed &&
                        this.lastCheckedIndex !== undefined &&
                        this.lastCheckedIndex >= 0) {
                        const begin = Math.min(this.lastCheckedIndex, index);
                        const end = Math.max(this.lastCheckedIndex, index);
                        const dataIds = data.map((item, i) => Table.getRowId(this.props, item, i));
                        const diffIds = dataIds.filter((_id, i) => begin <= i && i <= end && !this.isDisabled(data[i], i));
                        onSelectionChange(checked ? _union(selectedIds, diffIds) : _without(selectedIds, ...diffIds));
                    }
                    else {
                        onSelectionChange(checked ? [...selectedIds, id] : _without(selectedIds, id));
                    }
                    this.lastCheckedIndex = index;
                };
                this.handleAllCheckBoxUpdate = (event) => {
                    const { checked } = event.target;
                    const { data, selectedIds, onSelectionChange } = this.props;
                    const dataIds = data.map((item, index) => Table.getRowId(this.props, item, index));
                    const notDisabledItemIds = dataIds.filter((_id, index) => !this.isDisabled(data[index], index));
                    onSelectionChange(checked
                        ? _union(selectedIds, notDisabledItemIds)
                        : _difference(selectedIds, dataIds));
                };
                // eslint-disable-next-line @typescript-eslint/member-ordering, react/sort-comp
                this.enhanceColumns = _memoize((columns) => {
                    const selectionColumn = {
                        id: selectionColumnId,
                        name: this.renderHeadCell,
                        template: this.renderBodyCell,
                        className: b('checkbox_cell'),
                        sticky: _get(columns, [0, 'sticky']) === 'left' ? 'left' : undefined,
                    };
                    return [selectionColumn, ...columns];
                });
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceOnRowClick = _memoize((onRowClick) => {
                    if (!onRowClick) {
                        return onRowClick;
                    }
                    return (item, index, event) => {
                        const checkboxClassName = b('selection-checkbox');
                        if (
                        // @ts-ignore
                        event.nativeEvent.target.matches(`.${checkboxClassName}, .${checkboxClassName} *`)) {
                            return undefined;
                        }
                        return onRowClick(item, index, event);
                    };
                });
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceGetRowClassNames = _memoize((getRowClassNames) => {
                    return (item, index) => {
                        const { selectedIds } = this.props;
                        const classNames = getRowClassNames
                            ? getRowClassNames(item, index).slice()
                            : [];
                        const id = Table.getRowId(this.props, item, index);
                        const selected = selectedIds.includes(id);
                        classNames.push(b('row', { selected }));
                        return classNames;
                    };
                });
                this.isDisabled = (item, index) => {
                    const { isRowDisabled, isRowSelectionDisabled } = this.props;
                    if (isRowSelectionDisabled && isRowSelectionDisabled(item, index)) {
                        return true;
                    }
                    return isRowDisabled ? isRowDisabled(item, index) : false;
                };
            }
            render() {
                const _a = this.props, { selectedIds, // eslint-disable-line @typescript-eslint/no-unused-vars
                onSelectionChange, // eslint-disable-line @typescript-eslint/no-unused-vars
                columns, onRowClick, getRowClassNames } = _a, restTableProps = __rest(_a, ["selectedIds", "onSelectionChange", "columns", "onRowClick", "getRowClassNames"]);
                return (React.createElement(TableComponent, Object.assign({}, restTableProps, { columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick), getRowClassNames: this.enhanceGetRowClassNames(getRowClassNames) })));
            }
            renderCheckBox({ disabled, checked, handler, }) {
                return (React.createElement(Checkbox, { size: "l", checked: checked, disabled: disabled, onChange: handler, className: b('selection-checkbox', {
                        'vertical-align': this.props.verticalAlign,
                    }) }));
            }
        },
        _a.displayName = displayName,
        _a;
}
