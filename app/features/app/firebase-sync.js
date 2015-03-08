
var Firebase = require('firebase');

module.exports = {
    init: function() {
        var store = this.store;
        var currentSlide = new Firebase('https://fireslide.firebaseio.com/currentSlide');
        
        currentSlide.on('value', function(snapshot) {
            store.trigger('set-slide', snapshot.val());
            store.trigger('sync-status', true);
        });

        // remote behaviour: update back from state to remote sync point
        store.emitter.on('state-changed', function(state) {
            if ('remote' === state.mode) {
                currentSlide.set(state.current);
            }
        });

    }
};