/* eslint-disable valid-jsdoc */
import React from 'react';
import { block } from '../../utils/cn';
import { useLayoutContext } from '../hooks/useLayoutContext';
import { makeCssMod } from '../utils';
import './Row.css';
const b = block('row');
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
export const Row = ({ children, style, className, space, spaceRow }) => {
    const { getClosestMediaProps } = useLayoutContext();
    let s;
    let sr;
    if (typeof space === 'object') {
        const res = getClosestMediaProps(space);
        if (res) {
            s = makeCssMod(res);
        }
    }
    else if (space) {
        s = makeCssMod(space);
    }
    if (typeof spaceRow === 'object') {
        const res = getClosestMediaProps(spaceRow);
        if (res) {
            sr = makeCssMod(res);
        }
    }
    else if (spaceRow) {
        sr = String(spaceRow);
    }
    return (React.createElement("div", { style: style, className: b({
            s,
            sr,
        }, className) }, children));
};