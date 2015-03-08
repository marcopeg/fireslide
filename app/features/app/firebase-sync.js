
var Firebase = require('firebase');

module.exports = {
    init: function() {
        var store = this.store;

        var db = new Firebase('https://fireslide.firebaseio.com');
        var currentSlide = db.child('currentSlide');
        var firstVal = false;
        
        // sync firebase -> app-store
        currentSlide.on('value', function(snapshot) {
            store.trigger('set-slide', snapshot.val());
            store.trigger('sync-status', true);
            firstVal = true;
        });

        // keep the connection status update after the first value has 
        // been downloaded into the data store
        db.child('.info/connected').on('value', function(connectedSnap) {
            if (!firstVal) {
                return;
            }
            store.trigger('sync-status', connectedSnap.val() === true);    
        });

        // remote behaviour: update back from state to remote sync point
        store.emitter.on('state-changed', function(state) {
            if ('remote' === state.mode) {
                currentSlide.set(state.current);
            }
        });

    }
};