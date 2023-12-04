import { __rest } from "tslib";
import React from 'react';
import _memoize from 'lodash/memoize';
import { ClipboardButton } from '../../../ClipboardButton';
import { block } from '../../../utils/cn';
import { getComponentName } from '../../../utils/getComponentName';
import { Table } from '../../Table';
import './withTableCopy.css';
const b = block('table');
export function withTableCopy(TableComponent) {
    var _a;
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableCopy(${componentName})`;
    return _a = class extends React.Component {
            constructor() {
                super(...arguments);
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceColumns = _memoize((columns) => {
                    return columns.map((column) => {
                        const meta = column.meta;
                        if (!meta || !meta.copy) {
                            return column;
                        }
                        return Object.assign(Object.assign({}, column), { template: (item, index) => {
                                const originContent = Table.getBodyCellContent(Object.assign(Object.assign({}, column), { placeholder: '' }), item, index);
                                if (!originContent) {
                                    return originContent;
                                }
                                let copyText;
                                if (typeof meta.copy === 'function') {
                                    copyText = String(meta.copy(item, index));
                                }
                                else if (typeof originContent === 'string' ||
                                    typeof originContent === 'number') {
                                    copyText = String(originContent);
                                }
                                if (!copyText) {
                                    return originContent;
                                }
                                return (React.createElement("div", { className: b('copy') },
                                    React.createElement("div", { className: b('copy-content') }, originContent),
                                    React.createElement("div", { className: b('copy-button') },
                                        React.createElement(ClipboardButton, { text: copyText, size: 14 }))));
                            } });
                    });
                });
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceOnRowClick = _memoize((onRowClick) => {
                    if (!onRowClick) {
                        return onRowClick;
                    }
                    return (item, index, event) => {
                        const buttonClassName = b('copy-button');
                        if (
                        // @ts-ignore
                        event.nativeEvent.target.matches(`.${buttonClassName}, .${buttonClassName} *`)) {
                            return undefined;
                        }
                        return onRowClick(item, index, event);
                    };
                });
            }
            render() {
                const _a = this.props, { columns, onRowClick } = _a, restTableProps = __rest(_a, ["columns", "onRowClick"]);
                return (React.createElement(TableComponent, Object.assign({}, restTableProps, { columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick) })));
            }
        },
        _a.displayName = displayName,
        _a;
}
