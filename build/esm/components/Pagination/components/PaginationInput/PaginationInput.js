import React from 'react';
import { KeyCode } from '../../../../constants';
import { TextInput } from '../../../controls';
import { blockNew } from '../../../utils/cn';
import i18n from '../../i18n';
import './PaginationInput.css';
const b = blockNew('pagination-input');
export const PaginationInput = ({ numberOfPages, size, pageSize, onUpdate, className }) => {
    const [value, setValue] = React.useState('');
    const handleUpdateValue = (inputValue) => {
        if (inputValue === '' || /^[1-9][0-9]*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };
    const handleUpdate = (inputValue) => {
        if (!inputValue) {
            return;
        }
        let numValue = Number(inputValue);
        if (!Number.isInteger(numValue)) {
            setValue('');
            return;
        }
        const hasUpperLimit = numberOfPages > 0;
        if (numValue > numberOfPages) {
            numValue = hasUpperLimit ? numberOfPages : numValue;
        }
        else if (numValue < 1) {
            numValue = 1;
        }
        setValue('');
        onUpdate(numValue, pageSize);
    };
    const handleBlur = (event) => handleUpdate(event.currentTarget.value);
    const handleKeyUp = (event) => {
        if (event.key === KeyCode.ENTER) {
            handleUpdate(event.currentTarget.value);
        }
    };
    return (React.createElement(TextInput, { className: b({ size }, className), placeholder: i18n('label_input-placeholder'), size: size, value: value, onUpdate: handleUpdateValue, onBlur: handleBlur, onKeyUp: handleKeyUp }));
};
