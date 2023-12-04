import React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { blockNew } from '../../../utils/cn';
import i18n from './i18n';
import './ClearButton.css';
const b = blockNew('clear-button');
const ICON_SIZE = 16;
export const mapTextInputSizeToButtonSize = (textInputSize) => {
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
export const ClearButton = (props) => {
    const { size, className, onClick } = props;
    // TODO: remove using of Button component after https://github.com/gravity-ui/uikit/issues/645
    return (React.createElement(Button, { size: size, className: b(null, className), onClick: onClick, extraProps: { 'aria-label': i18n('label_clear-button') } },
        React.createElement(Icon, { data: Xmark, size: ICON_SIZE })));
};
