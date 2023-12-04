"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItem = exports.defaultRenderItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../Icon");
const cn_1 = require("../../utils/cn");
const event_broker_1 = require("../../utils/event-broker");
const constants_1 = require("../constants");
const b = (0, cn_1.block)('list');
const defaultRenderItem = (item) => String(item);
exports.defaultRenderItem = defaultRenderItem;
function getStyle(provided, style) {
    if (!style) {
        return provided === null || provided === void 0 ? void 0 : provided.draggableProps.style;
    }
    return Object.assign(Object.assign({}, provided === null || provided === void 0 ? void 0 : provided.draggableProps.style), style);
}
class ListItem extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.node = null;
        this.getNode = () => this.node;
        this.setRef = (node) => {
            var _a;
            this.node = node;
            (_a = this.props.provided) === null || _a === void 0 ? void 0 : _a.innerRef(node);
        };
        this.onClick = () => { var _a, _b; return (_b = (_a = this.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, this.props.item, this.props.itemIndex); };
        this.onClickCapture = (event) => {
            ListItem.publishEvent({
                domEvent: event,
                eventId: 'click',
            });
        };
        this.onMouseEnter = () => !this.props.item.disabled && this.props.onActivate(this.props.itemIndex);
        this.onMouseLeave = () => this.props.onActivate(undefined);
    }
    render() {
        var _a, _b;
        const { item, style, sortable, sortHandleAlign, itemClassName, selected, active, role = 'listitem', isDragging = false, } = this.props;
        return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        react_1.default.createElement("div", Object.assign({ role: role, "aria-selected": selected, "data-qa": active ? constants_1.ListQa.ACTIVE_ITEM : undefined, className: b('item', {
                sortable,
                active,
                selected,
                inactive: item.disabled,
                'sort-handle-align': sortHandleAlign,
                dragging: isDragging,
            }, itemClassName) }, (_a = this.props.provided) === null || _a === void 0 ? void 0 : _a.draggableProps, (_b = this.props.provided) === null || _b === void 0 ? void 0 : _b.dragHandleProps, { style: getStyle(this.props.provided, style), onClick: item.disabled ? undefined : this.onClick, onClickCapture: item.disabled ? undefined : this.onClickCapture, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, ref: this.setRef, id: `${this.props.listId}-item-${this.props.itemIndex}` }),
            this.renderSortIcon(),
            this.renderContent()));
    }
    renderSortIcon() {
        const { sortable } = this.props;
        return sortable ? (react_1.default.createElement("div", { className: b('item-sort-icon') },
            react_1.default.createElement(Icon_1.Icon, { data: icons_1.Grip, size: 12 }))) : null;
    }
    renderContent() {
        const { renderItem = exports.defaultRenderItem, item, active, itemIndex } = this.props;
        return react_1.default.createElement("div", { className: b('item-content') }, renderItem(item, active, itemIndex));
    }
}
exports.ListItem = ListItem;
ListItem.publishEvent = event_broker_1.eventBroker.withEventPublisher('List');
