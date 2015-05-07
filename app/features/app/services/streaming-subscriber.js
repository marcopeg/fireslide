var OT = require('opentok');
var config = require('./opentok-config');

var freeSDK = require('../../../g2mfree-sdk/G2MFreeSDK');

var streamIds = {};

function onPeerJoined(stream, streamId) {
    var elm = document.createElement('video');
    var elmDiv = document.createElement('div');

    elmDiv.className = 'subscriberDiv';
    elmDiv.style.position = 'absolute';

    elm.autoplay = 'true';
    elm.id = streamId;

    streamIds[streamId] = true;

    elmDiv.appendChild(elm);
    document.body.appendChild(elmDiv);

    attachMediaStream(elm, stream);
}

function onPeerStopped(streamId) {
    document.getElementById(streamId).remove();

    delete streamIds[streamId];
}

module.exports = {
    start: function() {
        freeSDK.join('fireslide123').catch(function(err) {
            console.log(err);
        });

        freeSDK.signals.onRemoteStreamAvailabile.add(onPeerJoined);
        freeSDK.signals.onRemoteStreamStopped.add(onPeerStopped);
    },

    stop: function() {
        freeSDK.leave().then(function() {
            Object.keys(streamIds).forEach(function(streamId) {
                document.getElementById(streamId).remove();
            });
        });
    },

    dispose: function() {
        this.stop();
    }
};
