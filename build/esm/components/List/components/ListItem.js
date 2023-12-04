import React from 'react';
import { Grip } from '@gravity-ui/icons';
import { Icon } from '../../Icon';
import { block } from '../../utils/cn';
import { eventBroker } from '../../utils/event-broker';
import { ListQa } from '../constants';
const b = block('list');
export const defaultRenderItem = (item) => String(item);
function getStyle(provided, style) {
    if (!style) {
        return provided === null || provided === void 0 ? void 0 : provided.draggableProps.style;
    }
    return Object.assign(Object.assign({}, provided === null || provided === void 0 ? void 0 : provided.draggableProps.style), style);
}
export class ListItem extends React.Component {
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
        React.createElement("div", Object.assign({ role: role, "aria-selected": selected, "data-qa": active ? ListQa.ACTIVE_ITEM : undefined, className: b('item', {
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
        return sortable ? (React.createElement("div", { className: b('item-sort-icon') },
            React.createElement(Icon, { data: Grip, size: 12 }))) : null;
    }
    renderContent() {
        const { renderItem = defaultRenderItem, item, active, itemIndex } = this.props;
        return React.createElement("div", { className: b('item-content') }, renderItem(item, active, itemIndex));
    }
}
ListItem.publishEvent = eventBroker.withEventPublisher('List');
