/**
 * FireSlide
 * Application Store
 *
 */

var Fluxo = require('fluxo');
var firebaseService = require('./firebase-service');
var streamingControlService = require('./services/streaming-control');
var streamingService = require('./services/streaming');

var store = module.exports = Fluxo.createStore(true, {

    // initial data schema
    initialState: {
        mode: 'attendee',           // show | remote | attendee
        slides: [],
        tips: [],
        cached: 0,
        current: 0,
        syncing: false,             // turn true after the first sync-value from firebase
        transition: null,           // visual transition for the slideshow
        useTouch: isTouchDevice(),  // whether to use touch optimised components
        tipHeight: 25,
        tipIsResizing: false,
        feedbackInterval: 30000,    // how long a live feedback lies visible on the remote
        voteGood: 0,
        voteBored: 0,
        votePanic: 0,
        handIsUp: false,
        raisedHands: 0
    },

    // actions manifesto
    actions: [
        'new-slides',               // slides data file is loaded from the server
        'slide-cache',              // a slingle slide has been cached
        'change-mode',              // set a new application user mode
        'sync-status',              // updates the "syncing" state of the app
        'set-slide',                // set current slide index
        'set-transition',
        'set-tip-height',
        'set-tip-resizing',
        'next',
        'prev',
        {
            name: 'vote',
            action: firebaseService.vote
        },{
            name: 'reset-vote',
            action: function(prop) {
                switch (prop) {
                    case 'good': prop = 'voteGood'; break;
                    case 'bored': prop = 'voteBored'; break;
                    case 'panic': prop = 'votePanic'; break;
                }
                this.store.setState(prop, 0);
            }
        },{
            name: 'hand',
            action: firebaseService.raiseHand
        },{
            name: 'reset-raised-hands',
            action: firebaseService.resetRaisedHands
        },{
            name: 'request-session',
            action: streamingControlService.requestSession
        },{
            name: 'start-subscriber-session',
            action: streamingService.startSubscriberSession
        }
    ],

    mixins: [
        firebaseService.syncMixin
        // Fluxo.mockMixin(require('./specs/fixtures/attendee.first-slide.fixture'))
        // Fluxo.mockMixin(require('./specs/fixtures/remote.feedback.fixture'))
        // Fluxo.mockMixin(require('./specs/fixtures/remote.hands-up.fixture'))
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
            cached: 0
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

    onSetTipHeight(val) {
        this.setState({
            tipHeight: val
        });
    },

    onSetTipResizing(val) {
        this.setState({
            tipIsResizing: !!val
        });
    },

    onSetSlide(index) {
        this.setState({
            current: index
        });
    },

    onHand(val) {
        this.setState({
            handIsUp: val
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

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
