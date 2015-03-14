/**
 * FireSlide - Remote Slide Button
 *
 */

var React = require('react');
var Slide = require('elements/slide');
var store = require('app/store');

module.exports = React.createClass({
    
    propTypes: {
        position: React.PropTypes.number.isRequired,
        onStart: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            active: false,
            position: 0,
            offset: 0
        };
    },

    getDefaultProps() {
        return {
            useTouch: false
        };
    },

    render() {

        var style = {
            top: 'calc(' + this.props.position + '% + ' + this.props.offset + 'px)'
        };
        console.log(this.props);

        if (this.props.useTouch) {
            return <div className="slide-tip-resizer" style={style} onTouchStart={this.props.onStart} />;
        } else {
            return <div className="slide-tip-resizer"  style={style} onMouseDown={this.props.onStart} />;
        }

    }

});
