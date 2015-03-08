/**
 * FireSlide - Remote
 *
 */

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Slide = require('elements/slide');
var SlideButton = require('./slide-button');
var SlideTip = require('./slide-tip');

// store is a singletone so you get the very same object
// everywehere you reference it!
var store = require('app/store');

module.exports = React.createClass({
    
    propTypes: {
        slides: React.PropTypes.array.isRequired,
        tips: React.PropTypes.array.isRequired,
        current: React.PropTypes.number.isRequired
    },
    
    getDefaultProps() {
        return {
            slides: [],
            current: 0
        };
    },
    
    _onClick() {
        store.trigger('next');
    },

    render() {

        var currentSrc = this.props.slides[this.props.current];
        var prev = null;
        var next = null;

        var tipText = null;
        var tipHeight = 0;
        var slideHeight = 100;

        if (this.props.current < this.props.slides.length - 1) {
            next = <SlideButton key="cmd-next" action="next" src={this.props.slides[this.props.current+1]} />;
        }

        if (this.props.current > 0) {
            prev = <SlideButton key="cmd-prev" action="prev" src={this.props.slides[this.props.current-1]} />;
        }

        if (this.props.tips[this.props.current]) {
            tipText = this.props.tips[this.props.current];
            tipHeight = 25;
            slideHeight -= tipHeight;
        }

        return (
            <ReactCSSTransitionGroup transitionName="fade">
                <Slide key={currentSrc} src={currentSrc} onClick={this._onClick} height={slideHeight} />
                <SlideTip text={tipText} height={tipHeight} />
                {prev}
                {next}
            </ReactCSSTransitionGroup>
        );
    }

});
