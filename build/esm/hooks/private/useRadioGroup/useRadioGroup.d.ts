import type { ControlGroupOption, ControlGroupProps } from '../../../components/types';
interface OptionsProps extends Omit<ControlGroupProps, 'options' | 'defaultValue' | 'aria-label' | 'aria-labelledby' | 'onUpdate' | 'value'> {
    value: string;
    checked: boolean;
    content: ControlGroupOption['content'];
}
export type UseRadioGroupProps = ControlGroupProps;
export type UseRadioGroupResult = {
    containerProps: Pick<ControlGroupProps, 'aria-label' | 'aria-labelledby'> & {
        role: string;
        'aria-disabled': ControlGroupProps['disabled'];
    };
    optionsProps: OptionsProps[];
};
export declare function useRadioGroup(props: UseRadioGroupProps): UseRadioGroupResult;
export {};
