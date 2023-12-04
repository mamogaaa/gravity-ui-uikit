import get from 'lodash/get';
export const extractTextValue = (text = '') => {
    if (text && typeof text === 'object') {
        return text.value;
    }
    return text;
};
export const extractTextView = (text = '') => {
    if (text && typeof text === 'object') {
        return text.content;
    }
    return text;
};
export function getTwoLetters(text) {
    const words = text.split(' ');
    return [get(words, '[0][0]'), get(words, '[1][0]')].filter(Boolean).join('');
}
