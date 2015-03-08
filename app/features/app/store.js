/**
 * FireSlide
 * Application Store
 *
 */

var Fluxo = require('fluxo');
var firebaseSync = require('./firebase-sync');

var store = module.exports = Fluxo.createStore(true, {

    // initial data schema
    initialState: {
        mode: 'show',           // show | remote | attendee
        slides: [],
        tips: [],
        cached: 0,
        current: 0,
        syncing: false,         // turn true after the first sync-value from firebase
        transition: null        // visual transition for the slideshow
    },

    // actions manifesto
    actions: [
        'new-slides',           // slides data file is loaded from the server
        'slide-cache',          // a slingle slide has been cached
        'change-mode',          // set a new application user mode
        'sync-status',          // updates the "syncing" state of the app
        'set-slide',            // set current slide index
        'set-transition',
        'next',
        'prev'
    ],

    mixins: [
        firebaseSync
    ],

    onNewSlides(slides) {

        // instead of dramatically change the app's structure
        // I choose to manipulate the rich slides list and to
        // separate urls from tips in two state properties
        var tips = [];
        slides = slides.map(function(slide) {
            tips.push(slide.tip || '');
            return slide.src;
        });

        this.setState({
            slides: slides,
            tips: tips,
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

    onSyncStatus(status) {
        this.setState({
            syncing: status
        });
    },

    onSetTransition(transition) {
        this.setState({
            transition: transition
        });
    },

    onSetSlide(index) {
        this.setState({
            current: index
        });
    },

    onNext() {
        var next = this.state.current + 1;
        if (next >= this.state.slides.length) {
            console.warn('There are no more slides!');
            return;
        }
        this.trigger('set-slide', next);
    },

    onPrev() {
        var prev = this.state.current - 1;
        if (prev < 0) {
            console.warn('There are no previous slides!');
            return;
        }
        this.trigger('set-slide', prev);
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
