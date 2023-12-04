"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Col = void 0;
const tslib_1 = require("tslib");
/* eslint-disable valid-jsdoc */
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const utils_1 = require("../utils");
const b = (0, cn_1.block)('col');
/**
 * How many columns of you 12-th column layout will take content.
 * Must be used as a child of `Row` component.
 *
 * By default component takes all available space.
 * If you wont to specify static size to all media queries use `s` prop. In mobile first layout grid is first passible value.
 *
 * ```tsx
 * <Col s="12">some content</Col>
 * ```
 * ---
 *
 * Note: you can use this empty component for spacing:
 *
 * ```tsx
 * <Row>
 *  <Col s="2" l="1">col 2</Col>
 *  <Col />
 *  <Col s="2" l="1">col 2</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#col
 */
const Col = (_a) => {
    var { children, style, className } = _a, media = tslib_1.__rest(_a, ["children", "style", "className"]);
    const mods = Object.entries(media).reduce((acc, [mod, modSize]) => {
        acc[`s-${mod}`] = (0, utils_1.makeCssMod)(modSize);
        return acc;
    }, {});
    return (react_1.default.createElement("div", { style: style, className: b(mods, className) }, children));
};
exports.Col = Col;
/**
 * Possible improvements that the customer is looking for:
 * - props for vertical alignment in row;
 * - offset;
 * - media only. Rule that will be applied only in specified media query;
 * - content alignment;
 */
