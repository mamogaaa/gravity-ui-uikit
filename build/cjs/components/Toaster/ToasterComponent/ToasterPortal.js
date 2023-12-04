"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToasterPortal = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Portal_1 = require("../../Portal");
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.block)('toaster');
function ToasterPortal({ children, className, mobile }) {
    const el = react_1.default.useRef(typeof document === 'undefined' ? undefined : document.createElement('div'));
    react_1.default.useEffect(() => {
        const container = el.current;
        if (!container) {
            return undefined;
        }
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);
    react_1.default.useEffect(() => {
        if (!el.current) {
            return;
        }
        el.current.className = b({ mobile }, className);
    }, [className, mobile]);
    return react_1.default.createElement(Portal_1.Portal, { container: el.current }, children);
}
exports.ToasterPortal = ToasterPortal;
ToasterPortal.displayName = 'ToasterPortal';
