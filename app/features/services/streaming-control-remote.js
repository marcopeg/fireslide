// var Firebase = require('firebase');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// var dbUrl = 'https://fireslide.firebaseio.com';
// var db = new Firebase(dbUrl);

var firebaseService = require('./firebase');
var db = firebaseService.getDb();

function StreamingControlPresentationService() {
    EventEmitter.call(this);
    var self = this;
    var streams = db.child('streams');
    streams.on('child_added', function(snap) {
        var activeRef = streams.child(snap.key() + '/active');
        activeRef.on('value', function(activeSnap) {
            if (!activeSnap.val()) {
                return;
            }
            self.emit('sessionActive', snap.key(), activeSnap.val());
        });
    }.bind(this));
    this._streams = streams;
}

util.inherits(StreamingControlPresentationService, EventEmitter);

StreamingControlPresentationService.prototype.getActiveSessions = function() {
    var result = [];
    this._streams.forEach(function(snap) {
        result.push({
            key: snap.key(),
            value: snap.value()
        });
    });

    return result;
};

StreamingControlPresentationService.prototype.startSession = function(key) {
    this._streams.child(key + '/publish').set(true);
};

StreamingControlPresentationService.prototype.abortSession = function(key) {
    var stream = this._streams.child(key);
    stream.set({
        active: false,
        publish: false
    });
};

module.exports = StreamingControlPresentationService;
