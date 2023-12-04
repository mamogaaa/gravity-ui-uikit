import React from 'react';
import { Label } from '../Label';
import { block } from '../utils/cn';
import { TabsContext } from './TabsContext';
const b = block('tabs');
export function TabsItem({ id, className, title, meta, hint, icon, counter, label, active, disabled, hasOverflow, extraProps, onClick, }) {
    const { activeTabId } = React.useContext(TabsContext);
    const isActive = typeof active === 'boolean' ? active : activeTabId === id;
    const handleClick = () => {
        onClick(id);
    };
    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            onClick(id);
        }
    };
    const htmlTitle = React.useMemo(() => {
        if (hint !== undefined) {
            return hint;
        }
        if (typeof title === 'string') {
            return title;
        }
        return undefined;
    }, [hint, title]);
    return (React.createElement("div", Object.assign({}, extraProps, { role: "tab", "aria-selected": isActive, "aria-disabled": disabled === true, tabIndex: disabled ? -1 : 0, className: b('item', { active: isActive, disabled, overflow: Boolean(hasOverflow) }, className), title: htmlTitle, onClick: handleClick, onKeyDown: handleKeyDown }),
        React.createElement("div", { className: b('item-content') },
            icon && React.createElement("div", { className: b('item-icon') }, icon),
            React.createElement("div", { className: b('item-title') }, title || id),
            typeof counter === 'number' && React.createElement("div", { className: b('item-counter') }, counter),
            label && (React.createElement(Label, { className: b('item-label'), theme: label.theme }, label.content))),
        meta && React.createElement("div", { className: b('item-meta') }, meta)));
}
TabsItem.displayName = 'Tabs.Item';
