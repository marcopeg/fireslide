/**
 * FireSlide - LiveQuestion Button
 *
 */

var store = require('app/store');

var React = require('react');

var TouchClick = require('elements/touch-click');

module.exports = React.createClass({

    getDefaultProps() {
        return {
            isActive: false
        };
    },

    _startAction() {
        store.trigger('live-question');
    },

    render() {

        var className = ['attendee-question'];
        if (this.props.isActive) {
            className.push('attendee-question-pending');
        }

        return (
            <TouchClick onActionStart={this._startAction} className={className.join(' ')}>
                <span key="hadsup" className="raise-hand" />
            </TouchClick>
        );
    }

});
