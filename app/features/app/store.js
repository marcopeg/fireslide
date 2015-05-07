/**
 * FireSlide
 * Application Store
 *
 */

var Fluxo = require('fluxo');
var Firebase = require('firebase');
var firebaseService = require('services/firebase');

var StreamingControlServiceAtendee = require('services/streaming-control-atendee');
var streamingControlServiceAtendee = new StreamingControlServiceAtendee();

var StreamingControlServiceRemote = require('services/streaming-control-remote');
var streamingControlServiceRemote = new StreamingControlServiceRemote();

var store = module.exports = Fluxo.createStore(true, {

    // initial data schema
    initialState: {
        mode: 'attendee',           // show | remote | attendee
        meta: {},
        slides: [],
        tips: [],
        polls: [],
        pollResult: null,
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
        isStreaming: false,
        streams: [],
        isFilip: false,
        showPoll: false,
        raisedHands: 0
    },

    // actions manifesto
    actions: [
        'set-meta',                 // presentation meta-data
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
        'set-filip',
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
        },
        {
            name: 'toggle-hand',
            action: function() {
                var currentValue = this.store.getState('handIsUp');
                this.store.setState('handIsUp', !currentValue);
                if (currentValue) {
                    streamingControlServiceAtendee.abortSession();
                } else {
                    streamingControlServiceAtendee.requestSession();
                }
            }
        },{
            name: 'request-session',
            action: function() {
                streamingControlServiceAtendee.requestSession();
            }
        },{
            name: 'init-services',
            action: function(mode) {
                streamingControlServiceAtendee.removeAllListeners('sessionStarted');
                streamingControlServiceAtendee.removeAllListeners('sessionStopped');
                streamingControlServiceRemote.removeAllListeners('sessionActive');

                if (this._streamingPublisherService) {
                    this._streamingPublisherService.dispose();
                    this._streamingPublisherService = null;
                }

                if (this._streamingSubscriberService) {
                    this._streamingSubscriberService.dispose();
                    this._streamingSubscriberService = null;
                }

                switch(mode) {
                    case 'attendee':
                        this._streamingPublisherService = require('services/streaming-publisher');
                        streamingControlServiceAtendee.on('sessionStarted', this._streamingPublisherService.start);
                        streamingControlServiceAtendee.on('sessionStopped', this._streamingPublisherService.stop);
                    break;
                    case 'show':
                        this._streamingSubscriberService = require('services/streaming-subscriber');
                        this._streamingSubscriberService.start();
                    break;
                    case 'remote':
                        // streamingControlServiceRemote.on('sessionActive', function(key, value) {
                        //     streamingControlServiceRemote.startSession(key);

                        //     setTimeout(function() {
                        //         streamingControlServiceRemote.abortSession(key);
                        //     }, 5000);
                        // });
                    break;
                }
            }
        },{
            name: 'reset-raised-hands',
            action: firebaseService.resetRaisedHands
        },{
            name: 'init-poll',
            action: firebaseService.initPoll
        },{
            name: 'update-poll',
            action: firebaseService.updatePoll
        },{
            name: 'reset-poll',
            action: firebaseService.resetPoll
        }
    ],

    mixins: [
        firebaseService.syncMixin
        // Fluxo.mockMixin(require('./specs/fixtures/attendee.first-slide.fixture'))
        // Fluxo.mockMixin(require('./specs/fixtures/remote.feedback.fixture'))
        // Fluxo.mockMixin(require('./specs/fixtures/remote.hands-up.fixture'))
    ],

    init() {
        this.trigger('init-services', this.state.mode);

        streamingControlServiceAtendee.on('sessionActive', function(val) {
            this.setState('handIsUp', val);
        }.bind(this));

        streamingControlServiceAtendee.on('sessionStarted', function(val) {
            this.setState('isStreaming', true);
        }.bind(this));

        streamingControlServiceAtendee.on('sessionStopped', function(val) {
            this.setState('isStreaming', false);
        }.bind(this));
    },

    onSetMeta(meta) {
        this.setState({meta: meta});
    },

    onNewSlides(slides) {

        // instead of dramatically change the app's structure
        // I choose to manipulate the rich slides list and to
        // separate urls from tips in two state properties
        //console.log('onNewSlides', slides);
        var tips = [];
        var polls = [];
        slides = slides.map(function(slide) {
            tips.push(slide.tip || '');
            polls.push(slide.poll || '');
            return slide.src;
        });

        this.setState({
            slides: slides,
            tips: tips,
            polls: polls,
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
        this.trigger('init-services', mode);
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
        this.trigger('reset-poll');
    },

    onPrev() {
        var prev = this.state.current - 1;
        if (prev < 0) {
            console.warn('There are no previous slides!');
            return;
        }
        this.trigger('set-slide', prev);
        this.trigger('reset-poll');
    },

    onSetFilip() {
        this.setState({
            mode: 'attendee',
            isFilip: true
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

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}


streamingControlServiceAtendee.setStore(store);


