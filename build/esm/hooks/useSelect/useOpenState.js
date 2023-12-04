import React from 'react';
export const useOpenState = (props) => {
    const [open, setOpenState] = React.useState(props.defaultOpen || false);
    const { onOpenChange } = props;
    const isControlled = typeof props.open === 'boolean';
    const openValue = isControlled ? props.open : open;
    const toggleOpen = React.useCallback((val) => {
        const newOpen = typeof val === 'boolean' ? val : !openValue;
        if (newOpen !== openValue) {
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(newOpen);
            if (!isControlled) {
                setOpenState(newOpen);
            }
        }
    }, [openValue, onOpenChange, isControlled]);
    return {
        open: openValue,
        toggleOpen,
    };
};
