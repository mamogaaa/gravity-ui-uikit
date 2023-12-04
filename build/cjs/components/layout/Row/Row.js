"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
const tslib_1 = require("tslib");
/* eslint-disable valid-jsdoc */
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const useLayoutContext_1 = require("../hooks/useLayoutContext");
const utils_1 = require("../utils");
const b = (0, cn_1.block)('row');
/**
 * Defines the margins between columns (`<Col />`).
 *
 * Required to use with `<Col />` component
 *
 * ```tsx
 * import {Row, Col} from '@gravity-ui/uikit';
 *
 * <Row space="5">
 *  <Col>col</Col>
 *  <Col>col</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#row
 */
const Row = ({ children, style, className, space, spaceRow }) => {
    const { getClosestMediaProps } = (0, useLayoutContext_1.useLayoutContext)();
    let s;
    let sr;
    if (typeof space === 'object') {
        const res = getClosestMediaProps(space);
        if (res) {
            s = (0, utils_1.makeCssMod)(res);
        }
    }
    else if (space) {
        s = (0, utils_1.makeCssMod)(space);
    }
    if (typeof spaceRow === 'object') {
        const res = getClosestMediaProps(spaceRow);
        if (res) {
            sr = (0, utils_1.makeCssMod)(res);
        }
    }
    else if (spaceRow) {
        sr = String(spaceRow);
    }
    return (react_1.default.createElement("div", { style: style, className: b({
            s,
            sr,
        }, className) }, children));
};
exports.Row = Row;
