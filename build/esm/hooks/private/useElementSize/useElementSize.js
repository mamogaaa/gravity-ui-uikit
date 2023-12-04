import React from 'react';
import round from 'lodash/round';
import throttle from 'lodash/throttle';
const RESIZE_THROTTLE = 16;
const ROUND_PRESICION = 2;
export function useElementSize(ref, 
// can be used, when it is needed to force reassign observer to element
// in order to get correct measures. might be related to below
// https://github.com/WICG/resize-observer/issues/65
key) {
    const [size, setSize] = React.useState({
        width: 0,
        height: 0,
    });
    React.useLayoutEffect(() => {
        if (!(ref === null || ref === void 0 ? void 0 : ref.current)) {
            return undefined;
        }
        const handleResize = (entries) => {
            if (!Array.isArray(entries)) {
                return;
            }
            const entry = entries[0];
            if (entry.borderBoxSize) {
                const borderBoxSize = entry.borderBoxSize[0]
                    ? entry.borderBoxSize[0]
                    : entry.borderBoxSize;
                // ...but old versions of Firefox treat it as a single item
                // https://github.com/mdn/dom-examples/blob/main/resize-observer/resize-observer-text.html#L88
                setSize({
                    width: round(borderBoxSize.inlineSize, ROUND_PRESICION),
                    height: round(borderBoxSize.blockSize, ROUND_PRESICION),
                });
            }
            else {
                const target = entry.target;
                setSize({
                    width: round(target.offsetWidth, ROUND_PRESICION),
                    height: round(target.offsetHeight, ROUND_PRESICION),
                });
            }
        };
        const observer = new ResizeObserver(throttle(handleResize, RESIZE_THROTTLE));
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [ref, key]);
    return size;
}
