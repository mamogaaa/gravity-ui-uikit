"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTableActions = exports.enhanceSystemColumn = exports.actionsColumnId = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const memoize_1 = tslib_1.__importDefault(require("lodash/memoize"));
const Button_1 = require("../../../Button");
const Icon_1 = require("../../../Icon");
const Menu_1 = require("../../../Menu");
const Popup_1 = require("../../../Popup");
const cn_1 = require("../../../utils/cn");
const getComponentName_1 = require("../../../utils/getComponentName");
exports.actionsColumnId = '_actions';
function enhanceSystemColumn(columns, enhancer) {
    const existedColumn = columns.find(({ id }) => id === exports.actionsColumnId);
    const systemColumn = existedColumn || {
        id: exports.actionsColumnId,
        name: '',
        sticky: 'right',
        width: 28,
        placeholder: '',
    };
    enhancer(systemColumn);
    return existedColumn ? columns : [...columns, systemColumn];
}
exports.enhanceSystemColumn = enhanceSystemColumn;
const b = (0, cn_1.block)('table');
const bPopup = (0, cn_1.block)('table-action-popup');
const BUTTON_CLASSNAME = b('actions-button');
function withTableActions(TableComponent) {
    var _a;
    const componentName = (0, getComponentName_1.getComponentName)(TableComponent);
    const displayName = `withTableActions(${componentName})`;
    return _a = class extends react_1.default.Component {
            constructor() {
                super(...arguments);
                this.state = {
                    popupOpen: false,
                    popupData: null,
                };
                this.anchorRef = react_1.default.createRef();
                this.renderBodyCell = (item, index) => {
                    const { isRowDisabled, getRowActions, rowActionsSize } = this.props;
                    const actions = getRowActions(item, index);
                    if (actions.length === 0) {
                        return null;
                    }
                    const disabled = isRowDisabled ? isRowDisabled(item, index) : false;
                    return (react_1.default.createElement("div", { className: b('actions') },
                        react_1.default.createElement(Button_1.Button, { view: "flat-secondary", disabled: disabled, className: BUTTON_CLASSNAME, onClick: this.handleActionsButtonClick.bind(this, { item, index }), size: rowActionsSize },
                            react_1.default.createElement(Icon_1.Icon, { data: icons_1.Ellipsis }))));
                };
                this.renderPopupMenuItem = (action, index) => {
                    const { popupData } = this.state;
                    if (this.isActionGroup(action)) {
                        return (react_1.default.createElement(Menu_1.Menu.Group, { key: index, label: action.title }, action.items.map(this.renderPopupMenuItem)));
                    }
                    else {
                        return (react_1.default.createElement(Menu_1.Menu.Item, { key: index, disabled: action.disabled, onClick: this.handleActionClick.bind(this, action, popupData), theme: action.theme, iconStart: action.icon, className: bPopup('menu-item') }, action.text));
                    }
                };
                this.handleActionsButtonClick = (data, event) => {
                    const { popupOpen } = this.state;
                    const anchor = event.currentTarget;
                    if (popupOpen && this.anchorRef.current === anchor) {
                        this.closePopup();
                    }
                    else {
                        this.openPopup(anchor, data);
                    }
                };
                this.handleActionClick = (action, data, event) => {
                    action.handler(data.item, data.index, event);
                    this.closePopup();
                };
                this.handlePopupClose = () => {
                    this.closePopup();
                };
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceColumns = (0, memoize_1.default)((columns) => enhanceSystemColumn(columns, (systemColumn) => {
                    systemColumn.template = this.renderBodyCell;
                }));
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceOnRowClick = (0, memoize_1.default)((onRowClick) => {
                    if (!onRowClick) {
                        return onRowClick;
                    }
                    return (item, index, event) => {
                        if (
                        // @ts-ignore
                        event.nativeEvent.target.matches(`.${BUTTON_CLASSNAME}, .${BUTTON_CLASSNAME} *`)) {
                            return undefined;
                        }
                        return onRowClick(item, index, event);
                    };
                });
            }
            render() {
                const _a = this.props, { getRowActions, // eslint-disable-line @typescript-eslint/no-unused-vars
                columns, onRowClick } = _a, restTableProps = tslib_1.__rest(_a, ["getRowActions", "columns", "onRowClick"]);
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(TableComponent, Object.assign({}, restTableProps, { columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick) })),
                    this.renderPopup()));
            }
            renderPopup() {
                const { getRowActions, rowActionsSize } = this.props;
                const { popupOpen, popupData } = this.state;
                if (!popupData) {
                    return null;
                }
                const actions = getRowActions(popupData.item, popupData.index);
                return (react_1.default.createElement(Popup_1.Popup, { open: popupOpen, anchorRef: this.anchorRef, placement: ['bottom-end', 'top-end'], onClose: this.handlePopupClose },
                    react_1.default.createElement(Menu_1.Menu, { className: bPopup('menu'), size: rowActionsSize }, actions.map(this.renderPopupMenuItem))));
            }
            openPopup(anchor, data) {
                // @ts-ignore
                this.anchorRef.current = anchor;
                this.setState({ popupOpen: true, popupData: data });
            }
            closePopup() {
                this.setState({ popupOpen: false });
            }
            isActionGroup(config) {
                return Array.isArray(config.items);
            }
        },
        _a.displayName = displayName,
        _a;
}
exports.withTableActions = withTableActions;
