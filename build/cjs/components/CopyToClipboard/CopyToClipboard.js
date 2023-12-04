"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyToClipboard = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_copy_to_clipboard_1 = tslib_1.__importDefault(require("react-copy-to-clipboard"));
const types_1 = require("./types");
class CopyToClipboard extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            status: CopyToClipboard.INITIAL_STATUS,
        };
        this.handleCopy = (text, result) => {
            const { timeout, onCopy } = this.props;
            this.setState({
                status: result ? types_1.CopyToClipboardStatus.Success : types_1.CopyToClipboardStatus.Error,
            });
            clearTimeout(this.timerId);
            this.timerId = window.setTimeout(() => {
                this.setState({ status: CopyToClipboard.INITIAL_STATUS });
                this.timerId = undefined;
            }, timeout);
            onCopy === null || onCopy === void 0 ? void 0 : onCopy(text, result);
        };
    }
    componentWillUnmount() {
        clearTimeout(this.timerId);
    }
    render() {
        const { children, text, options } = this.props;
        const { status } = this.state;
        const content = children(status);
        if (!react_1.default.isValidElement(content)) {
            throw new Error('Content must be a valid react element');
        }
        return (react_1.default.createElement(react_copy_to_clipboard_1.default, { text: String(text), onCopy: this.handleCopy, options: options }, content));
    }
}
exports.CopyToClipboard = CopyToClipboard;
CopyToClipboard.INITIAL_STATUS = types_1.CopyToClipboardStatus.Pending;
