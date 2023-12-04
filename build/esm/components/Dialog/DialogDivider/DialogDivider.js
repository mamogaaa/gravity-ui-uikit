import React from 'react';
import { block } from '../../utils/cn';
import './DialogDivider.css';
const b = block('dialog-divider');
export function DialogDivider({ className }) {
    return React.createElement("div", { className: b(null, className) });
}
