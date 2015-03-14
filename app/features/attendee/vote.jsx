/**
 * FireSlide - Live Feedback Button
 *
 */

var React = require('react');
var store = require('app/store');
var TouchClick = require('elements/touch-click');

module.exports = React.createClass({
    
    propTypes: {
        value: React.PropTypes.oneOf(['good', 'bored', 'panic', 'yes', 'no'])
    },
    
    getDefaultProps() {
        return {
            value: ''
        };
    },

    _vote: function() {
        store.trigger('vote', this.props.value);
    },

    render() {
        var className = 'vote-' + this.props.value;
        return (
            <TouchClick className={className} onAction={this._vote}>{this.props.value}</TouchClick>
        );
    }

});
