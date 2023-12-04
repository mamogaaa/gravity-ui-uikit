"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertActions = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = require("../Button");
const layout_1 = require("../layout");
const constants_1 = require("./constants");
const AlertActions = ({ items, children, parentLayout = 'vertical', className, }) => {
    return (react_1.default.createElement(layout_1.Flex, { className: (0, constants_1.bAlert)('actions', { minContent: parentLayout === 'horizontal' }, className), direction: "row", gap: "3", wrap: true, alignItems: parentLayout === 'horizontal' ? 'center' : 'flex-start' }, (items === null || items === void 0 ? void 0 : items.map(({ handler, text }, i) => (react_1.default.createElement(Button_1.Button, { key: i, onClick: handler }, text)))) || children));
};
exports.AlertActions = AlertActions;
