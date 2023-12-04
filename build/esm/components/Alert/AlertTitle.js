import React from 'react';
import { Text } from '../Text';
import { bAlert } from './constants';
export const AlertTitle = ({ text, className }) => {
    return (React.createElement(Text, { variant: "subheader-2", className: bAlert('title', className) }, text));
};
