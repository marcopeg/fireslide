/**
 * FireSlide
 * ControllerView
 *
 * this React component is the entry point of the whole application,
 * it knows about data via store, so it becomes a Controller View
 *
 * in this scenario this component acts as "director" by deciding
 * which "scene" to show.
 *
 */

var React = require('react');
var Preload = require('./preload');
var MainUi = require('./main-ui');

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
            return (
                <Preload 
                    total={this.state.slides.length} 
                    cached={this.state.cached} 
                    />
            );
        }

        // is it show time?
        if (isShowtime) {
            return (
                <MainUi 
                    mode={this.state.mode}
                    syncing={this.state.syncing}
                    slides={this.state.slides} 
                    current={this.state.current}
                    transition={this.state.transition}
                    />
            );
        }

        return null;
    }
});
