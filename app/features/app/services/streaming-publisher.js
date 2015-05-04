var OT = require('opentok');
var config = require('./opentok-config');

var _session = OT.initSession(config.apiKey, config.sessionId);

module.exports = {
    start: function() {
        console.log('publishing start');
        _session.connect(config.token, function(error) {
            if (error) {
                console.log(error.message);
            } else {
                _session.publish('publisherDiv', {width: 320, height: 240});
            }
        });
    },

    stop: function() {
        console.log('publishing stop');
        _session.disconnect();
    },

    dispose: function() {
        this.stop();
    }
};
