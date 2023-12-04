import { __rest } from "tslib";
import React from 'react';
import { Ellipsis } from '@gravity-ui/icons';
import _memoize from 'lodash/memoize';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Menu } from '../../../Menu';
import { Popup } from '../../../Popup';
import { block } from '../../../utils/cn';
import { getComponentName } from '../../../utils/getComponentName';
import './withTableActions.css';
export const actionsColumnId = '_actions';
export function enhanceSystemColumn(columns, enhancer) {
    const existedColumn = columns.find(({ id }) => id === actionsColumnId);
    const systemColumn = existedColumn || {
        id: actionsColumnId,
        name: '',
        sticky: 'right',
        width: 28,
        placeholder: '',
    };
    enhancer(systemColumn);
    return existedColumn ? columns : [...columns, systemColumn];
}
const b = block('table');
const bPopup = block('table-action-popup');
const BUTTON_CLASSNAME = b('actions-button');
export function withTableActions(TableComponent) {
    var _a;
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableActions(${componentName})`;
    return _a = class extends React.Component {
            constructor() {
                super(...arguments);
                this.state = {
                    popupOpen: false,
                    popupData: null,
                };
                this.anchorRef = React.createRef();
                this.renderBodyCell = (item, index) => {
                    const { isRowDisabled, getRowActions, rowActionsSize } = this.props;
                    const actions = getRowActions(item, index);
                    if (actions.length === 0) {
                        return null;
                    }
                    const disabled = isRowDisabled ? isRowDisabled(item, index) : false;
                    return (React.createElement("div", { className: b('actions') },
                        React.createElement(Button, { view: "flat-secondary", disabled: disabled, className: BUTTON_CLASSNAME, onClick: this.handleActionsButtonClick.bind(this, { item, index }), size: rowActionsSize },
                            React.createElement(Icon, { data: Ellipsis }))));
                };
                this.renderPopupMenuItem = (action, index) => {
                    const { popupData } = this.state;
                    if (this.isActionGroup(action)) {
                        return (React.createElement(Menu.Group, { key: index, label: action.title }, action.items.map(this.renderPopupMenuItem)));
                    }
                    else {
                        return (React.createElement(Menu.Item, { key: index, disabled: action.disabled, onClick: this.handleActionClick.bind(this, action, popupData), theme: action.theme, iconStart: action.icon, className: bPopup('menu-item') }, action.text));
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
                this.enhanceColumns = _memoize((columns) => enhanceSystemColumn(columns, (systemColumn) => {
                    systemColumn.template = this.renderBodyCell;
                }));
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceOnRowClick = _memoize((onRowClick) => {
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
                columns, onRowClick } = _a, restTableProps = __rest(_a, ["getRowActions", "columns", "onRowClick"]);
                return (React.createElement(React.Fragment, null,
                    React.createElement(TableComponent, Object.assign({}, restTableProps, { columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick) })),
                    this.renderPopup()));
            }
            renderPopup() {
                const { getRowActions, rowActionsSize } = this.props;
                const { popupOpen, popupData } = this.state;
                if (!popupData) {
                    return null;
                }
                const actions = getRowActions(popupData.item, popupData.index);
                return (React.createElement(Popup, { open: popupOpen, anchorRef: this.anchorRef, placement: ['bottom-end', 'top-end'], onClose: this.handlePopupClose },
                    React.createElement(Menu, { className: bPopup('menu'), size: rowActionsSize }, actions.map(this.renderPopupMenuItem))));
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
