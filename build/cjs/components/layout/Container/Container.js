"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const tslib_1 = require("tslib");
/* eslint-disable valid-jsdoc */
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const spacing_1 = require("../spacing/spacing");
const utils_1 = require("../utils");
const useContainerThemeProps_1 = require("./useContainerThemeProps");
const b = (0, cn_1.block)('container');
/**
 * Center you content in horizontal direction.
 *
 * > In most cases must be one on the page.
 *
 * ```tsx
 * import {Container, Row, Col} from '@gravity-ui/uikit';
 *
 * <Container masWidth="m">
 *   <Row>
 *     <Col>
 *       Col 1
 *    </Col>
 *    <Col>
 *       Col 2
 *    </Col>
 *  </Row>
 * </Container>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#container
 */
const Container = ({ children, style, as: Tag = 'div', className, maxWidth, gutters, spaceRow, }) => {
    const { getClosestMediaProps, containerThemeProps } = (0, useContainerThemeProps_1.useContainerThemeProps)();
    let sr;
    if (typeof spaceRow === 'object') {
        const propsCandidate = getClosestMediaProps(spaceRow);
        if (propsCandidate) {
            sr = (0, utils_1.makeCssMod)(propsCandidate);
        }
    }
    else if (spaceRow) {
        sr = (0, utils_1.makeCssMod)(spaceRow);
    }
    return (react_1.default.createElement(Tag, { style: style, className: b({
            mw: maxWidth,
            sr,
        }, gutters === false
            ? className
            : (0, spacing_1.sp)({
                px: gutters || containerThemeProps.gutters,
            }, className)) }, children));
};
exports.Container = Container;
