import React from 'react';
export type UseFileInputProps = {
    onUpdate?: (files: File[]) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
/**
 * @deprecated use UseFileInputResult instead
 */
export type UseFileInputOutput = {
    controlProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    triggerProps: {
        onClick: () => void;
    };
};
export type UseFileInputResult = UseFileInputOutput;
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
export declare function useFileInput({ onUpdate, onChange }: UseFileInputProps): UseFileInputOutput;
