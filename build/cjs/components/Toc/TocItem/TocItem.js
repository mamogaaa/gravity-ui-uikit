"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TocItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../../hooks");
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.blockNew)('toc-item');
const TocItem = (props) => {
    const { active = false, childItem = false, content, href, value, onClick } = props;
    const handleClick = react_1.default.useCallback(() => {
        if (value === undefined || !onClick) {
            return;
        }
        onClick(value);
    }, [onClick, value]);
    const { onKeyDown } = (0, hooks_1.useActionHandlers)(handleClick);
    const item = href === undefined ? (react_1.default.createElement("div", { role: "button", tabIndex: 0, className: b('section-link'), onClick: handleClick, onKeyDown: onKeyDown }, content)) : (react_1.default.createElement("a", { href: href, onClick: handleClick, className: b('section-link') }, content));
    return react_1.default.createElement("div", { className: b('section', { child: childItem, active }) }, item);
};
exports.TocItem = TocItem;
