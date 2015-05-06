/**
 * FireSlide - Remote
 *
 */

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Slide = require('elements/slide');
var SlideButton = require('./slide-button');

// store is a singletone so you get the very same object
// everywehere you reference it!
var store = require('app/store');

module.exports = React.createClass({
    
    propTypes: {
        slides: React.PropTypes.array.isRequired,
        tips: React.PropTypes.array.isRequired,
        current: React.PropTypes.number.isRequired,
        useTouch: React.PropTypes.bool.isRequired
    },
    
    getDefaultProps() {
        return {
            slides: [],
            current: 0,
            infoBarHeight: 50,
            tipHeight: 25,
            tipIsResizing: false
        };
    },

    componentWillMount () {
        store.trigger('reset-poll');
    },
    
    _onClick() {
        store.trigger('next');
    },

    render() {

        var currentSrc = this.props.slides[this.props.current];
        var nextSrc = null;
        var prev = null;
        var next = null;
        var slideHeight = 100;

        if (this.props.current < this.props.slides.length - 1) {
            nextSrc = this.props.slides[this.props.current+1];
            next = (
                <SlideButton 
                    key="cmd-next"
                    src={this.props.slides[this.props.current+1]}  
                    action="next"
                    />
                );
        }

        if (this.props.current > 0) {
            prev = (
                <SlideButton 
                    key="cmd-prev"
                    src={this.props.slides[this.props.current-1]}  
                    action="prev" 
                    />
            );
        }

        var remote = (
            <ReactCSSTransitionGroup transitionName="fade">
                <Slide 
                    key={currentSrc} 
                    src={nextSrc} 
                    onClick={this._onClick} 
                    
                    isAnimated={!this.props.tipIsResizing}
                    />
                {prev}
            </ReactCSSTransitionGroup>
        );

        if (this.props.useTouch) {
            return (
                <div
                    onTouchEnd={this._onResizeEnd}
                    onTouchMove={this._onResizeHappen}
                    children={remote}
                    />
            );
        } else {
            return (
                <div
                    onMouseUp={this._onResizeEnd}
                    onMouseMove={this._onResizeHappen}
                    children={remote}
                    />
            );
        }
    }

});
