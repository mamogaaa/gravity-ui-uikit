import React from 'react';
import type { MediaPartial, MediaType, Space } from '../types';
import './Container.css';
export interface ContainerProps {
    style?: React.CSSProperties;
    /**
     * Use function to define different classes in different media queries
     */
    className?: string;
    children?: React.ReactNode;
    /**
     * Width of container will never be larger then specified media type width
     */
    maxWidth?: MediaType;
    /**
     * Right and left paddings between content
     *
     * Take default values during `LayoutContext`
     */
    gutters?: Space | false;
    /**
     * Space between child `Row` components
     *
     * By default takes props via `LayoutContext`
     */
    spaceRow?: Space | MediaPartial<Space>;
    as?: keyof JSX.IntrinsicElements;
}
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
export declare const Container: ({ children, style, as: Tag, className, maxWidth, gutters, spaceRow, }: ContainerProps) => React.JSX.Element;