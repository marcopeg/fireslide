/**
 * FireSlide
 * =========
 *
 */

var React = require('react');
var App = require('app');

// render the main UI entry point
React.render(
    React.createElement(App), 
    document.getElementById('app')
);

// fade out the loading curtain
setTimeout(function() {
    document.getElementById('curtain').classList.add('active');
}, 100);

// Public API
// particularly useful during development
module.exports = {
    test: function() {
        console.log('thisi is the public API: "test()"');
    }
};
