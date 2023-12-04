"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.TabsDirection = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const TabsContext_1 = require("./TabsContext");
const TabsItem_1 = require("./TabsItem");
const b = (0, cn_1.block)('tabs');
var TabsDirection;
(function (TabsDirection) {
    TabsDirection["Horizontal"] = "horizontal";
    TabsDirection["Vertical"] = "vertical";
})(TabsDirection = exports.TabsDirection || (exports.TabsDirection = {}));
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
const TabsComponent = react_1.default.forwardRef(({ direction = TabsDirection.Horizontal, size = 'm', activeTab, allowNotSelected = false, items = emptyTabsList, children, className, onSelectTab, wrapTo, qa, }, ref) => {
    const activeTabId = getActiveTabId(activeTab, allowNotSelected, items);
    const tabsContextValue = react_1.default.useMemo(() => ({ activeTabId }), [activeTabId]);
    const tabs = react_1.default.useMemo(() => {
        const handleTabClick = (tabId) => {
            if (onSelectTab) {
                onSelectTab(tabId);
            }
        };
        return items.map((item, index) => {
            const tabItemNode = react_1.default.createElement(TabsItem_1.TabsItem, Object.assign({ key: item.id }, item, { onClick: handleTabClick }));
            if (wrapTo) {
                return wrapTo(item, tabItemNode, index);
            }
            return tabItemNode;
        });
    }, [items, onSelectTab, wrapTo]);
    return (react_1.default.createElement("div", { role: "tablist", className: b({ direction, size }, className), "data-qa": qa, ref: ref },
        react_1.default.createElement(TabsContext_1.TabsContext.Provider, { value: tabsContextValue }, children || tabs)));
});
TabsComponent.displayName = 'Tabs';
exports.Tabs = Object.assign(TabsComponent, { Item: TabsItem_1.TabsItem });
