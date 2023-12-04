import React from 'react';
import { block } from '../../utils/cn';
import './DialogHeader.css';
const b = block('dialog-header');
export function DialogHeader(props) {
    const { caption = '', insertBefore, insertAfter, className, id } = props;
    return (React.createElement("div", { className: b(null, className) },
        insertBefore,
        React.createElement("div", { className: b('caption'), id: id }, caption),
        insertAfter));
}
