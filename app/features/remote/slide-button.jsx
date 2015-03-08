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

    _onClick() {
        store.trigger(this.props.action);
    },

    render() {

        var style = {
            backgroundImage: 'url(' + this.props.src + ')'
        };

        var className = 'slide-button ' + this.props.action;

        return <a className={className} onClick={this._onClick} style={style} />;
    }

});
