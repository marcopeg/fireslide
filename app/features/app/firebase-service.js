
var Firebase = require('firebase');

var dbUrl = 'https://fireslide.firebaseio.com';
var db = new Firebase(dbUrl);

exports.syncMixin = {
    init: function() {
        console.log('live');
        var store = this.store;

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

        var hands = db.child('raisedHands');
        hands.on('value', function(snap) {
            store.setState('raisedHands', snap.val() || 0);
        });


        // retrieve active streams
        var streams = {};
        db.child('streams').on('child_added', function(snap) {
            snap.ref().on('value', function(snap) {
                streams[snap.key()] = snap.val();
                store.setState('streams', streams);
                store.setState('quickAndDirtyhHackToTriggerUpdate', Date.now());
            });
        });

        // retrieve polls
        var poll = db.child('poll');
        poll.on('value', function(snap) {
            store.setState('showPoll', !!snap.val() || false);
            store.setState('currentPoll', snap.val() || null);
        });

    }
};

exports.vote = function(vote) {
    var votes = db.child('votes');
    votes.push({
        vote: vote,
        time: Date.now()
    });
};

exports.raiseHand = function(isHandUp) {
    var hands = db.child('raisedHands');
    hands.transaction(function(val) {
        if (!val || val < 0) {
            return isHandUp ? 1 : 0;
        }
        if (isHandUp) {
            return val + 1;
        } else {
            return val - 1;
        }
    });
};

exports.resetRaisedHands = function() {
    db.child('raisedHands').set(0);
};

function getVoteProp(vote) {
    return 'vote' + vote.charAt(0).toUpperCase() + vote.slice(1);
}


exports.enableStream = function(streamId) {
    db.child('streams/' + streamId + '/publish').set(true);
};

exports.disableStream = function(streamId) {
    db.child('streams/' + streamId).set({
        active: false,
        publish: false
    });
};

exports.initPoll = function(poll) {
    var dbPoll = db.child('poll');
    var answers = [];
    poll.answers.map(function(answer, i){
        answers[i] = {
            answer: answer, 
            votes: 0
        };
    });
    dbPoll.set({
        question: poll.question,
        answers: answers,
        total: 0
    });
};

exports.updatePoll = function(answer) {
    var dbPoll = db.child('poll');
    dbPoll.child('answers').child(answer.id).child('votes').transaction(function(votes) {
        return votes + 1;
    });
    dbPoll.child('total').transaction(function(total){
        return total + 1;
    });
};

exports.resetPoll = function() {
    db.child('poll').remove();
};
