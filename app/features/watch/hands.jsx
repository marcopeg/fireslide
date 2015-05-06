/**
 * FireSlide - Raise Your Hand
 *
 */

var React = require('react');
var store = require('app/store');
var TouchClick = require('elements/touch-click');

module.exports = React.createClass({
    
    _reset() {
        store.trigger('reset-raised-hands');
    },

    render() {
        return (
            <TouchClick className="raised-hands" onAction={this._reset}>
                {this.props.children}
            </TouchClick>
        );
    }

});
