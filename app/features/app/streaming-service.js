var OT = require('../../assets/opentok-2.5.1/opentok.min');

var apiKey = '45227762';
var sessionId = '2_MX40NTIyNzc2Mn5-MTQzMDczMzIxMzIzOX5hRFBiNTdwbGRVNEtlejltVVpWaUp1TTZ-fg';
var token = 'T1==cGFydG5lcl9pZD00NTIyNzc2MiZzaWc9NzZhZGUzNmJiMjVhMjI1Zjc1MGEwMzNkYWJlZWJmYmViODY4NjA4Yjpyb2xlPXB1Ymxpc2hlciZzZXNz' +
'aW9uX2lkPTJfTVg0ME5USXlOemMyTW41LU1UUXpNRGN6TXpJeE16SXpPWDVoUkZCaU5UZHdiR1J' +
'WTkV0bGVqbHRWVnBXYVVwMVRUWi1mZyZjcmVhdGVfdGltZT0xNDMwNzMzMjI0Jm5vbmNlPTAuNzIzMTU0ODM2NTEyNzc2MyZleHBpcmVfdGltZT0xNDMzMzIyODIzJmNvbm5lY3Rpb25fZGF0YT1k';
var _session = OT.initSession(apiKey, sessionId);

module.exports = {
    startPublisherSession: function() {
        _session.connect(token, function(error) {
            if (error) {
                console.log(error.message);
            } else {
                _session.publish('publisherDiv', {width: 320, height: 240});
            }
        });
    },

    startSubscriberSession: function() {
        _session.connect(token, function(error) {
            if (error) {
                console.log(error.message);
            }
        });
        _session.on({
            streamCreated: function(event) {
                _session.subscribe(event.stream, 'subscriberDiv', {insertMode: 'append'});
            }
        });


    }
};
