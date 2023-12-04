"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTooltip = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Hotkey_1 = require("../Hotkey");
const Tooltip_1 = require("../Tooltip");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('action-tooltip');
function ActionTooltip(props) {
    const { title, hotkey, description, children } = props, tooltipProps = tslib_1.__rest(props, ["title", "hotkey", "description", "children"]);
    return (react_1.default.createElement(Tooltip_1.Tooltip, Object.assign({}, tooltipProps, { className: b(null, tooltipProps.className), contentClassName: b('layout'), content: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: b('heading') },
                react_1.default.createElement("div", { className: b('title') }, title),
                hotkey && react_1.default.createElement(Hotkey_1.Hotkey, { view: "dark", value: hotkey, className: b('hotkey') })),
            description && react_1.default.createElement("div", { className: b('description') }, description)) }), children));
}
exports.ActionTooltip = ActionTooltip;
