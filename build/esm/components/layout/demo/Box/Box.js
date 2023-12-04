import { __rest } from "tslib";
import React from 'react';
import { Flex } from '../../Flex/Flex';
export function Box(_a) {
    var { children, w = '100%', h = '100%', minHeight, bgc = '#DDBEE1', bc = 'rosybrown' } = _a, props = __rest(_a, ["children", "w", "h", "minHeight", "bgc", "bc"]);
    return (React.createElement(Flex, Object.assign({}, props, { style: {
            padding: 5,
            boxSizing: 'border-box',
            width: w,
            height: h,
            minHeight,
            border: `2px dashed ${bc}`,
            backgroundColor: bgc,
        } }), children));
}
