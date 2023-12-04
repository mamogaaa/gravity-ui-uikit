"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buttons = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = require("../../../Button");
const Popover_classname_1 = require("../../Popover.classname");
const getButtonView_1 = require("./helpers/getButtonView");
const Buttons = ({ theme, tooltipActionButton, tooltipCancelButton }) => {
    if (!tooltipActionButton && !tooltipCancelButton) {
        return null;
    }
    return (react_1.default.createElement("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-buttons') },
        tooltipActionButton && (react_1.default.createElement(Button_1.Button, { view: (0, getButtonView_1.getButtonView)(theme, true), width: "max", onClick: tooltipActionButton.onClick, className: (0, Popover_classname_1.cnPopover)('tooltip-button') }, tooltipActionButton.text)),
        tooltipCancelButton && (react_1.default.createElement(Button_1.Button, { view: (0, getButtonView_1.getButtonView)(theme, false), width: "max", onClick: tooltipCancelButton.onClick, className: (0, Popover_classname_1.cnPopover)('tooltip-button') }, tooltipCancelButton.text))));
};
exports.Buttons = Buttons;
