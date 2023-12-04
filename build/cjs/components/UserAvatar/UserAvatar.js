"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAvatar = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const constants_1 = require("./constants");
const b = (0, cn_1.block)('user-avatar');
exports.UserAvatar = react_1.default.forwardRef(({ imgUrl, fallbackImgUrl, size = 'm', srcSet, sizes, title, className, loading, onClick }, ref) => {
    const [isErrored, setIsErrored] = react_1.default.useState(false);
    const handleError = react_1.default.useCallback(() => {
        setIsErrored(true);
    }, []);
    // Reset error if `imgUrl` was changed to check it again
    react_1.default.useEffect(() => {
        setIsErrored(false);
    }, [imgUrl]);
    return (
    // FIXME OnClick deprecated, will be deleted
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    react_1.default.createElement("div", { className: b({ size }, className), title: title, onClick: onClick, ref: ref },
        react_1.default.createElement("img", { loading: loading, className: b('figure'), width: constants_1.SIZES[size], height: constants_1.SIZES[size], src: fallbackImgUrl && isErrored ? fallbackImgUrl : imgUrl, srcSet: srcSet, sizes: sizes, alt: "", onError: handleError })));
});
exports.UserAvatar.displayName = 'UserAvatar';
