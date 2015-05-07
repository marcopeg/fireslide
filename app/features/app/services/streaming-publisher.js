
var freeSDK = require('../../../g2mfree-sdk/G2MFreeSDK');

function onPeerJoined(stream, streamId) {
    var elm = document.createElement('video');
    var elmTarget = document.getElementById('attendeeStreamingTarget');

    elm.autoplay = 'true';
    elm.id = streamId;

    elmTarget.appendChild(elm);

    attachMediaStream(elm, stream);
}

module.exports = {
    start: function() {
        freeSDK.join('fireslide123').catch(function(err) {
            console.log(err);
        });

        freeSDK.signals.onLocalStreamAvailabile.add(onPeerJoined);
    },

    stop: function() {
        freeSDK.leave().then(function() {
            document.getElementById('local').remove();
        });
    },

    dispose: function() {
        this.stop();
    }
};
