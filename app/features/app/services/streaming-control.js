var Firebase = require('firebase');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var dbUrl = 'https://fireslide.firebaseio.com';
var db = new Firebase(dbUrl);

function StreamingControlService() {
    EventEmitter.call(this);
    var streams = db.child('streams');
    this._stream = streams.push({
        active: false,
        publish: false,
        time: Date.now()
    });

    this._stream.child('publish').on('value', function(snap) {
        var publish = snap.val();
        var eventName = publish ? 'sessionStarted' : 'sessionStopped';
        this.emit(eventName);
    }.bind(this));

    this._stream.child('active').on('value', function(snap) {
        this.emit('sessionActive', snap.val());
    }.bind(this));

    this.ClientID = this._stream.key();
}

util.inherits(StreamingControlService, EventEmitter);

StreamingControlService.prototype.requestSession = function() {
    this._stream.child('active').set(true);
};

StreamingControlService.prototype.abortSession = function() {
    this._stream.child('active').set(false);
};

module.exports = StreamingControlService;
