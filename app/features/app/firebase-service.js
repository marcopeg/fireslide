
var Firebase = require('firebase');

var dbUrl = 'https://fireslide.firebaseio.com';

exports.syncMixin = {
    init: function() {
        console.log('live');
        var store = this.store;

        var db = new Firebase(dbUrl);
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

        // retreive live feedback and keep it update within the feedback interval
        var timeout = store.getState('feedbackInterval');
        var votes = db.child('votes').orderByChild('time').startAt(Date.now() - timeout);
        votes.on('child_added', function(snap) {
            var key = getVoteProp(snap.val().vote);
            store.setState(key, store.getState(key) + 1);
            setTimeout(function() {
                var val = store.getState(key) - 1;
                if (val < 0) {
                    val = 0;
                }
                store.setState(key, val);
            }, timeout);    
        });

    }
};

exports.vote = function(vote) {
    var votes = new Firebase(dbUrl + '/votes');
    votes.push({
        vote: vote,
        time: Date.now()
    });
};

function getVoteProp(vote) {
    return 'vote' + vote.charAt(0).toUpperCase() + vote.slice(1);
}
