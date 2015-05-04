var Firebase = require('firebase');

var dbUrl = 'https://fireslide.firebaseio.com';
var db = new Firebase(dbUrl);

module.exports = {
    requestSession: function () {
        console.log('push stream');
        var streams = db.child('streams');
        streams.push({
            publish: false,
            time: Date.now()
        });
    }
};
