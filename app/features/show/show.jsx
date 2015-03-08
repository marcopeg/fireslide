/**
 * FireSlide - Show
 *
 */

var React = require('react');
var Slide = require('elements/slide');
var Loading = require('elements/loading');

module.exports = React.createClass({
    
    propTypes: {
        slides: React.PropTypes.array.isRequired,
        current: React.PropTypes.number.isRequired,
        syncing: React.PropTypes.bool.isRequired
    },
    
    getDefaultProps() {
        return {
            slides: [],
            current: 0,
            syncing: false
        };
    },

    render() {
        return (
            <div>
                <Slide src={this.props.slides[this.props.current]} />
                <Loading visible={!this.props.syncing} />
            </div>
        );
    }

});
