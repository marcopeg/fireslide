/**
 * FireSlide
 * application store
 *
 */

var Fluxo = require('fluxo');
var slidesLoader = require('./slides-loader-mixin');

module.exports = Fluxo.createStore(true, {

    // you can attach many reusable behaviours to any store via mxins
    mixins: [
        slidesLoader        // simulate an asynchronous load of the slides definition data
    ],

    // initial data schema
    initialState: {
        slidesAreReady: false,
        slides: [],
        current: 0
    },

    // actions manifesto
    actions: [
        'load',     // slides data file is loaded from the server
        'ready',    // slide images have been preloaded in memory
        'next'
    ],

    // action with arguments
    onLoad(slides) {
        this.setState({
            slides: slides
        });
    },

    onReady() {
        this.setState({
            slidesAreReady: true            
        });
    },

    // action data implementation
    // here is defined how an action modifies the state in the store
    onNext() {
        var next = this.state.current + 1;

        if (next >= this.state.slides.length) {
            console.warn('There are no more slides!');
            return;
        }

        this.setState({
            current: next
        });
    }

});
