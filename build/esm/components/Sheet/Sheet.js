import React from 'react';
import ReactDOM from 'react-dom';
import { SheetContentContainer } from './SheetContent';
import { sheetBlock } from './constants';
import './Sheet.css';
export class Sheet extends React.Component {
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
        return ReactDOM.createPortal(this.renderSheet(), document.body);
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
        return (React.createElement("div", { "data-qa": qa, className: sheetBlock(null, className) },
            React.createElement(SheetContentContainer, { id: id, content: children, contentClassName: contentClassName, swipeAreaClassName: swipeAreaClassName, title: title, visible: visible, allowHideOnContentScroll: allowHideOnContentScroll, hideTopBar: hideTopBar, hideSheet: this.hideSheet })));
    }
}
Sheet.bodyScrollLocksCount = 0;
Sheet.bodyInitialOverflow = undefined;
