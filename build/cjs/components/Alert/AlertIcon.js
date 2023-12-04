"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertIcon = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../Icon");
const colorText_1 = require("../Text/colorText/colorText");
const constants_1 = require("./constants");
const typeToIcon = {
    danger: {
        filled: icons_1.CircleXmarkFill,
        outlined: icons_1.CircleXmark,
    },
    info: {
        filled: icons_1.CircleInfoFill,
        outlined: icons_1.CircleInfo,
    },
    positive: {
        filled: icons_1.CircleCheckFill,
        outlined: icons_1.CircleCheck,
    },
    success: {
        filled: icons_1.CircleCheckFill,
        outlined: icons_1.CircleCheck,
    },
    warning: {
        filled: icons_1.TriangleExclamationFill,
        outlined: icons_1.TriangleExclamation,
    },
    utility: {
        filled: icons_1.ThunderboltFill,
        outlined: icons_1.Thunderbolt,
    },
    normal: null,
};
const AlertIcon = ({ className, theme, view = 'filled', size = constants_1.DEFAULT_ICON_SIZE, }) => {
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
    return (react_1.default.createElement("div", { className: (0, constants_1.bAlert)('icon', (0, colorText_1.colorText)({ color }, className)) },
        react_1.default.createElement(Icon_1.Icon, { data: iconByTheme[view], size: size })));
};
exports.AlertIcon = AlertIcon;
