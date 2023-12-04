"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonIcon = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('button');
const ButtonIcon = ({ side, className, children }) => {
    return (react_1.default.createElement("span", { className: b('icon', {
            side,
        }, className) },
        react_1.default.createElement("span", { className: b('icon-inner') }, children)));
};
exports.ButtonIcon = ButtonIcon;
exports.ButtonIcon.displayName = 'Button.Icon';
