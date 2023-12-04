import React from 'react';
import { blockNew } from '../../../utils/cn';
import i18n from '../../i18n';
import './PaginationPageOf.css';
const b = blockNew('pagination-page-of');
export const PaginationPageOf = ({ size, className }) => {
    return React.createElement("div", { className: b({ size }, className) }, i18n('label_page-of'));
};
