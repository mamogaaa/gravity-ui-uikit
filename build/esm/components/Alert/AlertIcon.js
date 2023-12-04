import React from 'react';
import { CircleCheck, CircleCheckFill, CircleInfo, CircleInfoFill, CircleXmark, CircleXmarkFill, Thunderbolt, ThunderboltFill, TriangleExclamation, TriangleExclamationFill, } from '@gravity-ui/icons';
import { Icon } from '../Icon';
import { colorText } from '../Text/colorText/colorText';
import { DEFAULT_ICON_SIZE, bAlert } from './constants';
const typeToIcon = {
    danger: {
        filled: CircleXmarkFill,
        outlined: CircleXmark,
    },
    info: {
        filled: CircleInfoFill,
        outlined: CircleInfo,
    },
    positive: {
        filled: CircleCheckFill,
        outlined: CircleCheck,
    },
    success: {
        filled: CircleCheckFill,
        outlined: CircleCheck,
    },
    warning: {
        filled: TriangleExclamationFill,
        outlined: TriangleExclamation,
    },
    utility: {
        filled: ThunderboltFill,
        outlined: Thunderbolt,
    },
    normal: null,
};
export const AlertIcon = ({ className, theme, view = 'filled', size = DEFAULT_ICON_SIZE, }) => {
    const iconByTheme = typeToIcon[theme];
    if (!iconByTheme) {
        return null;
    }
    let color;
    if (theme === 'success') {
        color = 'positive';
    }
    else if (theme !== 'normal') {
        color = theme;
    }
    return (React.createElement("div", { className: bAlert('icon', colorText({ color }, className)) },
        React.createElement(Icon, { data: iconByTheme[view], size: size })));
};
