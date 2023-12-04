import React from 'react';
import { block } from '../../../utils/cn';
import { CONTROL_ERROR_MESSAGE_QA } from '../../utils';
import './OuterAdditionalContent.css';
const b = block('outer-additional-content');
export const OuterAdditionalContent = ({ errorMessage, note, noteId, errorMessageId, }) => {
    return errorMessage || note ? (React.createElement("div", { className: b() },
        errorMessage && (React.createElement("div", { className: b('error'), id: errorMessageId, "data-qa": CONTROL_ERROR_MESSAGE_QA }, errorMessage)),
        note && (React.createElement("div", { className: b('note'), id: noteId }, note)))) : null;
};
