import React from 'react';
import { ButtonSize } from '../../../Button';
import type { InputControlSize } from '../../types';
import './ClearButton.css';
type Props = {
    size: ButtonSize;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
};
export declare const mapTextInputSizeToButtonSize: (textInputSize: InputControlSize) => ButtonSize;
export declare const ClearButton: (props: Props) => React.JSX.Element;
export {};
