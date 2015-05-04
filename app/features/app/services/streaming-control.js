var Firebase = require('firebase');

var dbUrl = 'https://fireslide.firebaseio.com';
var db = new Firebase(dbUrl);

module.exports = {
    requestSession: function(clientId) {
        var streams = db.child('streams');
        var streamRef = streams.push({
            publish: false,
            time: Date.now()
        });

        return streamRef;
    }
};
