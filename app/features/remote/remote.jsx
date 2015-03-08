/**
 * FireSlide - Remote
 *
 */

var React = require('react');
var Slide = require('elements/slide');

// store is a singletone so you get the very same object
// everywehere you reference it!
var store = require('app/store');

module.exports = React.createClass({
    
    propTypes: {
        slides: React.PropTypes.array.isRequired,
        current: React.PropTypes.number.isRequired
    },
    
    getDefaultProps() {
        return {
            slides: [],
            current: 0
        };
    },

    // user actions are now propagated to the central store
    // as "actions". actions must be accepted by the store.
    _onClick() {
        store.trigger('next');
    },

    render() {
        return <Slide src={this.props.slides[this.props.current]} onClick={this._onClick} />;
    }

});
