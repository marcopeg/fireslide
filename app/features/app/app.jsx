/**
 * FireSlide
 * ControllerView
 *
 * this React component is the entry point of the whole application,
 * it knows about data via store, so it becomes a Controller View
 *
 */

var React = require('react');
var Preload = require('./preload');
var SlideDeck = require('./slide-deck');

var store = require('app-store');

module.exports = React.createClass({

    // the store mixin gives the initial state to the React component
    // this is a really convenient way to tie a store to the UI's Controller View
    mixins: [store.mixin()],

    render() {

        var preload = null;
        if (this.state.slides.length) {
            preload = <Preload slides={this.state.slides} />;
        }

        var slideshow = null;
        if (this.state.slidesAreReady) {
            slideshow = React.createElement(SlideDeck, {
                slides: this.state.slides,
                current: this.state.current
            });
        }

        return (
            <div>
                {preload}
                {slideshow}
            </div>
        );
    }

});
