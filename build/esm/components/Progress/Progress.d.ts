import React from 'react';
import './Progress.css';
export type ProgressTheme = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'misc';
export type ProgressSize = 'xs' | 's' | 'm';
export type ProgressValue = number;
interface Stack {
    value: ProgressValue;
    color?: string;
    title?: string;
    theme?: ProgressTheme;
    loading?: boolean;
    className?: string;
    content?: React.ReactNode;
}
export interface ProgressColorStops {
    theme: ProgressTheme;
    stop: number;
}
interface ProgressGeneralProps {
    /** ClassName of element */
    className?: string;
}
interface ProgressDefaultProps {
    /** Text inside progress bar */
    text: string;
    /** Theme */
    theme: ProgressTheme;
    /** Size. Text of progress bar is displayed in `m` size only. */
    size: ProgressSize;
    /** Loading. Аdds loading animation */
    loading?: boolean;
}
interface ProgressWithValue extends ProgressGeneralProps, Partial<ProgressDefaultProps> {
    /** Current progress value. Available range is from 0 to 100. If `stack` property is passed `value` is not required and behaves as maxValue. */
    value: ProgressValue;
    /** ProgressTheme breakpoints. [Details](#colorstops) */
    colorStops?: ProgressColorStops[];
    /** Alternative value of `colorStops`. Available range is from 0 to 100. */
    colorStopsValue?: ProgressValue;
}
interface ProgressWithStack extends ProgressGeneralProps, Partial<ProgressDefaultProps> {
    /** Configuration of composite progress bar. Not required if a `value` property is passed. [Details](#stack) */
    stack: Stack[];
    value?: ProgressValue;
    /** ClassName of stack element */
    stackClassName?: string;
}
export type ProgressProps = ProgressWithStack | ProgressWithValue;
export declare class Progress extends React.Component<ProgressProps> {
    static defaultProps: ProgressDefaultProps;
    static isFiniteNumber(value: number): boolean;
    static isBetween(value: number, min: number, max: number): boolean;
    static getOffset(value: number): number;
    static getValueFromStack(stack: Stack[]): number;
    static isProgressWithStack(props: ProgressProps): props is ProgressWithStack;
    render(): React.JSX.Element;
    private getTheme;
    private renderContent;
    private renderItem;
    private renderStack;
    private renderInnerText;
    private renderText;
}
export {};
