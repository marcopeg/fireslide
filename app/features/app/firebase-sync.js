
var Firebase = require('firebase');

var prod = {
    init: function() {
        console.log('live');
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

/**
 * Fake Mixin
 * it allows to set a particular remote data configuration
 */
var dev = function(settings) {
    
    switch (typeof settings) {
        case 'number':
            settings = {slide:settings};
            break;
        case 'boolean':
            settings = {status:settings};
            break;
    }
    
    if (true === settings || 'object' !== typeof settings) {
        settings = {};
    }

    settings.slide = settings.slide || 0;

    if ([undefined, null].indexOf(settings.status) !== -1) {
        settings.status = true;
    }

    return {
        init: function() {
            var store = this.store;
            store.trigger('set-slide', settings.slide);
            store.trigger('sync-status', !!settings.status);
        }
    };
}; 

module.exports = function(cfg) {
    if (cfg !== undefined) {
        return dev(cfg);
    }
    return prod;
};