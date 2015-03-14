/**
 * FireSlide - Remote Slide Button
 *
 */

var React = require('react');
var TouchClick = require('elements/touch-click');
var store = require('app/store');

module.exports = React.createClass({
    
    propTypes: {
        src: React.PropTypes.string.isRequired,
        action: React.PropTypes.string.isRequired
    },

    _action() {
        store.trigger(this.props.action);
    },

    render() {

        var className = 'slide-button ' + this.props.action;

        var style = {
            backgroundImage: 'url(' + this.props.src + ')'
        };

        return <TouchClick className={className} style={style} onAction={this._action} />;

    }

});
