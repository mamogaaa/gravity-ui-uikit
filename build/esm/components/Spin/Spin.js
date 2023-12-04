import React from 'react';
import { block } from '../utils/cn';
import './Spin.css';
const b = block('spin');
export const Spin = React.forwardRef(function Spin(props, ref) {
    const { size = 'm', style, className, qa } = props;
    return (React.createElement("div", { ref: ref, style: style, className: b({ size }, className), "data-qa": qa },
        React.createElement("div", { className: b('inner') })));
});
