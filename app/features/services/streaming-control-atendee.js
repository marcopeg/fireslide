// var Firebase = require('firebase');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var firebaseService = require('./firebase');
var db = firebaseService.getDb();
// var dbUrl = 'https://fireslide.firebaseio.com';
// var db = new Firebase(dbUrl);


function StreamingControlServiceAtendee() {
    EventEmitter.call(this);
    this._stream =  db.child('streams').push({
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

util.inherits(StreamingControlServiceAtendee, EventEmitter);

StreamingControlServiceAtendee.prototype.requestSession = function() {
    this._stream.child('active').set(true);
    this._stream.child('isFilip').set(this.__store.getState('isFilip'));
};

StreamingControlServiceAtendee.prototype.abortSession = function() {
    this._stream.child('isFilip').set(this.__store.getState('isFilip'));
    this._stream.set({
        active: false,
        publish: false
    });
};

StreamingControlServiceAtendee.prototype.setStore = function(store) {
    this.__store = store;
};

module.exports = StreamingControlServiceAtendee;
