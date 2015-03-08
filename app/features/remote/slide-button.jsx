/**
 * FireSlide - Remote Slide Button
 *
 */

var React = require('react');
var Slide = require('elements/slide');
var store = require('app/store');

module.exports = React.createClass({
    
    propTypes: {
        src: React.PropTypes.string.isRequired,
        action: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            active: false
        };
    },

    getDefaultProps() {
        return {
            useTouch: false
        };
    },

    _onClick() {
        store.trigger(this.props.action);
    },

    _touchStart() {
        this.setState({
            active: true
        });
    },

    _touchEnd() {
        store.trigger(this.props.action);
        this.setState({
            active: false
        });
    },

    render() {

        var style = {
            backgroundImage: 'url(' + this.props.src + ')'
        };

        var className = 'slide-button ' + this.props.action;

        if (this.state.active) {
            className += ' active';
        }

        if (this.props.useTouch) {
            return <a className={className} style={style} onTouchStart={this._touchStart} onTouchEnd={this._touchEnd} />;
        } else {
            return <a className={className} style={style} onClick={this._onClick} />;
        }

    }

});
