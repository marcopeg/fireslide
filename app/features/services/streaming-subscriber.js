var OT = require('opentok');
var config = require('./opentok-config');

var _session = OT.initSession(config.apiKey, config.sessionId);

module.exports = {
    start: function(store) {
        this._store = store;
        _session.connect(config.token, function(error) {
            if (error) {
                console.log(error.message);
            }
        });
        _session.on({
            streamCreated: function(event) {
                store.setState('isStreaming', true);
                _session.subscribe(event.stream, 'subscriberDiv', {insertMode: 'append'});
            },
            streamDestroyed: function() {
                store.setState('isStreaming', false);
            }
        });
    },

    stop: function() {
        _session.disconnect();
        this._store.setState('isStreaming', false);
    },

    dispose: function() {
        this.stop();
    }
};
