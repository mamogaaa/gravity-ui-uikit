"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringViewBox = exports.prepareStringData = exports.isStringSvgData = exports.isComponentSvgData = exports.isSvgrData = exports.isSpriteData = void 0;
function isSpriteData(data) {
    return typeof data === 'object';
}
exports.isSpriteData = isSpriteData;
function isSvgrData(data) {
    return typeof data === 'function' && (!data.prototype || !data.prototype.render);
}
exports.isSvgrData = isSvgrData;
function isComponentSvgData(data) {
    return typeof data === 'object' && 'defaultProps' in data;
}
exports.isComponentSvgData = isComponentSvgData;
function isStringSvgData(data) {
    return typeof data === 'string';
}
exports.isStringSvgData = isStringSvgData;
function prepareStringData(data) {
    return data.replace(/<svg[^>]*>/, (match) => {
        return match
            .replace(/(width|height)=(["']?)\d+\2/g, '')
            .replace(/(\s){2,}\b/g, '$1')
            .replace(/(\s)+>/g, '>');
    });
}
exports.prepareStringData = prepareStringData;
function getStringViewBox(data) {
    const match = data.match(/viewBox=(["']?)([\d\s,-]+)\1/);
    return match ? match[2] : undefined;
}
exports.getStringViewBox = getStringViewBox;