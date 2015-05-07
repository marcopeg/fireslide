/*
we don't load OpenTok on iOS devices for now
*/

var OT = require('opentok');
function noop() {}

if (OT) {

    var config = require('./opentok-config');

    var _session = OT.initSession(config.apiKey, config.sessionId);

    module.exports = {
        start: function() {
            _session.connect(config.token, function(error) {
                if (error) {
                    console.log(error.message);
                } else {
                    _session.publish('attendeeStreamingTarget', {width: 520, height: 240});
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



} else {

    module.exports = {
        start: noop,
        stop: noop,
        dispose: noop
    };
}