import React from 'react';
export interface ButtonCloseProps {
    onClose: (event: React.MouseEvent<HTMLElement, MouseEvent>, opts: {
        isOutsideClick: boolean;
    }) => void;
}
export declare function ButtonClose({ onClose }: ButtonCloseProps): React.JSX.Element;
