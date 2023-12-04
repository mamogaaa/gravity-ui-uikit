"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const colorText_1 = require("./colorText/colorText");
const text_1 = require("./text/text");
/**
 * A component for working with typography.
 *
 * Storybook: https://preview.gravity-ui.com/uikit/?path=/story/components-text--default
 *
 * **Hint:** Hover on props in your editor to read jsdoc
 *
 * Provides a convenient API for working with mixins of typography and text colors. Just point at the prop in you favorite code editor and read the accompanying documentation via `jsdoc` on where to apply this or that font or color.
 *
 * ```jsx
 * import {Text} from '@gravity-ui/uikit';
 *
 * <Text variant="body-1" color="inherit" ellipsis>some test</Text>
 * ```
 *
 * You can also use a more flexible way of setting the style. "Gravity UI" also provide `text` utility function.
 *
 *```jsx
 * import {text} from '@gravity-ui/uikit';
 *
 * // textStyles = 'text text_variant_display-1 some-class-name'
 * const textStyles = text({variant: 'display-1'}, 'some-class-name'));
 *
 * <span className={textStyles}>some text</span>
 * ```
 */
exports.Text = react_1.default.forwardRef((_a, ref) => {
    var { as, children, variant, className, ellipsis, color, whiteSpace, wordBreak } = _a, rest = tslib_1.__rest(_a, ["as", "children", "variant", "className", "ellipsis", "color", "whiteSpace", "wordBreak"]);
    const Tag = as || 'span';
    return (react_1.default.createElement(Tag, Object.assign({ ref: ref, className: (0, text_1.text)({ variant, ellipsis, whiteSpace, wordBreak }, color ? (0, colorText_1.colorText)({ color }, className) : className) }, rest), children));
});
exports.Text.displayName = 'Text';
