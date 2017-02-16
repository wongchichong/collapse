'use strict';

//Object.defineProperty(exports, "__esModule", {
//  value: true
//});

import * as React from "react";
import * as ReactDOM from "react-dom";

import { CollapsePanel } from './panel';
import { animation } from './openanimationfactory';
import { classnames } from '../../classnames';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array['from'](arr); } }

function toArray(activeKey) {
    var currentActiveKey = activeKey;
    if (!Array.isArray(currentActiveKey)) {
        currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
    }
    return currentActiveKey;
}

interface CollapseProps {
    children?: any;
    prefixCls?: string;
    activeKey?: string | string[];
    defaultActiveKey?: string | string[];
    openAnimation?: Object;
    onChange?: Function;
    accordion?: boolean;
    className?: string;
    style?: Object;
}
export class Collapse extends React.Component<CollapseProps, any> {
    displayName = 'Collapse';

    static propTypes = {
        children: React.PropTypes.any,
        prefixCls: React.PropTypes.string,
        activeKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
        defaultActiveKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
        openAnimation: React.PropTypes.object,
        onChange: React.PropTypes.func,
        accordion: React.PropTypes.bool,
        className: React.PropTypes.string,
        style: React.PropTypes.object
    };

    statics = {
        Panel: CollapsePanel
    }

    getDefaultProps() {
        return {
            prefixCls: 'rc-collapse',
            onChange: function onChange() { },

            accordion: false
        };
    }
    getInitialState() {
        var _props = this.props,
            activeKey = _props.activeKey,
            defaultActiveKey = _props.defaultActiveKey;

        var currentActiveKey = defaultActiveKey;
        if ('activeKey' in this.props) {
            currentActiveKey = activeKey;
        }
        return {
            openAnimation: this.props.openAnimation || animation(this.props.prefixCls),
            activeKey: toArray(currentActiveKey)
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('activeKey' in nextProps) {
            this.setState({
                activeKey: toArray(nextProps.activeKey)
            });
        }
        if ('openAnimation' in nextProps) {
            this.setState({
                openAnimation: nextProps.openAnimation
            });
        }
    }
    onClickItem(key) {
        var _this = this;

        return function () {
            var activeKey = _this.state.activeKey;
            if (_this.props.accordion) {
                activeKey = activeKey[0] === key ? [] : [key];
            } else {
                activeKey = [].concat(_toConsumableArray(activeKey));
                var index = activeKey.indexOf(key);
                var isActive = index > -1;
                if (isActive) {
                    // remove active state
                    activeKey.splice(index, 1);
                } else {
                    activeKey.push(key);
                }
            }
            _this.setActiveKey(activeKey);
        };
    }
    getItems() {
        var _this2 = this;

        var activeKey = this.state.activeKey;
        var _props2 = this.props,
            prefixCls = _props2.prefixCls,
            accordion = _props2.accordion;

        var newChildren = [];

        React.Children.forEach(this.props.children, function (child: React.ReactElement<any>, index) {
            if (!child) return;
            // If there is no key provide, use the panel order as default key
            var key = child.key || String(index);
            var header = child.props.header;
            var isActive = false;
            if (accordion) {
                isActive = activeKey[0] === key;
            } else {
                isActive = activeKey.indexOf(key) > -1;
            }

            var props = {
                key: key,
                header: header,
                isActive: isActive,
                prefixCls: prefixCls,
                openAnimation: _this2.state.openAnimation,
                children: child.props.children,
                onItemClick: _this2.onClickItem(key).bind(_this2)
            };

            newChildren.push(React.cloneElement(child, props));
        });

        return newChildren;
    }
    setActiveKey(activeKey) {
        if (!('activeKey' in this.props)) {
            this.setState({ activeKey: activeKey });
        }
        this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
    }
    render() {
        var _classNames;

        var _props3 = this.props,
            prefixCls = _props3.prefixCls,
            className = _props3.className,
            style = _props3.style;

        var collapseClassName = classnames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _classNames));
        return React.createElement(
            'div',
            { className: collapseClassName, style: style },
            this.getItems()
        );
    }
}

//exports["default"] = Collapse;
//module.exports = exports['default'];