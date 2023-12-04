import React from 'react';
import type { QAProps } from '../../types';
import type { AdaptiveProp, MediaPartial, Space } from '../types';
export interface FlexProps<T extends React.ElementType = 'div'> extends QAProps {
    as?: T;
    /**
     * `flex-direction` property
     */
    direction?: AdaptiveProp<'flexDirection'>;
    /**
     * `flex-grow` property
     */
    grow?: true | React.CSSProperties['flexGrow'];
    /**
     * `flex-basis` property
     */
    basis?: React.CSSProperties['flexBasis'];
    /**
     * `flex-shrink` property
     */
    shrink?: React.CSSProperties['flexShrink'];
    /**
     * `align-` properties
     */
    alignContent?: AdaptiveProp<'justifyContent'>;
    alignItems?: AdaptiveProp<'alignItems'>;
    alignSelf?: AdaptiveProp<'alignSelf'>;
    /**
     * `justify-` properties
     */
    justifyContent?: AdaptiveProp<'justifyContent'>;
    justifyItems?: AdaptiveProp<'justifyItems'>;
    justifySelf?: AdaptiveProp<'justifySelf'>;
    /**
     * `flex-wrap` property
     *
     * If value equals `true`, add css property `flex-wrap: wrap`;
     */
    wrap?: true | React.CSSProperties['flexWrap'];
    width?: number;
    /**
     * display: inline-flex;
     */
    inline?: boolean;
    gap?: Space | MediaPartial<Space>;
    gapRow?: Space | MediaPartial<Space>;
    /**
     * Space between children. Works like gap but supports in old browsers. Under the hoods uses negative margins. Vertical and horizontal directions are also supported
     *
     * ---
     * instead of ~imperfection of the world~ browser compatibility for margins between layout components used negative margins there is passible issues with `background-color` css property and others that depends of current block position. Use in this situations wrappers. In future version this issues will be avoided during flex `gap` properties
     *
     * ```tsx
     * // wrong
     * <Flex>
     *   <SomeComponentWithBackground />
     *   <SomeComponentWithBackground />
     * </Flex>
     *
     * // right
     * <Flex>
     *   <div>
     *     <SomeComponentWithBackground />
     *   </div>
     *   <div>
     *     <SomeComponentWithBackground />
     *   </div>
     * </Flex>
     * ```
     */
    space?: Space | MediaPartial<Space>;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    title?: string;
    ref?: React.ComponentPropsWithRef<T>['ref'];
}
/**
 * Flexbox model utility component.
 *
 * ```tsx
 * import {Flex, Button} from '@gravity-ui/uikit';
 *
 * <Flex
 *  // take value from theme depends of current media query
 *  space
 * >
 *  <Button>
 *      Button 1
 *  </Button>
 *  <Button>
 *      Button 2
 *  </Button>
 * </Flex>
 * ```
 *
 * Use build in media goods via props
 *
 * ```tsx
 * <Flex
 *  // space dynamically changes instead of current media query
 *  space={{s: '1', m: '5'}}
 *  // `flex-direction: column` will be applied to `l`, 'xl', 'xxl' and `xxxl` media queries
 *  direction={{'s': 'column', 'm': 'row'}}
 * >
 *  {...}
 * </Flex>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#flex
 */
export declare const Flex: React.ForwardRefExoticComponent<Omit<FlexProps<React.ElementType<any>>, "ref"> & React.RefAttributes<unknown>>;
