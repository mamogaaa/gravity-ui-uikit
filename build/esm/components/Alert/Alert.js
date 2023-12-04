import React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { Button } from '../Button';
import { Card } from '../Card';
import { Icon } from '../Icon';
import { colorText } from '../Text';
import { Flex, spacing } from '../layout';
import { AlertActions } from './AlertActions';
import { AlertIcon } from './AlertIcon';
import { AlertTitle } from './AlertTitle';
import { DEFAULT_ICON_SIZE, bAlert } from './constants';
export const Alert = (props) => {
    const { theme = 'normal', view = 'filled', layout = 'vertical', message, className, corners, style, onClose, align, } = props;
    const icon = props.icon || React.createElement(Alert.Icon, { theme: theme, view: view });
    const title = typeof props.title === 'string' ? React.createElement(Alert.Title, { text: props.title }) : props.title;
    const actions = Array.isArray(props.actions) ? (React.createElement(Alert.Actions, { items: props.actions, parentLayout: layout })) : (props.actions);
    return (React.createElement(Card, { style: style, className: bAlert({ corners }, spacing({ py: 4, px: 5 }, className)), theme: theme, view: view },
        React.createElement(Flex, { gap: "3", alignItems: align },
            icon,
            React.createElement(Flex, { direction: layout === 'vertical' ? 'column' : 'row', gap: "5", grow: true },
                React.createElement(Flex, { gap: "2", grow: true, className: bAlert('text-content') },
                    React.createElement(Flex, { direction: "column", gap: "1", grow: true, justifyContent: align },
                        title,
                        message)),
                actions),
            onClose && (React.createElement(Button, { view: "flat", onClick: onClose },
                React.createElement(Icon, { data: Xmark, size: DEFAULT_ICON_SIZE, className: colorText({ color: 'secondary' }) }))))));
};
Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Actions = AlertActions;
