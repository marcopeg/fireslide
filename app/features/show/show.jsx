/**
 * FireSlide - Show
 *
 */

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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

        var slide = null;
        var src = this.props.slides[this.props.current];

        if (this.props.syncing) {
            slide = (
                <ReactCSSTransitionGroup transitionName="fade">
                    <Slide key={src} src={src} />
                </ReactCSSTransitionGroup>
            );
        }

        return (
            <div>
                {slide}
                <Loading visible={!this.props.syncing} />
            </div>
        );
    }

});
