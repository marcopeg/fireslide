/**
 * FireSlide
 * deck of slides
 *
 * the responsibility here is to show a single slide
 * given the list of slides and the index of the current one.
 *
 * it can be as a simple component as it is coded in this step, 
 * but it may evolve into a more sophisticated piece of UI which
 * is capable to handle transitions between slides.
 *
 * the important concept is that the external API (the props)
 * are not going to change even if the internal behaviour does.
 */

var React = require('react');
var Slide = require('./slide');

module.exports = React.createClass({
    
    propTypes: {
        slides: React.PropTypes.array.isRequired,
        currentSlideIndex: React.PropTypes.number.isRequired,
        onClick: React.PropTypes.func
    },
    
    getDefaultProps() {
        return {
            slides: [],
            current: 0
        };
    },

    render() {
        return <Slide src={this.props.slides[this.props.currentSlideIndex]} onClick={this.props.onClick} />;
    }

});
