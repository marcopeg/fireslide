/**
 * FireSlide
 * Application Store
 *
 */

var Fluxo = require('fluxo');

var store = module.exports = Fluxo.createStore(true, {

    // initial data schema
    initialState: {
        mode: 'show',           // show | remote | attendee
        slides: [],
        cached: 0,
        current: 0
    },

    // actions manifesto
    actions: [
        'new-slides',           // slides data file is loaded from the server
        'slide-cache',          // a slingle slide has been cached
        'change-mode',          // set a new application user mode
        'next'
    ],

    onNewSlides(slides) {
        this.setState({
            slides: slides,
            cached: 0,
            current: 0
        });

        // trigger slide caching
        slides.forEach(function(src) {
            cacheImage(src, function() {
                store.trigger('slide-cache', src);
            });
        });
    },

    onSlideCache(slide) {
        this.setState({
            cached: this.state.cached + 1
        });
    },

    onChangeMode(mode) {
        this.setState({
            mode: mode
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

function cacheImage(src, done, timeout) {
    var img = new Image();

    timeout = setTimeout(function() {
        done('timeout', src);
    }, timeout || 5000);

    img.onload = function() {
        clearTimeout(timeout);
        done(null, src);
    };

    // fake delay [0.5-2.5]s
    // setTimeout(function() {img.src = src;}, (Math.floor(Math.random()*25)+5)*100);
    img.src = src;
}
