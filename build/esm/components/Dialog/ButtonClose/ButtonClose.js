import React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { block } from '../../utils/cn';
import i18n from '../i18n';
import './ButtonClose.css';
const b = block('dialog-btn-close');
export function ButtonClose({ onClose }) {
    return (React.createElement("div", { className: b() },
        React.createElement(Button, { view: "flat", size: "l", className: b('btn'), onClick: (event) => onClose(event, { isOutsideClick: false }), extraProps: {
                'aria-label': i18n('close'),
            } },
            React.createElement(Icon, { data: Xmark, size: 20 }))));
}
