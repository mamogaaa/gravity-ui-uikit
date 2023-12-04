"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuGroup = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../hooks");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('menu');
exports.MenuGroup = react_1.default.forwardRef(function MenuGroup({ label, children, style, className, qa }, ref) {
    const labelId = (0, hooks_1.useUniqId)();
    return (react_1.default.createElement("li", { ref: ref, className: b('list-group-item') },
        react_1.default.createElement("div", { style: style, className: b('group', className), "data-qa": qa },
            label && (react_1.default.createElement("div", { id: labelId, className: b('group-label') }, label)),
            react_1.default.createElement("ul", { role: "group", "aria-labelledby": labelId, className: b('group-list') }, children))));
});
