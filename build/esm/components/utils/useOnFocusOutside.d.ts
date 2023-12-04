import React from 'react';
/**
 * Callback on focus outside event.
 *
 * @callback onFocusOutsideCallback
 * @param {FocusEvent} event
 */
interface UseOnFocusOutsideProps {
    enabled?: boolean;
    onFocusOutside: (event: FocusEvent) => void;
}
/**
 * @deprecated use useFocusWithin instead, drop on next major
 *
 * Calls callback on focus element outside of some React sub-tree
 *
 * @param {Object} props
 * @param {true} [props.enabled=true] - if false, will not track focus outside events
 * @param {onFocusOutsideCallback} props.onFocusOutside - handler for focus outside event
 * @returns container props
 *
 * @example
 *
 * function Select() {
 *   const [open, setOpen] = React.useState(false);
 *
 *   const handleFocusOutside = React.useCallback(() => {setOpen(false);}, []);
 *
 *   const {onFocus, onBlur} = useOnFocusOutside({onFocusOutside: handleFocusOutside, enabled: open});
 *
 *   return (
 *     <span onFocus={onFocus} onBlur={onBlur}>
 *       <Button onClick={() => {setOpen(true);}}>Select</Button>
 *       <Popup open={open}>
 *          ...
 *       </Popup>
 *     </span>
 *   );
 *  }
 * }
 */
export declare function useOnFocusOutside({ onFocusOutside, enabled }: UseOnFocusOutsideProps): {
    onFocus: () => void;
    onBlur: (event: React.FocusEvent) => void;
};
export {};
