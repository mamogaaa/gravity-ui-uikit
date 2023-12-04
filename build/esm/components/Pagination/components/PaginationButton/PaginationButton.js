import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft } from '@gravity-ui/icons';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import i18n from '../../i18n';
export const PaginationButton = ({ item, size, className, page, pageSize, onUpdate, compact, }) => {
    let button = null;
    const { disabled } = item;
    switch (item.action) {
        case 'first':
            button = (React.createElement(Button, { size: size, view: "outlined", className: className, onClick: () => onUpdate(1, pageSize), title: compact ? i18n('button_first') : undefined, disabled: disabled },
                React.createElement(Icon, { data: ChevronsLeft, size: "16" }),
                compact ? undefined : i18n('button_first')));
            break;
        case 'previous':
            button = (React.createElement(Button, { size: size, view: "outlined", className: className, onClick: () => onUpdate(page - 1, pageSize), title: compact ? i18n('button_previous') : undefined, disabled: disabled },
                React.createElement(Icon, { data: ChevronLeft, size: "16" }),
                compact ? undefined : i18n('button_previous')));
            break;
        case 'next':
            button = (React.createElement(Button, { size: size, view: "outlined", className: className, onClick: () => onUpdate(page + 1, pageSize), title: compact ? i18n('button_next') : undefined, disabled: disabled },
                React.createElement(Icon, { data: ChevronRight, size: "16" }),
                compact ? undefined : i18n('button_next')));
            break;
    }
    return button;
};
