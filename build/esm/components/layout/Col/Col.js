import { __rest } from "tslib";
/* eslint-disable valid-jsdoc */
import React from 'react';
import { block } from '../../utils/cn';
import { makeCssMod } from '../utils';
import './Col.css';
const b = block('col');
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
export const Col = (_a) => {
    var { children, style, className } = _a, media = __rest(_a, ["children", "style", "className"]);
    const mods = Object.entries(media).reduce((acc, [mod, modSize]) => {
        acc[`s-${mod}`] = makeCssMod(modSize);
        return acc;
    }, {});
    return (React.createElement("div", { style: style, className: b(mods, className) }, children));
};
/**
 * Possible improvements that the customer is looking for:
 * - props for vertical alignment in row;
 * - offset;
 * - media only. Rule that will be applied only in specified media query;
 * - content alignment;
 */
