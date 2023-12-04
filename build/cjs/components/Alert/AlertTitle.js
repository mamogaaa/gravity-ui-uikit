"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertTitle = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Text_1 = require("../Text");
const constants_1 = require("./constants");
const AlertTitle = ({ text, className }) => {
    return (react_1.default.createElement(Text_1.Text, { variant: "subheader-2", className: (0, constants_1.bAlert)('title', className) }, text));
};
exports.AlertTitle = AlertTitle;
