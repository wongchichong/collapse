'use strict';


import * as React from "react";
import * as ReactDOM from "react-dom";
import { classnames } from '../../classnames';
import { PanelContent } from './PanelContent';
import { Animate } from '../../rc-animate';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

interface CollapsePanelProps {
    className?: string | Object;
    children?: any,
    openAnimation?: Object,
    prefixCls?: string;
    header?: string | number | Node;
    showArrow?: boolean;
    isActive?: boolean;
    onItemClick?: Function;
    style: Object;
}
export class CollapsePanel extends React.Component<CollapsePanelProps, any> {
    displayName = 'CollapsePanel';

    static propTypes = {
        className: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        children: React.PropTypes.any,
        openAnimation: React.PropTypes.object,
        prefixCls: React.PropTypes.string,
        header: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.node]),
        showArrow: React.PropTypes.bool,
        isActive: React.PropTypes.bool,
        onItemClick: React.PropTypes.func,
        style: React.PropTypes.object
    };

    getDefaultProps() {
        return {
            showArrow: true,
            isActive: false,
            onItemClick: function onItemClick() { }
        };
    }
    handleItemClick() {
        this.props.onItemClick();
    }
    render() {
        var _classNames;

        var _props = this.props,
            className = _props.className,
            style = _props.style,
            prefixCls = _props.prefixCls,
            header = _props.header,
            children = _props.children,
            isActive = _props.isActive,
            showArrow = _props.showArrow;

        var headerCls = prefixCls + '-header';
        var itemCls = classnames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-active', isActive), _classNames), className);
        return React.createElement(
            'div',
            { className: itemCls, style: style },
            React.createElement(
                'div',
                {
                    className: headerCls,
                    onClick: this.handleItemClick,
                    role: 'tab',
                    'aria-expanded': isActive
                },
                showArrow && React.createElement('i', { className: 'arrow' }),
                header
            ),
            React.createElement(
                Animate,
                {
                    showProp: 'isActive',
                    exclusive: true,
                    component: '',
                    animation: this.props.openAnimation
                },
                React.createElement(
                    PanelContent,
                    { prefixCls: prefixCls, isActive: isActive },
                    children
                )
            )
        );
    }
}

