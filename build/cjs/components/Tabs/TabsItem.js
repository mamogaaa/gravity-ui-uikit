"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Label_1 = require("../Label");
const cn_1 = require("../utils/cn");
const TabsContext_1 = require("./TabsContext");
const b = (0, cn_1.block)('tabs');
function TabsItem({ id, className, title, meta, hint, icon, counter, label, active, disabled, hasOverflow, extraProps, onClick, }) {
    const { activeTabId } = react_1.default.useContext(TabsContext_1.TabsContext);
    const isActive = typeof active === 'boolean' ? active : activeTabId === id;
    const handleClick = () => {
        onClick(id);
    };
    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            onClick(id);
        }
    };
    const htmlTitle = react_1.default.useMemo(() => {
        if (hint !== undefined) {
            return hint;
        }
        if (typeof title === 'string') {
            return title;
        }
        return undefined;
    }, [hint, title]);
    return (react_1.default.createElement("div", Object.assign({}, extraProps, { role: "tab", "aria-selected": isActive, "aria-disabled": disabled === true, tabIndex: disabled ? -1 : 0, className: b('item', { active: isActive, disabled, overflow: Boolean(hasOverflow) }, className), title: htmlTitle, onClick: handleClick, onKeyDown: handleKeyDown }),
        react_1.default.createElement("div", { className: b('item-content') },
            icon && react_1.default.createElement("div", { className: b('item-icon') }, icon),
            react_1.default.createElement("div", { className: b('item-title') }, title || id),
            typeof counter === 'number' && react_1.default.createElement("div", { className: b('item-counter') }, counter),
            label && (react_1.default.createElement(Label_1.Label, { className: b('item-label'), theme: label.theme }, label.content))),
        meta && react_1.default.createElement("div", { className: b('item-meta') }, meta)));
}
exports.TabsItem = TabsItem;
TabsItem.displayName = 'Tabs.Item';
