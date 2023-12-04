import { __rest } from "tslib";
import React from 'react';
import { Platform, withMobile } from '../mobile';
import { sheetBlock } from './constants';
import { VelocityTracker } from './utils';
import './Sheet.css';
const DEFAULT_TRANSITION_DURATION = '0.3s';
const HIDE_THRESHOLD = 50;
const ACCELERATION_Y_MAX = 0.08;
const ACCELERATION_Y_MIN = -0.02;
// 90% from viewport
const MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT = 0.9;
let hashHistory = [];
class SheetContent extends React.Component {
    constructor() {
        super(...arguments);
        this.veilRef = React.createRef();
        this.sheetRef = React.createRef();
        this.sheetTopRef = React.createRef();
        this.sheetContentRef = React.createRef();
        this.sheetInnerContentRef = React.createRef();
        this.sheetTitleRef = React.createRef();
        this.velocityTracker = new VelocityTracker();
        this.observer = null;
        this.transitionDuration = DEFAULT_TRANSITION_DURATION;
        this.state = {
            startScrollTop: 0,
            startY: 0,
            deltaY: 0,
            prevSheetHeight: 0,
            swipeAreaTouched: false,
            contentTouched: false,
            veilTouched: false,
            isAnimating: false,
            inWindowResizeScope: false,
        };
        this.setStyles = ({ status, deltaHeight = 0 }) => {
            if (!this.sheetRef.current || !this.veilRef.current) {
                return;
            }
            const visibleHeight = this.sheetHeight - deltaHeight;
            const translate = status === 'showing'
                ? `translate3d(0, -${visibleHeight}px, 0)`
                : 'translate3d(0, 0, 0)';
            let opacity = 0;
            if (status === 'showing') {
                opacity = deltaHeight === 0 ? 1 : visibleHeight / this.sheetHeight;
            }
            this.veilRef.current.style.opacity = String(opacity);
            this.sheetRef.current.style.transform = translate;
        };
        this.show = () => {
            this.setState({ isAnimating: true }, () => {
                this.setStyles({ status: 'showing' });
                this.setHash();
            });
        };
        this.hide = () => {
            this.setState({ isAnimating: true }, () => {
                this.setStyles({ status: 'hiding' });
                this.removeHash();
            });
        };
        this.onSwipeAreaTouchStart = (e) => {
            this.velocityTracker.clear();
            this.setState({
                startY: e.nativeEvent.touches[0].clientY,
                swipeAreaTouched: true,
            });
        };
        this.onContentTouchStart = (e) => {
            if (!this.props.allowHideOnContentScroll || this.state.swipeAreaTouched) {
                return;
            }
            this.velocityTracker.clear();
            this.setState({
                startY: e.nativeEvent.touches[0].clientY,
                startScrollTop: this.sheetScrollTop,
                contentTouched: true,
            });
        };
        this.onSwipeAriaTouchMove = (e) => {
            const delta = e.nativeEvent.touches[0].clientY - this.state.startY;
            this.velocityTracker.addMovement({
                x: e.nativeEvent.touches[0].clientX,
                y: e.nativeEvent.touches[0].clientY,
            });
            this.setState({ deltaY: delta });
            if (delta <= 0) {
                return;
            }
            this.setStyles({ status: 'showing', deltaHeight: delta });
        };
        this.onContentTouchMove = (e) => {
            if (!this.props.allowHideOnContentScroll) {
                return;
            }
            const { startScrollTop, swipeAreaTouched } = this.state;
            if (swipeAreaTouched ||
                this.sheetScrollTop > 0 ||
                (startScrollTop > 0 && startScrollTop !== this.sheetScrollTop)) {
                return;
            }
            const delta = e.nativeEvent.touches[0].clientY - this.state.startY;
            this.velocityTracker.addMovement({
                x: e.nativeEvent.touches[0].clientX,
                y: e.nativeEvent.touches[0].clientY,
            });
            this.setState({ deltaY: delta });
            if (delta <= 0) {
                return;
            }
            this.setStyles({ status: 'showing', deltaHeight: delta });
        };
        this.onTouchEndAction = (deltaY) => {
            const accelerationY = this.velocityTracker.getYAcceleration();
            if (this.sheetHeight <= deltaY) {
                this.props.hideSheet();
            }
            else if ((deltaY > HIDE_THRESHOLD &&
                accelerationY <= ACCELERATION_Y_MAX &&
                accelerationY >= ACCELERATION_Y_MIN) ||
                accelerationY > ACCELERATION_Y_MAX) {
                this.hide();
            }
            else if (deltaY !== 0) {
                this.show();
            }
        };
        this.onSwipeAriaTouchEnd = () => {
            const { deltaY } = this.state;
            this.onTouchEndAction(deltaY);
            this.setState({
                startY: 0,
                deltaY: 0,
                swipeAreaTouched: false,
            });
        };
        this.onContentTouchEnd = () => {
            const { deltaY, swipeAreaTouched } = this.state;
            if (!this.props.allowHideOnContentScroll || swipeAreaTouched) {
                return;
            }
            this.onTouchEndAction(deltaY);
            this.setState({
                startY: 0,
                deltaY: 0,
                contentTouched: false,
            });
        };
        this.onVeilClick = () => {
            this.setState({ veilTouched: true });
            this.hide();
        };
        this.onVeilTransitionEnd = () => {
            this.setState({ isAnimating: false });
            if (this.veilOpacity === '0') {
                this.props.hideSheet();
            }
        };
        this.onContentTransitionEnd = (e) => {
            if (e.propertyName === 'height') {
                if (this.sheetContentRef.current) {
                    this.sheetContentRef.current.style.transition = 'none';
                }
            }
        };
        this.onResizeWindow = () => {
            this.setState({ inWindowResizeScope: true });
            this.onResize();
            setTimeout(() => this.setState({ inWindowResizeScope: false }), 0);
        };
        this.onResize = () => {
            if (!this.sheetRef.current || !this.sheetContentRef.current) {
                return;
            }
            const sheetHeight = this.sheetTitleHeight + this.innerContentHeight + this.sheetTopHeight;
            const availableViewportHeight = window.innerHeight * MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT;
            const resultHeight = sheetHeight >= availableViewportHeight ? availableViewportHeight : sheetHeight;
            this.sheetContentRef.current.style.transition =
                this.state.prevSheetHeight > sheetHeight
                    ? `height 0s ease ${this.transitionDuration}`
                    : 'none';
            this.sheetContentRef.current.style.height = `${resultHeight - this.sheetTopHeight}px`;
            this.sheetRef.current.style.transform = `translate3d(0, -${resultHeight}px, 0)`;
            this.setState({ prevSheetHeight: sheetHeight });
        };
    }
    componentDidMount() {
        this.addListeners();
        this.show();
        this.setInitialStyles();
        this.setState({
            prevSheetHeight: this.sheetTitleHeight + this.innerContentHeight + this.sheetTopHeight,
        });
    }
    componentDidUpdate(prevProps) {
        const { visible, location } = this.props;
        if (!prevProps.visible && visible) {
            this.show();
        }
        if ((prevProps.visible && !visible) || this.shouldClose(prevProps)) {
            this.hide();
        }
        if (prevProps.location.pathname !== location.pathname) {
            hashHistory = [];
        }
    }
    componentWillUnmount() {
        this.removeListeners();
    }
    render() {
        const { content, contentClassName, swipeAreaClassName, hideTopBar, title } = this.props;
        const { deltaY, swipeAreaTouched, contentTouched, veilTouched, isAnimating, inWindowResizeScope, } = this.state;
        const veilTransitionMod = {
            'with-transition': !deltaY || veilTouched,
        };
        const sheetTransitionMod = {
            'with-transition': !inWindowResizeScope && veilTransitionMod['with-transition'],
        };
        const contentMod = {
            'without-scroll': (deltaY > 0 && contentTouched) || swipeAreaTouched,
        };
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { ref: this.veilRef, className: sheetBlock('veil', veilTransitionMod), onClick: isAnimating ? undefined : this.onVeilClick, onTransitionEnd: this.onVeilTransitionEnd }),
            React.createElement("div", { ref: this.sheetRef, className: sheetBlock('sheet', sheetTransitionMod) },
                !hideTopBar && (React.createElement("div", { ref: this.sheetTopRef, className: sheetBlock('sheet-top') },
                    React.createElement("div", { className: sheetBlock('sheet-top-resizer') }))),
                React.createElement("div", { className: sheetBlock('sheet-swipe-area', swipeAreaClassName), onTouchStart: this.onSwipeAreaTouchStart, onTouchMove: this.onSwipeAriaTouchMove, onTouchEnd: this.onSwipeAriaTouchEnd }),
                React.createElement("div", { ref: this.sheetContentRef, className: sheetBlock('sheet-content', contentMod, contentClassName), onTouchStart: this.onContentTouchStart, onTouchMove: this.onContentTouchMove, onTouchEnd: this.onContentTouchEnd, onTransitionEnd: this.onContentTransitionEnd },
                    title && (React.createElement("div", { ref: this.sheetTitleRef, className: sheetBlock('sheet-content-title') }, title)),
                    React.createElement("div", { ref: this.sheetInnerContentRef }, content)))));
    }
    get veilOpacity() {
        var _a;
        return ((_a = this.veilRef.current) === null || _a === void 0 ? void 0 : _a.style.opacity) || 0;
    }
    get sheetTopHeight() {
        var _a;
        return ((_a = this.sheetTopRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) || 0;
    }
    get sheetHeight() {
        var _a;
        return ((_a = this.sheetRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) || 0;
    }
    get innerContentHeight() {
        var _a;
        return ((_a = this.sheetInnerContentRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) || 0;
    }
    get sheetTitleHeight() {
        var _a;
        return ((_a = this.sheetTitleRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) || 0;
    }
    get sheetScrollTop() {
        var _a;
        return ((_a = this.sheetContentRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) || 0;
    }
    setInitialStyles() {
        if (this.sheetContentRef.current && this.sheetInnerContentRef.current) {
            this.transitionDuration = getComputedStyle(this.sheetContentRef.current).getPropertyValue('--yc-sheet-transition-duration');
            const initialHeight = this.sheetHeight - this.sheetTopHeight;
            this.sheetContentRef.current.style.height = `${initialHeight}px`;
        }
    }
    addListeners() {
        window.addEventListener('resize', this.onResizeWindow);
        if (this.sheetRef.current) {
            const config = { subtree: true, childList: true };
            this.observer = new MutationObserver(this.onResize);
            this.observer.observe(this.sheetRef.current, config);
        }
    }
    removeListeners() {
        window.removeEventListener('resize', this.onResizeWindow);
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    setHash() {
        const { id, platform, location, history } = this.props;
        if (platform === Platform.BROWSER) {
            return;
        }
        const newLocation = Object.assign(Object.assign({}, location), { hash: id });
        switch (platform) {
            case Platform.IOS:
                if (location.hash) {
                    hashHistory.push(location.hash);
                }
                history.replace(newLocation);
                break;
            case Platform.ANDROID:
                history.push(newLocation);
                break;
        }
    }
    removeHash() {
        var _a;
        const { id, platform, location, history } = this.props;
        if (platform === Platform.BROWSER || location.hash !== `#${id}`) {
            return;
        }
        switch (platform) {
            case Platform.IOS:
                history.replace(Object.assign(Object.assign({}, location), { hash: (_a = hashHistory.pop()) !== null && _a !== void 0 ? _a : '' }));
                break;
            case Platform.ANDROID:
                history.goBack();
                break;
        }
    }
    shouldClose(prevProps) {
        const { id, platform, location, history } = this.props;
        return (platform !== Platform.BROWSER &&
            history.action === 'POP' &&
            prevProps.location.hash !== location.hash &&
            location.hash !== `#${id}`);
    }
}
SheetContent.defaultProps = {
    id: 'sheet',
    allowHideOnContentScroll: true,
};
function withRouterWrapper(Component) {
    const ComponentWithRouter = (props) => {
        const { useHistory, useLocation } = props, remainingProps = __rest(props, ["useHistory", "useLocation"]);
        return React.createElement(Component, Object.assign({}, remainingProps, { history: useHistory(), location: useLocation() }));
    };
    const componentName = Component.displayName || Component.name || 'Component';
    ComponentWithRouter.displayName = `withRouterWrapper(${componentName})`;
    return ComponentWithRouter;
}
export const SheetContentContainer = withMobile(withRouterWrapper(SheetContent));
