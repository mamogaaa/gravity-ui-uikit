"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTableCopy = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const memoize_1 = tslib_1.__importDefault(require("lodash/memoize"));
const ClipboardButton_1 = require("../../../ClipboardButton");
const cn_1 = require("../../../utils/cn");
const getComponentName_1 = require("../../../utils/getComponentName");
const Table_1 = require("../../Table");
const b = (0, cn_1.block)('table');
function withTableCopy(TableComponent) {
    var _a;
    const componentName = (0, getComponentName_1.getComponentName)(TableComponent);
    const displayName = `withTableCopy(${componentName})`;
    return _a = class extends react_1.default.Component {
            constructor() {
                super(...arguments);
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceColumns = (0, memoize_1.default)((columns) => {
                    return columns.map((column) => {
                        const meta = column.meta;
                        if (!meta || !meta.copy) {
                            return column;
                        }
                        return Object.assign(Object.assign({}, column), { template: (item, index) => {
                                const originContent = Table_1.Table.getBodyCellContent(Object.assign(Object.assign({}, column), { placeholder: '' }), item, index);
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
                                return (react_1.default.createElement("div", { className: b('copy') },
                                    react_1.default.createElement("div", { className: b('copy-content') }, originContent),
                                    react_1.default.createElement("div", { className: b('copy-button') },
                                        react_1.default.createElement(ClipboardButton_1.ClipboardButton, { text: copyText, size: 14 }))));
                            } });
                    });
                });
                // eslint-disable-next-line @typescript-eslint/member-ordering
                this.enhanceOnRowClick = (0, memoize_1.default)((onRowClick) => {
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
                const _a = this.props, { columns, onRowClick } = _a, restTableProps = tslib_1.__rest(_a, ["columns", "onRowClick"]);
                return (react_1.default.createElement(TableComponent, Object.assign({}, restTableProps, { columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick) })));
            }
        },
        _a.displayName = displayName,
        _a;
}
exports.withTableCopy = withTableCopy;