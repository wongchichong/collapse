'use strict';

import { cssAnimation } from 'css-animation';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function animate(node, show, transitionName, done) {
    var height = void 0;
    return cssAnimation(node, transitionName, {
        start: function start() {
            if (!show) {
                node.style.height = node.offsetHeight + 'px';
            } else {
                height = node.offsetHeight;
                node.style.height = 0;
            }
        },
        active: function active() {
            node.style.height = (show ? height : 0) + 'px';
        },
        end: function end() {
            node.style.height = '';
            done();
        }
    });
}

export function animation(prefixCls) {
    return {
        enter: function enter(node, done) {
            return animate(node, true, prefixCls + '-anim', done);
        },
        leave: function leave(node, done) {
            return animate(node, false, prefixCls + '-anim', done);
        }
    };
}
