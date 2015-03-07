/**
 * FireSlide
 * main application entry point
 *
 */

var React = require('react');
var Slide = require('./slide');

module.exports = React.createClass({
    render() {

        // Slide component can be reused with differend attributes
        // to display different slides
        return <Slide src="assets/slides/slides.009.jpg" />;
        
    }
});
