var OT = require('opentok');
var config = require('./opentok-config');

var _session = OT.initSession(config.apiKey, config.sessionId);

module.exports = {
    start: function() {
        _session.connect(config.token, function(error) {
            if (error) {
                console.log(error.message);
            }
        });
        _session.on({
            streamCreated: function(event) {
                _session.subscribe(event.stream, 'subscriberDiv', {insertMode: 'append'});
            }
        });
    },

    stop: function() {
        _session.disconnect();
    },

    dispose: function() {
        this.stop();
    }
};
