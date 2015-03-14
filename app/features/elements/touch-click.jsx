/**
 * TouchClick
 * button element compatible with both mouse and touch events
 *
 */

var React = require('react');

module.exports = React.createClass({

    propTypes: {
        onAction: React.PropTypes.func,
        activeClass: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            onAction: null,
            className: null,
            activeClass: ' active',
            shouldUseTouch: isTouchDevice()
        };
    },

    getInitialState() {
        return {
            isActive: false
        };
    },

    _start(e) {
        e.preventDefault();

        this.setState({
            isActive: true
        });
    },

    _end(e) {
        e.preventDefault();

        this.setState({
            isActive: false
        });

        this.props.onAction && this.props.onAction();
    },

    render() {

        var {
            shouldUseTouch,
            className,
            activeClass,
            children,
            ...others
        } = this.props;

        if (this.state.isActive) {
            className += activeClass;
        }

        if (shouldUseTouch) {
            return <a {...others} className={className} onTouchStart={this._start} onTouchEnd={this._end}>{children}</a>;
        } else {
            return <a {...others} className={className} onMouseDown={this._start} onMouseUp={this._end}>{children}</a>;
        }

    }

});

function isTouchDevice() {
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch); // jshint ignore:line
}


