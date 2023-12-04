import { __rest } from "tslib";
import React from 'react';
import { colorText } from './colorText/colorText';
import { text } from './text/text';
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
export const Text = React.forwardRef((_a, ref) => {
    var { as, children, variant, className, ellipsis, color, whiteSpace, wordBreak } = _a, rest = __rest(_a, ["as", "children", "variant", "className", "ellipsis", "color", "whiteSpace", "wordBreak"]);
    const Tag = as || 'span';
    return (React.createElement(Tag, Object.assign({ ref: ref, className: text({ variant, ellipsis, whiteSpace, wordBreak }, color ? colorText({ color }, className) : className) }, rest), children));
});
Text.displayName = 'Text';
