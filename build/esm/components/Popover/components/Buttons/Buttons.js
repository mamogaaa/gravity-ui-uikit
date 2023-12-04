import React from 'react';
import { Button } from '../../../Button';
import { cnPopover } from '../../Popover.classname';
import { getButtonView } from './helpers/getButtonView';
export const Buttons = ({ theme, tooltipActionButton, tooltipCancelButton }) => {
    if (!tooltipActionButton && !tooltipCancelButton) {
        return null;
    }
    return (React.createElement("div", { className: cnPopover('tooltip-buttons') },
        tooltipActionButton && (React.createElement(Button, { view: getButtonView(theme, true), width: "max", onClick: tooltipActionButton.onClick, className: cnPopover('tooltip-button') }, tooltipActionButton.text)),
        tooltipCancelButton && (React.createElement(Button, { view: getButtonView(theme, false), width: "max", onClick: tooltipCancelButton.onClick, className: cnPopover('tooltip-button') }, tooltipCancelButton.text))));
};
