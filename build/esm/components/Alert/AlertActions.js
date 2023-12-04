import React from 'react';
import { Button } from '../Button';
import { Flex } from '../layout';
import { bAlert } from './constants';
export const AlertActions = ({ items, children, parentLayout = 'vertical', className, }) => {
    return (React.createElement(Flex, { className: bAlert('actions', { minContent: parentLayout === 'horizontal' }, className), direction: "row", gap: "3", wrap: true, alignItems: parentLayout === 'horizontal' ? 'center' : 'flex-start' }, (items === null || items === void 0 ? void 0 : items.map(({ handler, text }, i) => (React.createElement(Button, { key: i, onClick: handler }, text)))) || children));
};
