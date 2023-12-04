"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationInput = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../../../constants");
const controls_1 = require("../../../controls");
const cn_1 = require("../../../utils/cn");
const i18n_1 = tslib_1.__importDefault(require("../../i18n"));
const b = (0, cn_1.blockNew)('pagination-input');
const PaginationInput = ({ numberOfPages, size, pageSize, onUpdate, className }) => {
    const [value, setValue] = react_1.default.useState('');
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
        if (event.key === constants_1.KeyCode.ENTER) {
            handleUpdate(event.currentTarget.value);
        }
    };
    return (react_1.default.createElement(controls_1.TextInput, { className: b({ size }, className), placeholder: (0, i18n_1.default)('label_input-placeholder'), size: size, value: value, onUpdate: handleUpdateValue, onBlur: handleBlur, onKeyUp: handleKeyUp }));
};
exports.PaginationInput = PaginationInput;
