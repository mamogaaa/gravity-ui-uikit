import React from 'react';
import { Text } from '../../../Text';
import { Flex } from '../../Flex/Flex';
import { LayoutProvider } from '../../LayoutProvider/LayoutProvider';
import { useLayoutContext } from '../../hooks/useLayoutContext';
import { sp } from '../../spacing/spacing';
function Title({ title }) {
    const { activeMediaQuery } = useLayoutContext();
    return (React.createElement(Flex, { direction: "column", space: "5", className: sp({ mb: '5' }) },
        title && (React.createElement(Text, { variant: "subheader-2", as: "div" }, title)),
        React.createElement(Text, { color: "secondary", as: "div" },
            "Active media query: ",
            activeMediaQuery)));
}
export const LayoutPresenter = ({ children, title }) => {
    return (React.createElement(LayoutProvider, null,
        React.createElement(Title, { title: title }),
        React.createElement("div", { style: {
                width: '100%',
                height: '100%',
                border: '3px dashed lightgray',
            } }, children)));
};
