import React from 'react';
import { Envelope } from '@gravity-ui/icons';
import { Icon } from '../Icon';
import { PersonaWrap } from '../PersonaWrap';
import i18n from './i18n';
import { extractTextValue, extractTextView, getTwoLetters } from './utils';
export function Persona({ size = 's', theme = 'default', hasBorder = theme === 'default', type = 'person', onClick, onClose, text, image, className, style, }) {
    const textValue = extractTextValue(text);
    const textView = extractTextView(text);
    const closeButtonAriaAttributes = {
        'aria-label': i18n('label_remove-button', { persona: textValue }),
    };
    let avatar;
    switch (type) {
        case 'person':
            avatar = image ? React.createElement("img", { alt: '', src: image }) : React.createElement("span", null, getTwoLetters(textValue));
            break;
        case 'email':
            avatar = React.createElement(Icon, { data: Envelope, size: 14 });
            break;
        case 'empty':
            avatar = null;
            break;
    }
    const handleClick = React.useCallback(() => {
        onClick === null || onClick === void 0 ? void 0 : onClick(textValue);
    }, [textValue, onClick]);
    const handleClose = React.useCallback(() => {
        onClose === null || onClose === void 0 ? void 0 : onClose(textValue);
    }, [textValue, onClose]);
    return (React.createElement(PersonaWrap, { size: size, theme: hasBorder ? 'default' : 'clear', isEmpty: type === 'empty', onClick: onClick && handleClick, onClose: onClose && handleClose, avatar: avatar, className: className, style: style, closeButtonAriaAttributes: closeButtonAriaAttributes }, textView));
}
Persona.displayName = 'Persona';
