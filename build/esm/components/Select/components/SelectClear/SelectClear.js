import React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { Icon } from '../../../Icon';
import { SelectQa, selectClearBlock } from '../../constants';
import i18n from '../../i18n';
import './SelectClear.css';
export const SelectClear = (props) => {
    const { size, onClick, onMouseEnter, onMouseLeave, renderIcon } = props;
    const icon = renderIcon ? (renderIcon()) : (React.createElement(Icon, { className: selectClearBlock('clear'), data: Xmark }));
    return (React.createElement("button", { className: selectClearBlock({ size }), "aria-label": i18n('label_clear'), onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, "data-qa": SelectQa.CLEAR }, icon));
};
SelectClear.displayName = 'SelectClear';
