"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const svg_1 = require("../utils/svg");
const utils_1 = require("./utils");
const b = (0, cn_1.block)('icon');
exports.Icon = react_1.default.forwardRef(({ data, width, height, size, className, fill = 'currentColor', stroke = 'none', qa }, ref) => {
    // This component supports four different ways to load and use icons:
    // - svg-react-loader
    // - svg-sprite-loader
    // - @svgr/webpack
    // - string with raw svg
    let w, h;
    if (size) {
        w = size;
        h = size;
    }
    if (width) {
        w = width;
    }
    if (height) {
        h = height;
    }
    // Parsing viewBox to get width and height in case they were not specified
    // For svg-react-loader svg attributes are available in component defaultProps
    // In case with @svgr/webpack svg attributes can be fetched from the react element
    // after calling svgr-component without any propses
    let viewBox;
    if ((0, utils_1.isSpriteData)(data)) {
        ({ viewBox } = data);
    }
    else if ((0, utils_1.isStringSvgData)(data)) {
        viewBox = (0, utils_1.getStringViewBox)(data);
    }
    else if ((0, utils_1.isComponentSvgData)(data)) {
        ({ viewBox } = data.defaultProps);
    }
    else if ((0, utils_1.isSvgrData)(data)) {
        const el = data({});
        if (el) {
            ({ viewBox } = el.props);
        }
    }
    if (viewBox && (!w || !h)) {
        const values = viewBox.split(/\s+|\s*,\s*/);
        if (!w) {
            w = values[2];
        }
        if (!h) {
            h = values[3];
        }
    }
    const props = Object.assign({ xmlns: 'http://www.w3.org/2000/svg', xmlnsXlink: 'http://www.w3.org/1999/xlink', width: w, height: h, className: b(null, className), fill,
        stroke, 'data-qa': qa }, svg_1.a11yHiddenSvgProps);
    if ((0, utils_1.isStringSvgData)(data)) {
        const preparedData = (0, utils_1.prepareStringData)(data);
        return react_1.default.createElement("svg", Object.assign({}, props, { ref: ref, dangerouslySetInnerHTML: { __html: preparedData } }));
    }
    if ((0, utils_1.isSpriteData)(data)) {
        const href = exports.Icon.prefix + (data.url || `#${data.id}`);
        return (react_1.default.createElement("svg", Object.assign({}, props, { viewBox: viewBox, ref: ref }),
            react_1.default.createElement("use", { href: href, xlinkHref: href })));
    }
    // SVG wrapping is needed for compability with sprite-loader
    // So we removing width and height for internal component so only external one is specifying them
    const IconComponent = data;
    if (IconComponent.defaultProps) {
        IconComponent.defaultProps.width = IconComponent.defaultProps.height = undefined;
    }
    return (react_1.default.createElement("svg", Object.assign({}, props, { ref: ref }),
        react_1.default.createElement(IconComponent, { width: undefined, height: undefined })));
});
exports.Icon.displayName = 'Icon';
exports.Icon.prefix = '';