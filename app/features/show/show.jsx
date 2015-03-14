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
        syncing: React.PropTypes.bool.isRequired,
        transition: React.PropTypes.oneOf([null, 'fade', 'h-slide', 'v-slide'])
    },
    
    getDefaultProps() {
        return {
            slides: [],
            current: 0,
            syncing: false,
            transition: 'fade'
        };
    },

    _fullScreen() {
        var slideshow = this.refs['slideshow'].getDOMNode();
        if (slideshow.requestFullscreen) {
            slideshow.requestFullscreen();
        } else if (slideshow.msRequestFullscreen) {
            slideshow.msRequestFullscreen();
        } else if (slideshow.mozRequestFullScreen) {
            slideshow.mozRequestFullScreen();
        } else if (slideshow.webkitRequestFullscreen) {
            slideshow.webkitRequestFullscreen();
        }
    },

    render() {

        var slide = null;
        var src = this.props.slides[this.props.current];

        if (this.props.syncing) {
            slide = <Slide key={src} src={src} />;
            if (this.props.transition) {
                slide = <ReactCSSTransitionGroup transitionName={this.props.transition} children={slide} />;
            }
        }

        return (
            <div ref="slideshow" onClick={this._fullScreen}>
                {slide}
                <Loading visible={!this.props.syncing} />
            </div>
        );
    }

});
