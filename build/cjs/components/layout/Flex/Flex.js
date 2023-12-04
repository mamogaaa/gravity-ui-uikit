"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flex = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const useLayoutContext_1 = require("../hooks/useLayoutContext");
const utils_1 = require("../utils");
const b = (0, cn_1.block)('flex');
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
exports.Flex = react_1.default.forwardRef(function Flex(props, ref) {
    const { as: Tag = 'div', direction, width, grow, basis, children, style, alignContent, alignItems, alignSelf, justifyContent, justifyItems, justifySelf, shrink, wrap, inline, title, gap, gapRow, className, space, qa } = props, restProps = tslib_1.__rest(props, ["as", "direction", "width", "grow", "basis", "children", "style", "alignContent", "alignItems", "alignSelf", "justifyContent", "justifyItems", "justifySelf", "shrink", "wrap", "inline", "title", "gap", "gapRow", "className", "space", "qa"]);
    const { getClosestMediaProps, theme: { spaceBaseSize }, } = (0, useLayoutContext_1.useLayoutContext)();
    const applyMediaProps = (property) => typeof property === 'object' && property !== null
        ? getClosestMediaProps(property)
        : property;
    const gapSpaceSize = applyMediaProps(gap);
    const columnGap = gapSpaceSize ? spaceBaseSize * Number(gapSpaceSize) : undefined;
    const gapRowSpaceSize = applyMediaProps(gapRow) || gapSpaceSize;
    const rowGap = gapRowSpaceSize ? spaceBaseSize * Number(gapRowSpaceSize) : undefined;
    const spaceSize = applyMediaProps(space);
    const s = !gap && !gapRow && spaceSize ? (0, utils_1.makeCssMod)(spaceSize) : undefined;
    return (react_1.default.createElement(Tag, Object.assign({ className: b({
            inline,
            s,
        }, className), style: Object.assign({ width, flexDirection: applyMediaProps(direction), flexGrow: grow === true ? 1 : grow, flexWrap: wrap === true ? 'wrap' : wrap, flexBasis: basis, flexShrink: shrink, columnGap,
            rowGap, alignContent: applyMediaProps(alignContent), alignItems: applyMediaProps(alignItems), alignSelf: applyMediaProps(alignSelf), justifyContent: applyMediaProps(justifyContent), justifyItems: applyMediaProps(justifyItems), justifySelf: applyMediaProps(justifySelf) }, style), title: title, ref: ref, "data-qa": qa }, restProps), space
        ? react_1.default.Children.map(children, (child) => 
        // `space` uses negative margins under the hood. This is hack to prevent wrong background position appearance.
        child ? react_1.default.createElement("div", { className: b('wr') }, child) : child)
        : children));
});
