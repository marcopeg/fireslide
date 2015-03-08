/**
 * FireSlide
 * main application entry point
 *
 */

var React = require('react');
var Slide = require('./slide');

// so far we fake the slide deck data
// but consider that this informations should come asynchronously!
var slides = [
    'assets/slides/slides.001.jpg',
    'assets/slides/slides.002.jpg',
    'assets/slides/slides.003.jpg',
    'assets/slides/slides.004.jpg',
    'assets/slides/slides.005.jpg',
    'assets/slides/slides.006.jpg',
    'assets/slides/slides.007.jpg',
    'assets/slides/slides.008.jpg',
    'assets/slides/slides.009.jpg',
    'assets/slides/slides.010.jpg',
];

module.exports = React.createClass({

    // the component "state" is a set of informations that can change from the inside
    getInitialState() {
        return {
            currentSlideIndex: 0
        };
    },

    // handle the click event that has been bubbled out from the Slide component.
    // by changing the component's state we trigger a re-rendering.
    _changeSlide() {
        this.setState({
            currentSlideIndex: this.state.currentSlideIndex + 1
        });
    },

    render() {
        return <Slide src={slides[this.state.currentSlideIndex]} onClick={this._changeSlide} />;
    }

});
