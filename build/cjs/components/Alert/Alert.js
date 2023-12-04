"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../Button");
const Card_1 = require("../Card");
const Icon_1 = require("../Icon");
const Text_1 = require("../Text");
const layout_1 = require("../layout");
const AlertActions_1 = require("./AlertActions");
const AlertIcon_1 = require("./AlertIcon");
const AlertTitle_1 = require("./AlertTitle");
const constants_1 = require("./constants");
const Alert = (props) => {
    const { theme = 'normal', view = 'filled', layout = 'vertical', message, className, corners, style, onClose, align, } = props;
    const icon = props.icon || react_1.default.createElement(exports.Alert.Icon, { theme: theme, view: view });
    const title = typeof props.title === 'string' ? react_1.default.createElement(exports.Alert.Title, { text: props.title }) : props.title;
    const actions = Array.isArray(props.actions) ? (react_1.default.createElement(exports.Alert.Actions, { items: props.actions, parentLayout: layout })) : (props.actions);
    return (react_1.default.createElement(Card_1.Card, { style: style, className: (0, constants_1.bAlert)({ corners }, (0, layout_1.spacing)({ py: 4, px: 5 }, className)), theme: theme, view: view },
        react_1.default.createElement(layout_1.Flex, { gap: "3", alignItems: align },
            icon,
            react_1.default.createElement(layout_1.Flex, { direction: layout === 'vertical' ? 'column' : 'row', gap: "5", grow: true },
                react_1.default.createElement(layout_1.Flex, { gap: "2", grow: true, className: (0, constants_1.bAlert)('text-content') },
                    react_1.default.createElement(layout_1.Flex, { direction: "column", gap: "1", grow: true, justifyContent: align },
                        title,
                        message)),
                actions),
            onClose && (react_1.default.createElement(Button_1.Button, { view: "flat", onClick: onClose },
                react_1.default.createElement(Icon_1.Icon, { data: icons_1.Xmark, size: constants_1.DEFAULT_ICON_SIZE, className: (0, Text_1.colorText)({ color: 'secondary' }) }))))));
};
exports.Alert = Alert;
exports.Alert.Icon = AlertIcon_1.AlertIcon;
exports.Alert.Title = AlertTitle_1.AlertTitle;
exports.Alert.Actions = AlertActions_1.AlertActions;
