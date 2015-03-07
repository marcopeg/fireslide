/**
 * FireSlide
 * main application entry point
 *
 */

var React = require('react');
var Slide = require('./slide');

module.exports = React.createClass({
    render() {

        // the entire app's UI implements our single instance
        // of a Slide component
        return React.createElement(Slide);
        
    }
});
