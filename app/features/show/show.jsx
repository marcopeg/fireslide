/**
 * FireSlide - Show
 *
 */

var React = require('react');
var Slide = require('elements/slide');

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
        return <Slide src={this.props.slides[this.props.current]} />;
    }

});
