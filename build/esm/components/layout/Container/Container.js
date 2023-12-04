/* eslint-disable valid-jsdoc */
import React from 'react';
import { block } from '../../utils/cn';
import { sp } from '../spacing/spacing';
import { makeCssMod } from '../utils';
import { useContainerThemeProps } from './useContainerThemeProps';
import './Container.css';
const b = block('container');
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
export const Container = ({ children, style, as: Tag = 'div', className, maxWidth, gutters, spaceRow, }) => {
    const { getClosestMediaProps, containerThemeProps } = useContainerThemeProps();
    let sr;
    if (typeof spaceRow === 'object') {
        const propsCandidate = getClosestMediaProps(spaceRow);
        if (propsCandidate) {
            sr = makeCssMod(propsCandidate);
        }
    }
    else if (spaceRow) {
        sr = makeCssMod(spaceRow);
    }
    return (React.createElement(Tag, { style: style, className: b({
            mw: maxWidth,
            sr,
        }, gutters === false
            ? className
            : sp({
                px: gutters || containerThemeProps.gutters,
            }, className)) }, children));
};
