/**
 * FireSlide - Remote Info Bar
 *
 */

var React = require('react');
var TouchClick = require('elements/touch-click');
var store = require('app/store');

module.exports = React.createClass({

    getDefaultProps() {
        return {
            useTouch: false,
            height: 80,
            width: 0
        };
    },

    _onClick() {
        store.trigger('reset-vote', this.props.type);
    },

    render() {

        var className = 'vote-info-' + this.props.type;
        var style = {
            width: this.props.width + '%',
            height: this.props.height + 'px'
        };

        return (

            <TouchClick className={className} style={style} onAction={this._onClick}>
                <span>
                    {this.props.value}
                </span>
            </TouchClick>
        );
    }

});
