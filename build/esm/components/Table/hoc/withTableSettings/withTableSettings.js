import { __rest } from "tslib";
import React from 'react';
import { Gear } from '@gravity-ui/icons';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _last from 'lodash/last';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { block } from '../../../utils/cn';
import { getComponentName } from '../../../utils/getComponentName';
import { actionsColumnId, enhanceSystemColumn } from '../withTableActions/withTableActions';
import { selectionColumnId } from '../withTableSelection/withTableSelection';
import { TableColumnSetup } from './TableColumnSetup/TableColumnSetup';
import './withTableSettings.css';
export function filterColumns(columns, settings) {
    const filteredColumns = settings
        .map(({ id, isSelected }) => ({
        isSelected,
        columnSettings: columns.find((column) => id === column.id),
    }))
        .filter(({ isSelected, columnSettings }) => isSelected && columnSettings)
        .map(({ columnSettings }) => columnSettings);
    if (columns[0] && columns[0].id === selectionColumnId) {
        filteredColumns.unshift(columns[0]);
    }
    const lastColumn = _last(columns);
    if (lastColumn && lastColumn.id === actionsColumnId) {
        filteredColumns.push(lastColumn);
    }
    return filteredColumns;
}
export function getColumnStringTitle(column) {
    if (_isString(column.name)) {
        return column.name;
    }
    const originalName = _get(column, ['meta', '_originalName']);
    if (_isString(originalName)) {
        return originalName;
    }
    return column.id;
}
export function getActualItems(columns, settings) {
    const newColumnSettings = columns
        .filter(({ id }) => id !== actionsColumnId &&
        id !== selectionColumnId &&
        settings.every((setting) => setting.id !== id))
        .map((column) => {
        var _a;
        return ({
            id: column.id,
            isSelected: ((_a = column.meta) === null || _a === void 0 ? void 0 : _a.selectedByDefault) !== false,
        });
    });
    return settings
        .filter(({ id }) => columns.some((column) => id === column.id))
        .concat(newColumnSettings)
        .map(({ id, isSelected }) => {
        var _a;
        const foundColumn = columns.find((column) => column.id === id);
        const isProtected = Boolean((_a = foundColumn === null || foundColumn === void 0 ? void 0 : foundColumn.meta) === null || _a === void 0 ? void 0 : _a.selectedAlways);
        return {
            id,
            isSelected: isProtected ? true : isSelected,
            isProtected,
            title: foundColumn ? getColumnStringTitle(foundColumn) : id,
        };
    });
}
function prepareColumnSetupItems(items) {
    return items.map(({ id, title, isSelected, isProtected }) => ({
        id,
        title,
        selected: isSelected,
        required: isProtected,
    }));
}
function prepareUpdateSettings(items) {
    return items.map(({ id, selected }) => ({
        id,
        isSelected: selected,
    }));
}
const b = block('table');
export function withTableSettings(ComponentOrOptions) {
    function tableWithSettingsFactory(TableComponent, { width, sortable } = {}) {
        const componentName = getComponentName(TableComponent);
        function TableWithSettings(_a) {
            var { updateSettings, settings, columns, settingsPopupWidth } = _a, restTableProps = __rest(_a, ["updateSettings", "settings", "columns", "settingsPopupWidth"]);
            const actualItems = React.useMemo(() => getActualItems(columns, settings || []), [columns, settings]);
            const onUpdateColumns = React.useCallback((newItems) => {
                updateSettings(prepareUpdateSettings(newItems));
            }, [updateSettings]);
            const columnSetupItems = React.useMemo(() => prepareColumnSetupItems(actualItems), [actualItems]);
            const enhancedColumns = React.useMemo(() => enhanceSystemColumn(filterColumns(columns, actualItems), (systemColumn) => {
                // eslint-disable-next-line react/display-name
                systemColumn.name = () => (React.createElement("div", { className: b('settings') },
                    React.createElement(TableColumnSetup, { popupWidth: settingsPopupWidth || width, popupPlacement: ['bottom-end', 'bottom', 'top-end', 'top'], sortable: sortable, onUpdate: onUpdateColumns, items: columnSetupItems, renderSwitcher: ({ onClick }) => (React.createElement(Button, { view: "flat", className: b('settings-button'), onClick: onClick },
                            React.createElement(Icon, { data: Gear }))) })));
            }), [actualItems, columnSetupItems, columns, onUpdateColumns, settingsPopupWidth]);
            return (React.createElement(React.Fragment, null,
                React.createElement(TableComponent, Object.assign({}, restTableProps, { columns: enhancedColumns }))));
        }
        TableWithSettings.displayName = `withTableSettings(${componentName})`;
        return TableWithSettings;
    }
    if (typeof ComponentOrOptions === 'function') {
        return tableWithSettingsFactory(ComponentOrOptions);
    }
    else {
        return (TableComponent) => tableWithSettingsFactory(TableComponent, ComponentOrOptions);
    }
}
