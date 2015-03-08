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

var store = require('./store');

module.exports = React.createClass({

    mixins: [store.mixin()],

    render() {

        // compute all the logical informations that we need from the state
        var dataIsReady = this.state.slides.length > 0;
        var isPreloading = dataIsReady && this.state.cached < this.state.slides.length;
        var isShowtime = dataIsReady && !isPreloading;

        // are we preloading?
        if (isPreloading) {
            return <Preload total={this.state.slides.length} cached={this.state.cached} />;
        }

        // is it show time?
        if (isShowtime) {
            return <SlideDeck slides={this.state.slides} current={this.state.current} />;
        }

        // the main UI schema is a composition of high-level interface modules
        // which receive properties from the central state.
        return null;
    }

});
