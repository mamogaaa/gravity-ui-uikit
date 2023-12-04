import React from 'react';
import { block } from '../utils/cn';
import './Popup.css';
const b = block('popup');
export function PopupArrow({ styles, attributes, setArrowRef }) {
    return (React.createElement("div", Object.assign({ "data-popper-arrow": true, ref: setArrowRef, className: b('arrow'), style: styles }, attributes),
        React.createElement("div", { className: b('arrow-content') },
            React.createElement("div", { className: b('arrow-circle-wrapper') },
                React.createElement("div", { className: b('arrow-circle', { left: true }) })),
            React.createElement("div", { className: b('arrow-circle-wrapper') },
                React.createElement("div", { className: b('arrow-circle', { right: true }) })))));
}
