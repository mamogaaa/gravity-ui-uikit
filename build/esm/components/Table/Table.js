import React from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _isNumber from 'lodash/isNumber';
import { block } from '../utils/cn';
import i18n from './i18n';
import './Table.css';
const DASH = '\u2014';
const b = block('table');
export class Table extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            activeScrollElement: 'scrollContainer',
            columnsStyles: Array.from(this.props.columns, () => ({})),
            columnHeaderRefs: Array.from(this.props.columns, () => React.createRef()),
        };
        this.tableRef = React.createRef();
        this.scrollContainerRef = React.createRef();
        this.horizontalScrollBarRef = React.createRef();
        this.horizontalScrollBarInnerRef = React.createRef();
        this.renderRow = (item, rowIndex) => {
            const { columns, isRowDisabled, onRowClick, onRowMouseEnter, onRowMouseLeave, onRowMouseDown, getRowClassNames, verticalAlign, edgePadding, wordWrap, } = this.props;
            const { columnsStyles } = this.state;
            const disabled = isRowDisabled ? isRowDisabled(item, rowIndex) : false;
            const interactive = Boolean(!disabled && onRowClick);
            const additionalClassNames = getRowClassNames ? getRowClassNames(item, rowIndex) : [];
            return (React.createElement("tr", { key: Table.getRowId(this.props, item, rowIndex), onClick: !disabled && onRowClick ? onRowClick.bind(null, item, rowIndex) : undefined, onMouseEnter: !disabled && onRowMouseEnter
                    ? onRowMouseEnter.bind(null, item, rowIndex)
                    : undefined, onMouseLeave: !disabled && onRowMouseLeave
                    ? onRowMouseLeave.bind(null, item, rowIndex)
                    : undefined, onMouseDown: !disabled && onRowMouseDown
                    ? onRowMouseDown.bind(null, item, rowIndex)
                    : undefined, className: b('row', { disabled, interactive, 'vertical-align': verticalAlign }, additionalClassNames.join(' ')) }, columns.map((column, colIndex) => {
                const { id, align, primary, className, sticky } = column;
                const content = Table.getBodyCellContent(column, item, rowIndex);
                return (React.createElement("td", { key: id, style: columnsStyles[colIndex], className: b('cell', {
                        align,
                        primary,
                        sticky,
                        ['edge-padding']: edgePadding,
                        ['word-wrap']: wordWrap,
                    }, className) }, content));
            })));
        };
        this.handleScrollContainerMouseenter = () => {
            this.setState({ activeScrollElement: 'scrollContainer' });
        };
        this.handleScrollContainerScroll = () => {
            if (this.state.activeScrollElement === 'scrollContainer' &&
                this.horizontalScrollBarRef.current &&
                this.scrollContainerRef.current) {
                this.horizontalScrollBarRef.current.scrollLeft =
                    this.scrollContainerRef.current.scrollLeft;
            }
        };
        this.handleHorizontalScrollBarMouseenter = () => {
            this.setState({ activeScrollElement: 'scrollBar' });
        };
        this.handleHorizontalScrollBarScroll = () => {
            if (this.state.activeScrollElement === 'scrollBar' &&
                this.horizontalScrollBarRef.current &&
                this.scrollContainerRef.current) {
                this.scrollContainerRef.current.scrollLeft =
                    this.horizontalScrollBarRef.current.scrollLeft;
            }
        };
    }
    // Static methods may be used by HOCs
    static getRowId(props, item, rowIndex) {
        const { data, getRowId } = props;
        const index = rowIndex !== null && rowIndex !== void 0 ? rowIndex : data.indexOf(item);
        if (typeof getRowId === 'function') {
            return getRowId(item, index);
        }
        if (getRowId && getRowId in item) {
            return String(item[getRowId]);
        }
        return String(index);
    }
    static getHeadCellContent(column) {
        const { id, name } = column;
        let content;
        if (typeof name === 'function') {
            content = name();
        }
        else if (typeof name === 'string') {
            content = name;
        }
        else {
            content = id;
        }
        return content;
    }
    static getBodyCellContent(column, item, rowIndex) {
        const { id, template, placeholder } = column;
        let placeholderValue;
        if (typeof placeholder === 'function') {
            placeholderValue = placeholder(item, rowIndex);
        }
        else {
            placeholderValue = placeholder !== null && placeholder !== void 0 ? placeholder : DASH;
        }
        let value;
        if (typeof template === 'function') {
            value = template(item, rowIndex);
        }
        else if (typeof template === 'string') {
            value = _get(item, template);
        }
        else if (_has(item, id)) {
            value = _get(item, id);
        }
        if ([undefined, null, ''].includes(value) && placeholderValue) {
            return placeholderValue;
        }
        return value;
    }
    static getDerivedStateFromProps(props, state) {
        if (props.columns.length === state.columnHeaderRefs.length) {
            return null;
        }
        return {
            columnHeaderRefs: Array.from(props.columns, () => React.createRef()),
        };
    }
    componentDidMount() {
        if (this.props.stickyHorizontalScroll) {
            this.tableResizeObserver = new ResizeObserver((entries) => {
                var _a;
                const { contentRect } = entries[0];
                // Sync scrollbar width with table width
                (_a = this.horizontalScrollBarInnerRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('width', `${contentRect.width}px`);
            });
            if (this.tableRef.current) {
                this.tableResizeObserver.observe(this.tableRef.current);
            }
            if (this.scrollContainerRef.current) {
                this.scrollContainerRef.current.addEventListener('scroll', this.handleScrollContainerScroll);
                this.scrollContainerRef.current.addEventListener('mouseenter', this.handleScrollContainerMouseenter);
            }
            if (this.horizontalScrollBarRef.current) {
                this.horizontalScrollBarRef.current.addEventListener('scroll', this.handleHorizontalScrollBarScroll);
                this.horizontalScrollBarRef.current.addEventListener('mouseenter', this.handleHorizontalScrollBarMouseenter);
            }
        }
        this.columnsResizeObserver = new ResizeObserver((entries) => {
            // fix ResizeObserver loop error
            window.requestAnimationFrame(() => {
                if (!Array.isArray(entries) || !entries.length) {
                    return;
                }
                this.updateColumnStyles();
            });
        });
        if (this.tableRef.current) {
            this.columnsResizeObserver.observe(this.tableRef.current);
        }
        this.updateColumnStyles();
    }
    componentDidUpdate(prevProps) {
        if (this.props.columns !== prevProps.columns) {
            this.updateColumnStyles();
        }
    }
    componentWillUnmount() {
        if (this.props.stickyHorizontalScroll) {
            if (this.tableResizeObserver) {
                this.tableResizeObserver.disconnect();
            }
            if (this.scrollContainerRef.current) {
                this.scrollContainerRef.current.removeEventListener('scroll', this.handleScrollContainerScroll);
                this.scrollContainerRef.current.removeEventListener('mouseenter', this.handleScrollContainerMouseenter);
            }
            if (this.horizontalScrollBarRef.current) {
                this.horizontalScrollBarRef.current.removeEventListener('scroll', this.handleHorizontalScrollBarScroll);
                this.horizontalScrollBarRef.current.removeEventListener('mouseenter', this.handleHorizontalScrollBarMouseenter);
            }
        }
        if (this.columnsResizeObserver) {
            this.columnsResizeObserver.disconnect();
        }
    }
    render() {
        const { columns, stickyHorizontalScroll, className, qa } = this.props;
        const withPrimary = columns.some(({ primary }) => primary);
        return (React.createElement("div", { className: b({
                'with-primary': withPrimary,
                'with-sticky-scroll': stickyHorizontalScroll,
            }, className), "data-qa": qa }, stickyHorizontalScroll ? (React.createElement(React.Fragment, null,
            React.createElement("div", { ref: this.scrollContainerRef, className: b('scroll-container') }, this.renderTable()),
            this.renderHorizontalScrollBar())) : (this.renderTable())));
    }
    renderHead() {
        const { columns, edgePadding, wordWrap } = this.props;
        const { columnsStyles } = this.state;
        return (React.createElement("thead", { className: b('head') },
            React.createElement("tr", { className: b('row') }, columns.map((column, index) => {
                const { id, align, primary, sticky, className } = column;
                const content = Table.getHeadCellContent(column);
                return (React.createElement("th", { key: id, ref: this.state.columnHeaderRefs[index], style: columnsStyles[index], className: b('cell', {
                        align,
                        primary,
                        sticky,
                        ['edge-padding']: edgePadding,
                        ['word-wrap']: wordWrap,
                    }, className) }, content));
            }))));
    }
    renderBody() {
        const { data } = this.props;
        return (React.createElement("tbody", { className: b('body') }, data.length > 0 ? data.map(this.renderRow) : this.renderEmptyRow()));
    }
    renderTable() {
        return (React.createElement("table", { ref: this.tableRef, className: b('table') },
            this.renderHead(),
            this.renderBody()));
    }
    renderEmptyRow() {
        const { columns, emptyMessage } = this.props;
        return (React.createElement("tr", { className: b('row', { empty: true }) },
            React.createElement("td", { className: b('cell'), colSpan: columns.length }, emptyMessage ? emptyMessage : i18n('label_empty'))));
    }
    renderHorizontalScrollBar() {
        const { stickyHorizontalScroll, stickyHorizontalScrollBreakpoint = 0 } = this.props;
        return (React.createElement("div", { ref: this.horizontalScrollBarRef, className: b('horizontal-scroll-bar', {
                'sticky-horizontal-scroll': stickyHorizontalScroll,
            }), style: { bottom: `${stickyHorizontalScrollBreakpoint}px` }, "data-qa": "sticky-horizontal-scroll-breakpoint-qa" },
            React.createElement("div", { ref: this.horizontalScrollBarInnerRef, className: b('horizontal-scroll-bar-inner') })));
    }
    updateColumnStyles() {
        this.setState((prevState) => {
            const columnsWidth = prevState.columnHeaderRefs.map((ref) => ref.current === null ? undefined : ref.current.getBoundingClientRect().width);
            const columnsStyles = this.props.columns.map((_, index) => this.getColumnStyles(index, columnsWidth));
            return { columnsStyles };
        });
    }
    getColumnStyles(index, columnsWidth) {
        const { columns } = this.props;
        const column = columns[index];
        const style = {};
        if (typeof column.width === 'string') {
            return { maxWidth: 0, width: column.width };
        }
        if (typeof column.width !== 'undefined') {
            style.width = column.width;
        }
        if (!column.sticky) {
            return style;
        }
        const filteredColumns = column.sticky === 'left' ? columnsWidth.slice(0, index) : columnsWidth.slice(index + 1);
        style[column.sticky] = filteredColumns.reduce((left, width) => {
            return _isNumber(width) ? left + width : left;
        }, 0);
        return style;
    }
}
Table.defaultProps = {
    edgePadding: true,
};
