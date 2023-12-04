"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationButton = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../../Button");
const Icon_1 = require("../../../Icon");
const i18n_1 = tslib_1.__importDefault(require("../../i18n"));
const PaginationButton = ({ item, size, className, page, pageSize, onUpdate, compact, }) => {
    let button = null;
    const { disabled } = item;
    switch (item.action) {
        case 'first':
            button = (react_1.default.createElement(Button_1.Button, { size: size, view: "outlined", className: className, onClick: () => onUpdate(1, pageSize), title: compact ? (0, i18n_1.default)('button_first') : undefined, disabled: disabled },
                react_1.default.createElement(Icon_1.Icon, { data: icons_1.ChevronsLeft, size: "16" }),
                compact ? undefined : (0, i18n_1.default)('button_first')));
            break;
        case 'previous':
            button = (react_1.default.createElement(Button_1.Button, { size: size, view: "outlined", className: className, onClick: () => onUpdate(page - 1, pageSize), title: compact ? (0, i18n_1.default)('button_previous') : undefined, disabled: disabled },
                react_1.default.createElement(Icon_1.Icon, { data: icons_1.ChevronLeft, size: "16" }),
                compact ? undefined : (0, i18n_1.default)('button_previous')));
            break;
        case 'next':
            button = (react_1.default.createElement(Button_1.Button, { size: size, view: "outlined", className: className, onClick: () => onUpdate(page + 1, pageSize), title: compact ? (0, i18n_1.default)('button_next') : undefined, disabled: disabled },
                react_1.default.createElement(Icon_1.Icon, { data: icons_1.ChevronRight, size: "16" }),
                compact ? undefined : (0, i18n_1.default)('button_next')));
            break;
    }
    return button;
};
exports.PaginationButton = PaginationButton;
