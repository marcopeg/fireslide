/**
 * FireSlide
 * =========
 *
 */

var React = require('react');
var App = require('app');
var store = require('app/store');


/**
 * Mock the Store
 * useful during development
 */
// store.mock({
//     state: {
//         slides: [
//             'assets/slides/slides.001.jpg',
//             'assets/slides/slides.002.jpg',
//             'assets/slides/slides.003.jpg'
//         ],
//         cached: 2
//     },
//     actions: true
// });


// fake async slides data loading
setTimeout(function() {
    var presentationData = require('presentation-data');
    store.trigger('new-slides', presentationData);
});

// render the main UI entry point
React.render(
    React.createElement(App), 
    document.getElementById('app')
);

// fade out the loading curtain
setTimeout(function() {
    var curtain = document.getElementById('curtain');
    curtain.addEventListener('webkitTransitionEnd', function() {
        document.body.removeChild(curtain);
    });
    curtain.classList.add('active');
}, 100);

// Public API
// particularly useful during development
module.exports = {
    test: function() {
        console.log('thisi is the public API: "test()"');
    }
};


