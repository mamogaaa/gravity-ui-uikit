import React from 'react';
import { block } from '../utils/cn';
import './Loader.css';
const b = block('loader');
export function Loader({ size = 's', className }) {
    return (React.createElement("div", { className: b({ size }, className) },
        React.createElement("div", { className: b('left') }),
        React.createElement("div", { className: b('center') }),
        React.createElement("div", { className: b('right') })));
}
