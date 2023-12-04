"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTableSettings = exports.getActualItems = exports.getColumnStringTitle = exports.filterColumns = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const isString_1 = tslib_1.__importDefault(require("lodash/isString"));
const last_1 = tslib_1.__importDefault(require("lodash/last"));
const Button_1 = require("../../../Button");
const Icon_1 = require("../../../Icon");
const cn_1 = require("../../../utils/cn");
const getComponentName_1 = require("../../../utils/getComponentName");
const withTableActions_1 = require("../withTableActions/withTableActions");
const withTableSelection_1 = require("../withTableSelection/withTableSelection");
const TableColumnSetup_1 = require("./TableColumnSetup/TableColumnSetup");
function filterColumns(columns, settings) {
    const filteredColumns = settings
        .map(({ id, isSelected }) => ({
        isSelected,
        columnSettings: columns.find((column) => id === column.id),
    }))
        .filter(({ isSelected, columnSettings }) => isSelected && columnSettings)
        .map(({ columnSettings }) => columnSettings);
    if (columns[0] && columns[0].id === withTableSelection_1.selectionColumnId) {
        filteredColumns.unshift(columns[0]);
    }
    const lastColumn = (0, last_1.default)(columns);
    if (lastColumn && lastColumn.id === withTableActions_1.actionsColumnId) {
        filteredColumns.push(lastColumn);
    }
    return filteredColumns;
}
exports.filterColumns = filterColumns;
function getColumnStringTitle(column) {
    if ((0, isString_1.default)(column.name)) {
        return column.name;
    }
    const originalName = (0, get_1.default)(column, ['meta', '_originalName']);
    if ((0, isString_1.default)(originalName)) {
        return originalName;
    }
    return column.id;
}
exports.getColumnStringTitle = getColumnStringTitle;
function getActualItems(columns, settings) {
    const newColumnSettings = columns
        .filter(({ id }) => id !== withTableActions_1.actionsColumnId &&
        id !== withTableSelection_1.selectionColumnId &&
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
exports.getActualItems = getActualItems;
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
const b = (0, cn_1.block)('table');
function withTableSettings(ComponentOrOptions) {
    function tableWithSettingsFactory(TableComponent, { width, sortable } = {}) {
        const componentName = (0, getComponentName_1.getComponentName)(TableComponent);
        function TableWithSettings(_a) {
            var { updateSettings, settings, columns, settingsPopupWidth } = _a, restTableProps = tslib_1.__rest(_a, ["updateSettings", "settings", "columns", "settingsPopupWidth"]);
            const actualItems = react_1.default.useMemo(() => getActualItems(columns, settings || []), [columns, settings]);
            const onUpdateColumns = react_1.default.useCallback((newItems) => {
                updateSettings(prepareUpdateSettings(newItems));
            }, [updateSettings]);
            const columnSetupItems = react_1.default.useMemo(() => prepareColumnSetupItems(actualItems), [actualItems]);
            const enhancedColumns = react_1.default.useMemo(() => (0, withTableActions_1.enhanceSystemColumn)(filterColumns(columns, actualItems), (systemColumn) => {
                // eslint-disable-next-line react/display-name
                systemColumn.name = () => (react_1.default.createElement("div", { className: b('settings') },
                    react_1.default.createElement(TableColumnSetup_1.TableColumnSetup, { popupWidth: settingsPopupWidth || width, popupPlacement: ['bottom-end', 'bottom', 'top-end', 'top'], sortable: sortable, onUpdate: onUpdateColumns, items: columnSetupItems, renderSwitcher: ({ onClick }) => (react_1.default.createElement(Button_1.Button, { view: "flat", className: b('settings-button'), onClick: onClick },
                            react_1.default.createElement(Icon_1.Icon, { data: icons_1.Gear }))) })));
            }), [actualItems, columnSetupItems, columns, onUpdateColumns, settingsPopupWidth]);
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(TableComponent, Object.assign({}, restTableProps, { columns: enhancedColumns }))));
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
exports.withTableSettings = withTableSettings;
