import React from 'react';
import _throttle from 'lodash/throttle';
import { block } from '../utils/cn';
import { BreadcrumbsItem as Item } from './BreadcrumbsItem';
import { BreadcrumbsMore } from './BreadcrumbsMore';
import { BreadcrumbsSeparator } from './BreadcrumbsSeparator';
import './Breadcrumbs.css';
const RESIZE_THROTTLE = 200;
const MORE_ITEM_WIDTH = 34;
const DEFAULT_POPUP_PLACEMENT = ['bottom', 'top'];
const b = block('breadcrumbs');
export var LastDisplayedItemsCount;
(function (LastDisplayedItemsCount) {
    LastDisplayedItemsCount[LastDisplayedItemsCount["One"] = 1] = "One";
    LastDisplayedItemsCount[LastDisplayedItemsCount["Two"] = 2] = "Two";
})(LastDisplayedItemsCount || (LastDisplayedItemsCount = {}));
export var FirstDisplayedItemsCount;
(function (FirstDisplayedItemsCount) {
    FirstDisplayedItemsCount[FirstDisplayedItemsCount["Zero"] = 0] = "Zero";
    FirstDisplayedItemsCount[FirstDisplayedItemsCount["One"] = 1] = "One";
})(FirstDisplayedItemsCount || (FirstDisplayedItemsCount = {}));
export class Breadcrumbs extends React.Component {
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
        this.handleResize = _throttle(this.handleResize, RESIZE_THROTTLE);
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.container = React.createRef();
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
        return (React.createElement("div", { className: b({ calculated: calculated ? 'yes' : 'no' }, className) },
            React.createElement("div", { className: b('inner'), ref: this.container },
                rootItem,
                this.renderMoreItem(),
                this.renderVisibleItems())));
    }
    renderItem(data, isCurrent, isPrevCurrent) {
        const { renderItemContent } = this.props;
        return (React.createElement(Item, { data: data, isCurrent: isCurrent, isPrevCurrent: isPrevCurrent, renderItem: renderItemContent }));
    }
    renderItemDivider() {
        const { renderItemDivider } = this.props;
        return React.createElement(BreadcrumbsSeparator, { renderItemDivider: renderItemDivider });
    }
    renderRootItem() {
        const { renderRootContent, renderItemContent } = this.props;
        const { rootItem, visibleItems } = this.state;
        const isCurrent = visibleItems.length === 0;
        if (!rootItem) {
            return null;
        }
        return (React.createElement(Item, { data: rootItem, isCurrent: isCurrent, isPrevCurrent: false, renderItem: renderRootContent || renderItemContent }));
    }
    renderVisibleItems() {
        const { visibleItems } = this.state;
        return visibleItems.map((item, index, items) => {
            const isCurrent = index === items.length - 1;
            const isPrevCurrent = index === items.length - 2;
            return (React.createElement(React.Fragment, { key: index },
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
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadcrumbsSeparator, { renderItemDivider: renderItemDivider }),
            React.createElement(BreadcrumbsMore, { items: hiddenItems, popupPlacement: popupPlacement, popupStyle: popupStyle })));
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
Breadcrumbs.defaultProps = {
    popupPlacement: DEFAULT_POPUP_PLACEMENT,
};
