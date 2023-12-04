"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearButton = exports.mapTextInputSizeToButtonSize = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../../Button");
const Icon_1 = require("../../../Icon");
const cn_1 = require("../../../utils/cn");
const i18n_1 = tslib_1.__importDefault(require("./i18n"));
const b = (0, cn_1.blockNew)('clear-button');
const ICON_SIZE = 16;
const mapTextInputSizeToButtonSize = (textInputSize) => {
    switch (textInputSize) {
        case 's': {
            return 'xs';
        }
        case 'm': {
            return 's';
        }
        case 'l': {
            return 'm';
        }
        case 'xl': {
            return 'l';
        }
        default: {
            throw new Error(`Unknown text input size "${textInputSize}"`);
        }
    }
};
exports.mapTextInputSizeToButtonSize = mapTextInputSizeToButtonSize;
const ClearButton = (props) => {
    const { size, className, onClick } = props;
    // TODO: remove using of Button component after https://github.com/gravity-ui/uikit/issues/645
    return (react_1.default.createElement(Button_1.Button, { size: size, className: b(null, className), onClick: onClick, extraProps: { 'aria-label': (0, i18n_1.default)('label_clear-button') } },
        react_1.default.createElement(Icon_1.Icon, { data: icons_1.Xmark, size: ICON_SIZE })));
};
exports.ClearButton = ClearButton;
