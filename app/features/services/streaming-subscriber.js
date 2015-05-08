var freeSDK = require('../../g2mfree-sdk/G2MFreeSDK');

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
    start: function(store) {
        freeSDK.join('fireslide124').catch(function(err) {
            console.log(err);
        });

        freeSDK.signals.onRemoteStreamAvailabile.add(onPeerJoined);
        freeSDK.signals.onRemoteStreamAvailabile.addOnce(function() { store.setState('isStreaming', true); });
        freeSDK.signals.onRemoteStreamStopped.add(onPeerStopped);
        freeSDK.signals.onRemoteStreamStopped.addOnce(function() { store.setState('isStreaming', false); });
    },

    stop: function(store) {
        freeSDK.leave().then(function() {
            Object.keys(streamIds).forEach(function(streamId) {
                document.getElementById(streamId).remove();
            });
            store.setState('isStreaming', false);
        });
    },

    dispose: function() {
        this.stop();
    }
};
