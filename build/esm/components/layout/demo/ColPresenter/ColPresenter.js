import { __rest } from "tslib";
import React from 'react';
import { Col } from '../../Col/Col';
import { Box } from '../Box/Box';
// @ts-ignore-error
const pickSizeProps = ({ l, xl, s, m, xxl, xxxl, size } = {}) => {
    // skip empty values
    return Object.entries(Object.assign({ l, xl, s, m, xxl, xxxl, size }))
        .reduce((acc, [media, value]) => {
        if (value) {
            acc.push(`${media}=${value}`);
        }
        return acc;
    }, [])
        .join(', ');
};
export const ColPresenter = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(Col, Object.assign({}, props),
        React.createElement(Box, { style: { height: '100%' } }, children || pickSizeProps(props))));
};
