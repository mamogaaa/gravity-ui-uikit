import React from 'react';
import _sumBy from 'lodash/sumBy';
import { block } from '../utils/cn';
import './Progress.css';
const b = block('progress');
export class Progress extends React.Component {
    static isFiniteNumber(value) {
        return isFinite(value) && !isNaN(value);
    }
    static isBetween(value, min, max) {
        return value >= min && value <= max;
    }
    static getOffset(value) {
        return value < 100 ? value - 100 : 0;
    }
    static getValueFromStack(stack) {
        return _sumBy(stack, (item) => item.value);
    }
    static isProgressWithStack(props) {
        return props.stack !== undefined;
    }
    render() {
        const { size, className } = this.props;
        return (React.createElement("div", { className: b({ size }, className) },
            this.renderText(),
            this.renderContent()));
    }
    getTheme() {
        const progressProps = this.props;
        if (Progress.isProgressWithStack(progressProps)) {
            throw new Error('Unexpected behavior');
        }
        const { theme, colorStops, colorStopsValue, value } = progressProps;
        if (colorStops) {
            const matchingColorStopItem = colorStops.find((item, index) => {
                const currentValue = typeof colorStopsValue === 'number' ? colorStopsValue : value;
                return Progress.isBetween(currentValue, index > 1 ? colorStops[index - 1].stop : 0, index < colorStops.length - 1 ? item.stop : 100);
            });
            return matchingColorStopItem ? matchingColorStopItem.theme : theme;
        }
        return theme;
    }
    renderContent() {
        const progressProps = this.props;
        if (Progress.isProgressWithStack(progressProps)) {
            return this.renderStack(progressProps);
        }
        else {
            return this.renderItem(progressProps);
        }
    }
    renderItem(props) {
        const { value } = props;
        const className = b('item', { theme: this.getTheme(), loading: this.props.loading });
        const offset = Progress.getOffset(value);
        const style = { transform: `translateX(${offset}%)` };
        if (Progress.isFiniteNumber(value)) {
            return (React.createElement("div", { className: className, style: style }, this.renderInnerText(offset)));
        }
        return null;
    }
    renderStack(props) {
        const { stack, stackClassName } = props;
        const className = b('stack', stackClassName);
        const value = props.value || Progress.getValueFromStack(stack);
        const offset = Progress.getOffset(value);
        const style = { transform: `translateX(${offset}%)` };
        let itemStyle = { width: `${-offset}%` };
        return (React.createElement("div", { className: className, style: style },
            React.createElement("div", { className: b('item'), style: itemStyle }),
            stack.map(({ value: itemValue, color, title, theme, loading = false, className: itemClassName, content, }, index) => {
                itemStyle = { width: `${itemValue}%`, backgroundColor: color };
                const modifiers = {
                    loading,
                };
                if (typeof color === 'undefined') {
                    modifiers.theme = theme || 'default';
                }
                if (Progress.isFiniteNumber(value)) {
                    return (React.createElement("div", { key: index, className: b('item', modifiers, itemClassName), style: itemStyle, title: title }, content));
                }
                return null;
            }),
            this.renderInnerText(offset)));
    }
    renderInnerText(offset) {
        const { text } = this.props;
        if (!text) {
            return null;
        }
        const className = b('text-inner');
        const style = { transform: `translateX(${-offset}%)` };
        return (React.createElement("div", { className: className, style: style }, text));
    }
    renderText() {
        const { text } = this.props;
        const className = b('text');
        return React.createElement("div", { className: className }, text);
    }
}
Progress.defaultProps = {
    text: '',
    theme: 'default',
    size: 'm',
    loading: false,
};
