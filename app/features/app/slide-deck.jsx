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

// store is a singletone so you get the very same object
// everywehere you reference it!
var store = require('app-store');

module.exports = React.createClass({
    
    propTypes: {
        slides: React.PropTypes.array.isRequired,
        current: React.PropTypes.number.isRequired
    },
    
    getDefaultProps() {
        return {
            slides: [],
            current: 0
        };
    },

    render() {
        return React.createElement(Slide, {
            src: this.props.slides[this.props.current],

            // user actions are now propagated to the central store
            // as "actions". actions must be accepted by the store.
            onClick: function() {
                store.trigger('next');
            }
        });
    }

});
