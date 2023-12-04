"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTableSelection = exports.selectionColumnId = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const difference_1 = tslib_1.__importDefault(require("lodash/difference"));
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const memoize_1 = tslib_1.__importDefault(require("lodash/memoize"));
const union_1 = tslib_1.__importDefault(require("lodash/union"));
const without_1 = tslib_1.__importDefault(require("lodash/without"));
const Checkbox_1 = require("../../../Checkbox");
const cn_1 = require("../../../utils/cn");
const getComponentName_1 = require("../../../utils/getComponentName");
const Table_1 = require("../../Table");
const b = (0, cn_1.block)('table');
exports.selectionColumnId = '_selection';
function withTableSelection(TableComponent) {
    var _a;
    const componentName = (0, getComponentName_1.getComponentName)(TableComponent);
    const displayName = `withTableSelection(${componentName})`;
    return _a = class extends react_1.default.Component {
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
                        const id = Table_1.Table.getRowId(this.props, item, index);
                        return selectedIds.includes(id);
                    });
                    if (disabled) {
                        checked = false;
                    }
                    return this.renderCheckBox({ disabled, checked, handler: this.handleAllCheckBoxUpdate });
                };
                this.renderBodyCell = (item, index) => {
                    const { selectedIds } = this.props;
                    const id = Table_1.Table.getRowId(this.props, item, index);
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
                        const dataIds = data.map((item, i) => Table_1.Table.getRowId(this.props, item, i));
                        const diffIds = dataIds.filter((_id, i) => begin <= i && i <= end && !this.isDisabled(data[i], i));
                        onSelectionChange(checked ? (0, union_1.default)(selectedIds, diffIds) : (0, without_1.default)(selectedIds, ...diffIds));
                    }
                    else {
                        onSelectionChange(checked ? [...selectedIds, id] : (0, without_1.default)(selectedIds, id));
                    }
                    this.lastCheckedIndex = index;
                };
                this.handleAllCheckBoxUpdate = (event) => {
                    const { checked } = event.target;
                    const { data, selectedIds, onSelectionChange } = this.props;
                    const dataIds = data.map((item, index) => Table_1.Table.getRowId(this.props, item, index));
                    const notDisabledItemIds = dataIds.filter((_id, index) => !this.isDisabled(data[index], index));
                    onSelectionChange(checked
                        ? (0, union_1.default)(selectedIds, notDisabledItemIds)
                        : (0, difference_1.default)(selectedIds, dataIds));
                };
                // eslint-disable-next-line @typescript-eslint/member-ordering, react/sort-comp
                this.enhanceColumns = (0, memoize_1.default)((columns) => {
                    const selectionColumn = {
                        id: exports.selectionColumnId,
                        name: this.renderHeadCell,
                        template: this.renderBodyCell,
                        className: b('checkbox_cell'),
                        sticky: (0, get_1.default)(columns, [0, 'sticky']) === 'left' ? 'left' : undefined,
                    };
                    return [selectionColumn, ...columns];
                });
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceOnRowClick = (0, memoize_1.default)((onRowClick) => {
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
                this.enhanceGetRowClassNames = (0, memoize_1.default)((getRowClassNames) => {
                    return (item, index) => {
                        const { selectedIds } = this.props;
                        const classNames = getRowClassNames
                            ? getRowClassNames(item, index).slice()
                            : [];
                        const id = Table_1.Table.getRowId(this.props, item, index);
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
                columns, onRowClick, getRowClassNames } = _a, restTableProps = tslib_1.__rest(_a, ["selectedIds", "onSelectionChange", "columns", "onRowClick", "getRowClassNames"]);
                return (react_1.default.createElement(TableComponent, Object.assign({}, restTableProps, { columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick), getRowClassNames: this.enhanceGetRowClassNames(getRowClassNames) })));
            }
            renderCheckBox({ disabled, checked, handler, }) {
                return (react_1.default.createElement(Checkbox_1.Checkbox, { size: "l", checked: checked, disabled: disabled, onChange: handler, className: b('selection-checkbox', {
                        'vertical-align': this.props.verticalAlign,
                    }) }));
            }
        },
        _a.displayName = displayName,
        _a;
}
exports.withTableSelection = withTableSelection;
