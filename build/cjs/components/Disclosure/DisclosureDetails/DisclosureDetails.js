"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclosureDetails = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_transition_group_1 = require("react-transition-group");
const transition_1 = require("../../utils/transition");
const DisclosureContext_1 = require("../DisclosureContext");
const cn_1 = require("../cn");
function DisclosureDetails({ children }) {
    const containerRef = react_1.default.useRef(null);
    const { ariaControls, ariaLabelledby, keepMounted, expanded } = (0, DisclosureContext_1.useDisclosureAttributes)();
    return (react_1.default.createElement(react_transition_group_1.CSSTransition, { nodeRef: containerRef, in: expanded, addEndListener: (done) => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', done); }, classNames: (0, transition_1.getCSSTransitionClassNames)(cn_1.b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true },
        react_1.default.createElement("div", { ref: containerRef, id: ariaControls, role: "region", "aria-labelledby": ariaLabelledby, className: (0, cn_1.b)('content', { visible: expanded }) }, children)));
}
exports.DisclosureDetails = DisclosureDetails;
DisclosureDetails.displayName = 'DisclosureDetails';
