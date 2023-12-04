"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const MenuGroup_1 = require("./MenuGroup");
const MenuItem_1 = require("./MenuItem");
const b = (0, cn_1.block)('menu');
// TODO: keyboard navigation, Up/Down arrows and Enter
exports.Menu = react_1.default.forwardRef(function Menu({ size = 'm', children, style, className, qa }, ref) {
    return (react_1.default.createElement("ul", { ref: ref, role: "menu", 
        // tabIndex={0}
        style: style, className: b({ size }, className), "data-qa": qa }, children));
});
exports.Menu.Item = MenuItem_1.MenuItem;
exports.Menu.Group = MenuGroup_1.MenuGroup;
