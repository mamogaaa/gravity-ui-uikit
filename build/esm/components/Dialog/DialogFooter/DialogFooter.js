import React from 'react';
import { Button } from '../../Button';
import { Popup } from '../../Popup';
import { block } from '../../utils/cn';
import './DialogFooter.css';
const b = block('dialog-footer');
function getButtonView(preset) {
    switch (preset) {
        case 'default':
            return 'action';
        case 'success':
            return 'action';
        case 'danger':
            return 'action';
        default:
            return 'action';
    }
}
export class DialogFooter extends React.Component {
    constructor() {
        super(...arguments);
        this.errorTooltipRef = React.createRef();
        this.handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (this.props.onClickButtonApply) {
                    this.props.onClickButtonApply(event);
                }
            }
        };
    }
    componentDidMount() {
        if (this.props.listenKeyEnter) {
            this.attachKeyDownListeners();
        }
    }
    componentDidUpdate(prevProps) {
        if (!this.props.listenKeyEnter && prevProps.listenKeyEnter) {
            this.detachKeyDownListeners();
        }
        if (this.props.listenKeyEnter && !prevProps.listenKeyEnter) {
            this.attachKeyDownListeners();
        }
    }
    componentWillUnmount() {
        this.detachKeyDownListeners();
    }
    render() {
        const { onClickButtonCancel, onClickButtonApply, loading, textButtonCancel, textButtonApply, propsButtonCancel, propsButtonApply, preset, children, errorText, showError, renderButtons, } = this.props;
        const buttonCancel = (React.createElement("div", { className: b('button', { action: 'cancel' }) },
            React.createElement(Button, Object.assign({ view: textButtonApply ? 'flat' : 'normal', size: "l", width: "max", onClick: onClickButtonCancel, disabled: loading }, propsButtonCancel), textButtonCancel)));
        const buttonApply = (React.createElement("div", { className: b('button', { action: 'apply' }) },
            React.createElement(Button, Object.assign({ ref: this.errorTooltipRef, type: "submit", view: getButtonView(preset), size: "l", width: "max", onClick: onClickButtonApply, loading: loading, className: b('button-apply', { preset }) }, propsButtonApply), textButtonApply),
            errorText && (React.createElement(Popup, { open: showError, anchorRef: this.errorTooltipRef, placement: ['bottom', 'top'], disableLayer: true, hasArrow: true },
                React.createElement("div", { className: b('error') }, errorText)))));
        return (React.createElement("div", { className: b() },
            React.createElement("div", { className: b('children') }, children),
            React.createElement("div", { className: b('bts-wrapper') }, renderButtons ? (renderButtons(buttonApply, buttonCancel)) : (React.createElement(React.Fragment, null,
                textButtonCancel && buttonCancel,
                textButtonApply && buttonApply)))));
    }
    attachKeyDownListeners() {
        setTimeout(() => {
            window.addEventListener('keydown', this.handleKeyDown);
        }, 0);
    }
    detachKeyDownListeners() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}
DialogFooter.defaultProps = {
    preset: 'default',
    showError: false,
    listenKeyEnter: false,
};
