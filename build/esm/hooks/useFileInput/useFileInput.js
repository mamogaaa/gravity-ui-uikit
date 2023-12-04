/* eslint-disable valid-jsdoc */
import React from 'react';
/**
 * Used to shape props for input with type "file".
 *
 * Usage example:
 ```tsx
    import React from 'react';
    import {Button, useFileInput} from '@gravity-ui/uikit';

    const Component = () => {
        const onUpdate = React.useCallback((files: File[]) => console.log(files), []);
        const {controlProps, triggerProps} = useFileInput({onUpdate});

        return (
            <React.Fragment>
                <input {...controlProps} />
                <Button {...triggerProps}>Upload</Button>
            </React.Fragment>
        );
    };
```
*/
export function useFileInput({ onUpdate, onChange }) {
    const ref = React.useRef(null);
    const handleChange = React.useCallback((event) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(event);
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(Array.from(event.target.files || []));
        // https://stackoverflow.com/a/12102992
        event.target.value = '';
    }, [onChange, onUpdate]);
    const openDeviceStorage = React.useCallback(() => {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.click();
    }, []);
    const result = React.useMemo(() => ({
        controlProps: {
            ref,
            type: 'file',
            tabIndex: -1,
            style: { opacity: 0, position: 'absolute', width: 1, height: 1 },
            onChange: handleChange,
        },
        triggerProps: {
            onClick: openDeviceStorage,
        },
    }), [handleChange, openDeviceStorage]);
    return result;
}