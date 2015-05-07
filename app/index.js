/**
 * FireSlide
 * =========
 *
 */

var React = require('react');
var store = require('app/store');
var App = require('app');
var router = require('jqb-router');

// startup touch events handling
React.initializeTouchEvents(true);

// router actions communicate to the app store
router.init({
    '/': function() {
        router.navigate('show');
    },
    '/show': function() {
        store.trigger('change-mode', 'show');
    },
    '/attend': function() {
        store.trigger('change-mode', 'attendee');
    },
    '/remote': function() {
        store.trigger('change-mode', 'remote');
    },
    '/fil': function() {
        store.trigger('set-filip');
    }
});

// fake async slides data loading
setTimeout(function() {
    var presentationData = require('presentation-data');
    store.trigger('set-meta', presentationData.meta);
    store.trigger('new-slides', presentationData.slides);
    store.trigger('set-transition', presentationData.transition);
});

// render the main UI entry point
React.render(
    React.createElement(App), 
    document.getElementById('app')
);

// fade out the loading curtain
setTimeout(function() {
    var curtain = document.getElementById('curtain');
    curtain.addEventListener('webkitTransitionEnd', function() {
        document.body.removeChild(curtain);
    });
    curtain.classList.add('active');
}, 100);

// Public API
// particularly useful during development
module.exports = {
    setMode(mode) {
        router.navigate(mode);
    },
    setTransition(transition) {
        store.trigger('set-transition', transition);
    },
    setTipHeight(val) {
        store.trigger('set-tip-height', val);
    }
};
