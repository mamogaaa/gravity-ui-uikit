import React from 'react';
import { block } from '../../utils/cn';
import './DialogBody.css';
const b = block('dialog-body');
export function DialogBody(props) {
    const { className } = props;
    return React.createElement("div", { className: b(null, className) }, props.children);
}
