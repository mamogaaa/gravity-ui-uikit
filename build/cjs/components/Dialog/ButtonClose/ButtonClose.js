"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonClose = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../Button");
const Icon_1 = require("../../Icon");
const cn_1 = require("../../utils/cn");
const i18n_1 = tslib_1.__importDefault(require("../i18n"));
const b = (0, cn_1.block)('dialog-btn-close');
function ButtonClose({ onClose }) {
    return (react_1.default.createElement("div", { className: b() },
        react_1.default.createElement(Button_1.Button, { view: "flat", size: "l", className: b('btn'), onClick: (event) => onClose(event, { isOutsideClick: false }), extraProps: {
                'aria-label': (0, i18n_1.default)('close'),
            } },
            react_1.default.createElement(Icon_1.Icon, { data: icons_1.Xmark, size: 20 }))));
}
exports.ButtonClose = ButtonClose;
