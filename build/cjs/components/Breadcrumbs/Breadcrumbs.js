"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = exports.FirstDisplayedItemsCount = exports.LastDisplayedItemsCount = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const throttle_1 = tslib_1.__importDefault(require("lodash/throttle"));
const cn_1 = require("../utils/cn");
const BreadcrumbsItem_1 = require("./BreadcrumbsItem");
const BreadcrumbsMore_1 = require("./BreadcrumbsMore");
const BreadcrumbsSeparator_1 = require("./BreadcrumbsSeparator");
const RESIZE_THROTTLE = 200;
const MORE_ITEM_WIDTH = 34;
const DEFAULT_POPUP_PLACEMENT = ['bottom', 'top'];
const b = (0, cn_1.block)('breadcrumbs');
var LastDisplayedItemsCount;
(function (LastDisplayedItemsCount) {
    LastDisplayedItemsCount[LastDisplayedItemsCount["One"] = 1] = "One";
    LastDisplayedItemsCount[LastDisplayedItemsCount["Two"] = 2] = "Two";
})(LastDisplayedItemsCount = exports.LastDisplayedItemsCount || (exports.LastDisplayedItemsCount = {}));
var FirstDisplayedItemsCount;
(function (FirstDisplayedItemsCount) {
    FirstDisplayedItemsCount[FirstDisplayedItemsCount["Zero"] = 0] = "Zero";
    FirstDisplayedItemsCount[FirstDisplayedItemsCount["One"] = 1] = "One";
})(FirstDisplayedItemsCount = exports.FirstDisplayedItemsCount || (exports.FirstDisplayedItemsCount = {}));
class Breadcrumbs extends react_1.default.Component {
    static prepareInitialState(props) {
        const { firstDisplayedItemsCount } = props;
        return {
            calculated: false,
            rootItem: firstDisplayedItemsCount ? props.items[0] : undefined,
            visibleItems: props.items.slice(firstDisplayedItemsCount),
            hiddenItems: [],
            allItems: props.items,
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.allItems !== props.items) {
            return Breadcrumbs.prepareInitialState(props);
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.handleResize = () => {
            const state = Breadcrumbs.prepareInitialState(this.props);
            this.setState(state, this.recalculate);
        };
        this.handleResize = (0, throttle_1.default)(this.handleResize, RESIZE_THROTTLE);
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.container = react_1.default.createRef();
        this.state = Breadcrumbs.prepareInitialState(props);
    }
    componentDidMount() {
        this.recalculate();
        this.resizeObserver.observe(this.container.current);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.state.allItems) {
            this.recalculate();
        }
    }
    componentWillUnmount() {
        this.resizeObserver.disconnect();
    }
    render() {
        const { className } = this.props;
        const { calculated } = this.state;
        const rootItem = this.renderRootItem();
        return (react_1.default.createElement("div", { className: b({ calculated: calculated ? 'yes' : 'no' }, className) },
            react_1.default.createElement("div", { className: b('inner'), ref: this.container },
                rootItem,
                this.renderMoreItem(),
                this.renderVisibleItems())));
    }
    renderItem(data, isCurrent, isPrevCurrent) {
        const { renderItemContent } = this.props;
        return (react_1.default.createElement(BreadcrumbsItem_1.BreadcrumbsItem, { data: data, isCurrent: isCurrent, isPrevCurrent: isPrevCurrent, renderItem: renderItemContent }));
    }
    renderItemDivider() {
        const { renderItemDivider } = this.props;
        return react_1.default.createElement(BreadcrumbsSeparator_1.BreadcrumbsSeparator, { renderItemDivider: renderItemDivider });
    }
    renderRootItem() {
        const { renderRootContent, renderItemContent } = this.props;
        const { rootItem, visibleItems } = this.state;
        const isCurrent = visibleItems.length === 0;
        if (!rootItem) {
            return null;
        }
        return (react_1.default.createElement(BreadcrumbsItem_1.BreadcrumbsItem, { data: rootItem, isCurrent: isCurrent, isPrevCurrent: false, renderItem: renderRootContent || renderItemContent }));
    }
    renderVisibleItems() {
        const { visibleItems } = this.state;
        return visibleItems.map((item, index, items) => {
            const isCurrent = index === items.length - 1;
            const isPrevCurrent = index === items.length - 2;
            return (react_1.default.createElement(react_1.default.Fragment, { key: index },
                this.renderItemDivider(),
                this.renderItem(item, isCurrent, isPrevCurrent)));
        });
    }
    renderMoreItem() {
        const { hiddenItems } = this.state;
        if (hiddenItems.length === 0) {
            return null;
        }
        const { popupStyle, popupPlacement, renderItemDivider } = this.props;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(BreadcrumbsSeparator_1.BreadcrumbsSeparator, { renderItemDivider: renderItemDivider }),
            react_1.default.createElement(BreadcrumbsMore_1.BreadcrumbsMore, { items: hiddenItems, popupPlacement: popupPlacement, popupStyle: popupStyle })));
    }
    recalculate() {
        const { items: allItems, lastDisplayedItemsCount, firstDisplayedItemsCount } = this.props;
        if (this.container.current) {
            const dividers = Array.from(this.container.current.querySelectorAll(`.${b('divider')}`));
            const items = Array.from(this.container.current.querySelectorAll(`.${b('item')}`));
            const availableWidth = this.container.current.offsetWidth;
            const itemsWidths = items.map((elem) => elem.scrollWidth);
            const dividersWidths = dividers.map((elem) => elem.offsetWidth);
            const buttonsWidth = itemsWidths.reduce((total, width, index, widths) => {
                const isLastItem = widths.length - 1 === index;
                const isItemBeforeLast = lastDisplayedItemsCount === LastDisplayedItemsCount.Two &&
                    widths.length - 2 === index;
                if (isLastItem || isItemBeforeLast) {
                    return total + Math.min(width, 200);
                }
                return total + width;
            }, 0);
            const dividersWidth = dividersWidths.reduce((total, width) => total + width, 0);
            let totalWidth = buttonsWidth + dividersWidth;
            let visibleItemsStartIndex = 1;
            while (totalWidth > availableWidth &&
                visibleItemsStartIndex < items.length - lastDisplayedItemsCount) {
                if (visibleItemsStartIndex === 1) {
                    totalWidth += MORE_ITEM_WIDTH + dividersWidths[visibleItemsStartIndex];
                }
                totalWidth -=
                    itemsWidths[visibleItemsStartIndex] + dividersWidths[visibleItemsStartIndex];
                visibleItemsStartIndex++;
            }
            this.setState({
                calculated: true,
                visibleItems: allItems.slice(visibleItemsStartIndex - (1 - firstDisplayedItemsCount)),
                hiddenItems: allItems.slice(firstDisplayedItemsCount, visibleItemsStartIndex - (1 - firstDisplayedItemsCount)),
            });
        }
    }
}
exports.Breadcrumbs = Breadcrumbs;
Breadcrumbs.defaultProps = {
    popupPlacement: DEFAULT_POPUP_PLACEMENT,
};
