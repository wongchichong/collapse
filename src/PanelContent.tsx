'use strict';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { classnames } from '../../classnames';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

interface PanelContentProps {
    prefixCls?: string;
    isActive?: boolean;
    children?: any;
}
export class PanelContent extends React.Component<PanelContentProps, any> {
    displayName = 'PanelContent';
    _isActived: boolean;

    propTypes = {
        prefixCls: React.PropTypes.string,
        isActive: React.PropTypes.bool,
        children: React.PropTypes.any
    };
    shouldComponentUpdate(nextProps) {
        return this.props.isActive || nextProps.isActive;
    }
    render() {
        var _classnames;

        this._isActived = this._isActived || this.props.isActive;
        if (!this._isActived) {
            return null;
        }
        var _props = this.props,
            prefixCls = _props.prefixCls,
            isActive = _props.isActive,
            children = _props.children;

        var contentCls = classnames((_defineProperty(_classnames, prefixCls + '-content', true), _defineProperty(_classnames, prefixCls + '-content-active', isActive), _defineProperty(_classnames, prefixCls + '-content-inactive', !isActive), _classnames));
        return React.createElement(
            'div',
            {
                className: contentCls,
                role: 'tabpanel'
            },
            React.createElement(
                'div',
                { className: prefixCls + '-content-box' },
                children
            )
        );
    }
}

//exports["default"] = PanelContent;
//module.exports = exports['default'];