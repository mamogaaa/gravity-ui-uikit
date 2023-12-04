"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../Icon");
const PersonaWrap_1 = require("../PersonaWrap");
const i18n_1 = tslib_1.__importDefault(require("./i18n"));
const utils_1 = require("./utils");
function Persona({ size = 's', theme = 'default', hasBorder = theme === 'default', type = 'person', onClick, onClose, text, image, className, style, }) {
    const textValue = (0, utils_1.extractTextValue)(text);
    const textView = (0, utils_1.extractTextView)(text);
    const closeButtonAriaAttributes = {
        'aria-label': (0, i18n_1.default)('label_remove-button', { persona: textValue }),
    };
    let avatar;
    switch (type) {
        case 'person':
            avatar = image ? react_1.default.createElement("img", { alt: '', src: image }) : react_1.default.createElement("span", null, (0, utils_1.getTwoLetters)(textValue));
            break;
        case 'email':
            avatar = react_1.default.createElement(Icon_1.Icon, { data: icons_1.Envelope, size: 14 });
            break;
        case 'empty':
            avatar = null;
            break;
    }
    const handleClick = react_1.default.useCallback(() => {
        onClick === null || onClick === void 0 ? void 0 : onClick(textValue);
    }, [textValue, onClick]);
    const handleClose = react_1.default.useCallback(() => {
        onClose === null || onClose === void 0 ? void 0 : onClose(textValue);
    }, [textValue, onClose]);
    return (react_1.default.createElement(PersonaWrap_1.PersonaWrap, { size: size, theme: hasBorder ? 'default' : 'clear', isEmpty: type === 'empty', onClick: onClick && handleClick, onClose: onClose && handleClose, avatar: avatar, className: className, style: style, closeButtonAriaAttributes: closeButtonAriaAttributes }, textView));
}
exports.Persona = Persona;
Persona.displayName = 'Persona';
