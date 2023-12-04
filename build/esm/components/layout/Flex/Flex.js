import { __rest } from "tslib";
import React from 'react';
import { block } from '../../utils/cn';
import { useLayoutContext } from '../hooks/useLayoutContext';
import { makeCssMod } from '../utils';
import './Flex.css';
const b = block('flex');
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
export const Flex = React.forwardRef(function Flex(props, ref) {
    const { as: Tag = 'div', direction, width, grow, basis, children, style, alignContent, alignItems, alignSelf, justifyContent, justifyItems, justifySelf, shrink, wrap, inline, title, gap, gapRow, className, space, qa } = props, restProps = __rest(props, ["as", "direction", "width", "grow", "basis", "children", "style", "alignContent", "alignItems", "alignSelf", "justifyContent", "justifyItems", "justifySelf", "shrink", "wrap", "inline", "title", "gap", "gapRow", "className", "space", "qa"]);
    const { getClosestMediaProps, theme: { spaceBaseSize }, } = useLayoutContext();
    const applyMediaProps = (property) => typeof property === 'object' && property !== null
        ? getClosestMediaProps(property)
        : property;
    const gapSpaceSize = applyMediaProps(gap);
    const columnGap = gapSpaceSize ? spaceBaseSize * Number(gapSpaceSize) : undefined;
    const gapRowSpaceSize = applyMediaProps(gapRow) || gapSpaceSize;
    const rowGap = gapRowSpaceSize ? spaceBaseSize * Number(gapRowSpaceSize) : undefined;
    const spaceSize = applyMediaProps(space);
    const s = !gap && !gapRow && spaceSize ? makeCssMod(spaceSize) : undefined;
    return (React.createElement(Tag, Object.assign({ className: b({
            inline,
            s,
        }, className), style: Object.assign({ width, flexDirection: applyMediaProps(direction), flexGrow: grow === true ? 1 : grow, flexWrap: wrap === true ? 'wrap' : wrap, flexBasis: basis, flexShrink: shrink, columnGap,
            rowGap, alignContent: applyMediaProps(alignContent), alignItems: applyMediaProps(alignItems), alignSelf: applyMediaProps(alignSelf), justifyContent: applyMediaProps(justifyContent), justifyItems: applyMediaProps(justifyItems), justifySelf: applyMediaProps(justifySelf) }, style), title: title, ref: ref, "data-qa": qa }, restProps), space
        ? React.Children.map(children, (child) => 
        // `space` uses negative margins under the hood. This is hack to prevent wrong background position appearance.
        child ? React.createElement("div", { className: b('wr') }, child) : child)
        : children));
});
