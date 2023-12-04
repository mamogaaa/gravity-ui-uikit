"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectClear = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../../Icon");
const constants_1 = require("../../constants");
const i18n_1 = tslib_1.__importDefault(require("../../i18n"));
const SelectClear = (props) => {
    const { size, onClick, onMouseEnter, onMouseLeave, renderIcon } = props;
    const icon = renderIcon ? (renderIcon()) : (react_1.default.createElement(Icon_1.Icon, { className: (0, constants_1.selectClearBlock)('clear'), data: icons_1.Xmark }));
    return (react_1.default.createElement("button", { className: (0, constants_1.selectClearBlock)({ size }), "aria-label": (0, i18n_1.default)('label_clear'), onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, "data-qa": constants_1.SelectQa.CLEAR }, icon));
};
exports.SelectClear = SelectClear;
exports.SelectClear.displayName = 'SelectClear';
