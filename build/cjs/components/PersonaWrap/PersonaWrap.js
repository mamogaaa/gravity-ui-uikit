"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaWrap = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../Icon");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('persona');
function PersonaWrap({ size = 's', theme = 'default', isEmpty, onClick, onClose, className, avatar, children, style, closeButtonAriaAttributes, }) {
    const clickable = Boolean(onClick);
    const closeable = Boolean(onClose);
    const MainComponent = clickable ? 'button' : 'div';
    return (react_1.default.createElement("div", { className: b({ size, theme, clickable, closeable, empty: isEmpty }, className), style: style },
        react_1.default.createElement(MainComponent, { onClick: onClick, className: b('main') },
            avatar && react_1.default.createElement("div", { className: b('avatar') }, avatar),
            react_1.default.createElement("div", { className: b('text') }, children)),
        onClose && (react_1.default.createElement("button", Object.assign({ className: b('close'), onClick: onClose }, closeButtonAriaAttributes),
            react_1.default.createElement(Icon_1.Icon, { data: icons_1.Xmark, size: 12, className: b('close-icon') })))));
}
exports.PersonaWrap = PersonaWrap;
PersonaWrap.displayName = 'PersonaWrap';
