import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import { CopyToClipboardStatus } from './types';
export class CopyToClipboard extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            status: CopyToClipboard.INITIAL_STATUS,
        };
        this.handleCopy = (text, result) => {
            const { timeout, onCopy } = this.props;
            this.setState({
                status: result ? CopyToClipboardStatus.Success : CopyToClipboardStatus.Error,
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
        if (!React.isValidElement(content)) {
            throw new Error('Content must be a valid react element');
        }
        return (React.createElement(ReactCopyToClipboard, { text: String(text), onCopy: this.handleCopy, options: options }, content));
    }
}
CopyToClipboard.INITIAL_STATUS = CopyToClipboardStatus.Pending;
