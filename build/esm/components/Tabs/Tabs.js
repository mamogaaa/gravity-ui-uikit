import React from 'react';
import { block } from '../utils/cn';
import { TabsContext } from './TabsContext';
import { TabsItem } from './TabsItem';
import './Tabs.css';
const b = block('tabs');
export var TabsDirection;
(function (TabsDirection) {
    TabsDirection["Horizontal"] = "horizontal";
    TabsDirection["Vertical"] = "vertical";
})(TabsDirection || (TabsDirection = {}));
const getActiveTabId = (activeTab, allowNotSelected, items) => {
    var _a;
    if (activeTab) {
        return activeTab;
    }
    if (allowNotSelected || (items === null || items === void 0 ? void 0 : items.length) === 0) {
        return undefined;
    }
    return (_a = items === null || items === void 0 ? void 0 : items[0]) === null || _a === void 0 ? void 0 : _a.id;
};
const emptyTabsList = [];
const TabsComponent = React.forwardRef(({ direction = TabsDirection.Horizontal, size = 'm', activeTab, allowNotSelected = false, items = emptyTabsList, children, className, onSelectTab, wrapTo, qa, }, ref) => {
    const activeTabId = getActiveTabId(activeTab, allowNotSelected, items);
    const tabsContextValue = React.useMemo(() => ({ activeTabId }), [activeTabId]);
    const tabs = React.useMemo(() => {
        const handleTabClick = (tabId) => {
            if (onSelectTab) {
                onSelectTab(tabId);
            }
        };
        return items.map((item, index) => {
            const tabItemNode = React.createElement(TabsItem, Object.assign({ key: item.id }, item, { onClick: handleTabClick }));
            if (wrapTo) {
                return wrapTo(item, tabItemNode, index);
            }
            return tabItemNode;
        });
    }, [items, onSelectTab, wrapTo]);
    return (React.createElement("div", { role: "tablist", className: b({ direction, size }, className), "data-qa": qa, ref: ref },
        React.createElement(TabsContext.Provider, { value: tabsContextValue }, children || tabs)));
});
TabsComponent.displayName = 'Tabs';
export const Tabs = Object.assign(TabsComponent, { Item: TabsItem });