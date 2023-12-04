"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPage = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = require("../../../Button");
const cn_1 = require("../../../utils/cn");
const b = (0, cn_1.blockNew)('pagination-page');
const PaginationPage = ({ item, size, pageSize, className, onUpdate }) => {
    if (item.simple) {
        return react_1.default.createElement("div", { className: b('simple', { size }, className) }, item.page);
    }
    const view = item.current ? 'normal' : 'flat';
    return (react_1.default.createElement(Button_1.Button, { size: size, key: view, view: view, selected: item.current, className: className, onClick: () => onUpdate(item.page, pageSize) }, item.page));
};
exports.PaginationPage = PaginationPage;
