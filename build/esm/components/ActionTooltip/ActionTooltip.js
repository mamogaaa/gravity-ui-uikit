import { __rest } from "tslib";
import React from 'react';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';
import { block } from '../utils/cn';
import './ActionTooltip.css';
const b = block('action-tooltip');
export function ActionTooltip(props) {
    const { title, hotkey, description, children } = props, tooltipProps = __rest(props, ["title", "hotkey", "description", "children"]);
    return (React.createElement(Tooltip, Object.assign({}, tooltipProps, { className: b(null, tooltipProps.className), contentClassName: b('layout'), content: React.createElement(React.Fragment, null,
            React.createElement("div", { className: b('heading') },
                React.createElement("div", { className: b('title') }, title),
                hotkey && React.createElement(Hotkey, { view: "dark", value: hotkey, className: b('hotkey') })),
            description && React.createElement("div", { className: b('description') }, description)) }), children));
}
