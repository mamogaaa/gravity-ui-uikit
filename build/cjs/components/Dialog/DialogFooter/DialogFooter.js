"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogFooter = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = require("../../Button");
const Popup_1 = require("../../Popup");
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.block)('dialog-footer');
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
class DialogFooter extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.errorTooltipRef = react_1.default.createRef();
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
        const buttonCancel = (react_1.default.createElement("div", { className: b('button', { action: 'cancel' }) },
            react_1.default.createElement(Button_1.Button, Object.assign({ view: textButtonApply ? 'flat' : 'normal', size: "l", width: "max", onClick: onClickButtonCancel, disabled: loading }, propsButtonCancel), textButtonCancel)));
        const buttonApply = (react_1.default.createElement("div", { className: b('button', { action: 'apply' }) },
            react_1.default.createElement(Button_1.Button, Object.assign({ ref: this.errorTooltipRef, type: "submit", view: getButtonView(preset), size: "l", width: "max", onClick: onClickButtonApply, loading: loading, className: b('button-apply', { preset }) }, propsButtonApply), textButtonApply),
            errorText && (react_1.default.createElement(Popup_1.Popup, { open: showError, anchorRef: this.errorTooltipRef, placement: ['bottom', 'top'], disableLayer: true, hasArrow: true },
                react_1.default.createElement("div", { className: b('error') }, errorText)))));
        return (react_1.default.createElement("div", { className: b() },
            react_1.default.createElement("div", { className: b('children') }, children),
            react_1.default.createElement("div", { className: b('bts-wrapper') }, renderButtons ? (renderButtons(buttonApply, buttonCancel)) : (react_1.default.createElement(react_1.default.Fragment, null,
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
exports.DialogFooter = DialogFooter;
DialogFooter.defaultProps = {
    preset: 'default',
    showError: false,
    listenKeyEnter: false,
};
