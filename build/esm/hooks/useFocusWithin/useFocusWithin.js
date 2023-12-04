import React from 'react';
import { SyntheticFocusEvent } from './SyntheticFocusEvent';
import { useSyntheticBlurEvent } from './useSyntheticBlurEvent';
/**
 * Callback on focus outside event.
 *
 * @callback onFocusEventCallback
 * @param {FocusEvent} event
 */
/**
 * Callback on focus change event.
 *
 * @callback onFocusChangeCallback
 * @param {boolean} isFocusWithin
 */
/**
 * Handles focus events for the target and its descendants.
 *
 * @param {Object} props
 * @param {boolean} [props.isDisabled=false] - whether the focus within events should be disabled.
 * @param {onFocusEventCallback} props.onFocusWithin - handler that is called when the target element or a descendant receives focus.
 * @param {onFocusEventCallback} props.onBlurWithin - handler that is called when the target element and all descendants lose focus.
 * @param {onFocusChangeCallback} props.onFocusChange - handler that is called when the the focus within state changes.
 *
 * @returns container props
 *
 * @example
 *
 * function Select() {
 *   const [open, setOpen] = React.useState(false);
 *
 *   const handleFocusOutside = React.useCallback(() => {setOpen(false);}, []);
 *
 *   const {focusWithinProps} = useFocusWithin({onBlurWithin: handleFocusOutside});
 *
 *   return (
 *     <span {...focusWithinProps}>
 *       <Button onClick={() => {setOpen(true);}}>Select</Button>
 *       <Popup open={open}>
 *          ...
 *       </Popup>
 *     </span>
 *   );
 *  }
 * }
 */
export function useFocusWithin(props) {
    const { onFocusWithin, onBlurWithin, onFocusWithinChange, isDisabled } = props;
    const isFocusWithinRef = React.useRef(false);
    const onFocus = React.useCallback((event) => {
        if (!isFocusWithinRef.current && document.activeElement === event.target) {
            isFocusWithinRef.current = true;
            if (onFocusWithin) {
                onFocusWithin(event);
            }
            if (onFocusWithinChange) {
                onFocusWithinChange(true);
            }
        }
    }, [onFocusWithin, onFocusWithinChange]);
    const onBlur = React.useCallback((event) => {
        if (!isFocusWithinRef.current) {
            return;
        }
        isFocusWithinRef.current = false;
        if (onBlurWithin) {
            onBlurWithin(event);
        }
        if (onFocusWithinChange) {
            onFocusWithinChange(false);
        }
    }, [onBlurWithin, onFocusWithinChange]);
    const { onBlur: onBlurHandler, onFocus: onFocusHandler } = useFocusEvents({
        onFocus,
        onBlur,
        isDisabled,
    });
    if (isDisabled) {
        return {
            focusWithinProps: {
                onFocus: undefined,
                onBlur: undefined,
            },
        };
    }
    return {
        focusWithinProps: {
            onFocus: onFocusHandler,
            onBlur: onBlurHandler,
        },
    };
}
function useFocusEvents({ onFocus, onBlur, isDisabled, }) {
    const capturedRef = React.useRef(false);
    const targetRef = React.useRef(null);
    React.useEffect(() => {
        if (isDisabled) {
            return undefined;
        }
        const handleFocus = function () {
            capturedRef.current = false;
        };
        const handleFocusIn = function (event) {
            if (!capturedRef.current && targetRef.current) {
                const blurEvent = new FocusEvent('blur', Object.assign(Object.assign({}, event), { relatedTarget: event.target, bubbles: false, cancelable: false }));
                onBlur(new SyntheticFocusEvent('blur', blurEvent, {
                    target: targetRef.current,
                    currentTarget: targetRef.current,
                }));
                targetRef.current = null;
            }
        };
        window.addEventListener('focus', handleFocus, { capture: true });
        // use focusin because a focus event does not bubble and current browser
        // implementations fire focusin events after fucus event
        window.addEventListener('focusin', handleFocusIn);
        return () => {
            window.removeEventListener('focus', handleFocus, { capture: true });
            window.removeEventListener('focusin', handleFocusIn);
        };
    }, [isDisabled, onBlur]);
    const onBlurHandler = React.useCallback((event) => {
        if (event.relatedTarget === null ||
            event.relatedTarget === document.body ||
            event.relatedTarget === document) {
            onBlur(event);
            targetRef.current = null;
        }
    }, [onBlur]);
    const onSyntheticFocus = useSyntheticBlurEvent(onBlur);
    const onFocusHandler = React.useCallback((event) => {
        capturedRef.current = true;
        targetRef.current = event.target;
        onSyntheticFocus(event);
        onFocus(event);
    }, [onSyntheticFocus, onFocus]);
    return { onBlur: onBlurHandler, onFocus: onFocusHandler };
}
