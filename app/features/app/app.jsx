/**
 * FireSlide
 * ControllerView
 *
 * this React component is the entry point of the whole application,
 * it knows about data via store, so it becomes a Controller View
 *
 */

var React = require('react');
var SlideDeck = require('./slide-deck');

var store = require('./store');

module.exports = React.createClass({

    // the store mixin gives the initial state to the React component
    // this is a really convenient way to tie a store to the UI's Controller View
    mixins: [store.mixin()],

    render() {
        // sometimes good old plain Javascript is way more readable than JSX!
        return React.createElement(SlideDeck, {
            slides: this.state.slides,
            current: this.state.current
        });
    }

});
