"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sheet = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const SheetContent_1 = require("./SheetContent");
const constants_1 = require("./constants");
class Sheet extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.bodyScrollLocked = false;
        this.state = {
            visible: false,
        };
        this.showSheet = () => {
            this.lockBodyScroll();
            this.setState({ visible: true });
        };
        this.hideSheet = () => {
            this.restoreBodyScroll();
            if (this.props.onClose) {
                this.props.onClose();
            }
            this.setState({ visible: false });
        };
    }
    static lockBodyScroll() {
        if (++Sheet.bodyScrollLocksCount === 1) {
            Sheet.bodyInitialOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
    }
    static restoreBodyScroll() {
        if (Sheet.bodyScrollLocksCount === 0) {
            return;
        }
        if (--Sheet.bodyScrollLocksCount === 0) {
            document.body.style.overflow = Sheet.bodyInitialOverflow || '';
            Sheet.bodyInitialOverflow = undefined;
        }
    }
    componentDidMount() {
        if (this.props.visible) {
            this.showSheet();
        }
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.visible && this.props.visible) {
            this.showSheet();
        }
    }
    componentWillUnmount() {
        this.restoreBodyScroll();
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        return react_dom_1.default.createPortal(this.renderSheet(), document.body);
    }
    restoreBodyScroll() {
        if (!this.bodyScrollLocked) {
            return;
        }
        Sheet.restoreBodyScroll();
        this.bodyScrollLocked = false;
    }
    lockBodyScroll() {
        Sheet.lockBodyScroll();
        this.bodyScrollLocked = true;
    }
    renderSheet() {
        const { id, children, className, contentClassName, swipeAreaClassName, title, visible, allowHideOnContentScroll, hideTopBar, qa, } = this.props;
        return (react_1.default.createElement("div", { "data-qa": qa, className: (0, constants_1.sheetBlock)(null, className) },
            react_1.default.createElement(SheetContent_1.SheetContentContainer, { id: id, content: children, contentClassName: contentClassName, swipeAreaClassName: swipeAreaClassName, title: title, visible: visible, allowHideOnContentScroll: allowHideOnContentScroll, hideTopBar: hideTopBar, hideSheet: this.hideSheet })));
    }
}
exports.Sheet = Sheet;
Sheet.bodyScrollLocksCount = 0;
Sheet.bodyInitialOverflow = undefined;
