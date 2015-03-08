/**
 * FireSlide - Remote
 *
 */

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Slide = require('elements/slide');
var SlideButton = require('./slide-button');
var SlideTip = require('./slide-tip');
var SlideTipResizer = require('./slide-tip-resizer');

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
            tipHeight: 25,
            tipIsResizing: false
        };
    },
    
    _onClick() {
        store.trigger('next');
    },

    _onResizeStart(e) {
        e.preventDefault();
        store.trigger('set-tip-resizing', true);
    },

    _onResizeEnd(e) {
        store.trigger('set-tip-resizing', false);
    },

    _onResizeHappen(e) {
        if (!this.props.tipIsResizing) {
            return;
        }

        var pos = 0;
        var height = 0;

        if (this.props.useTouch) {
            pos = e.nativeEvent.touches[0].pageY;
        } else {
            pos = e.nativeEvent.clientY;
        }

        height = pos * 100 / window.innerHeight;
        store.trigger('set-tip-height', height);
    },

    render() {

        var currentSrc = this.props.slides[this.props.current];
        var prev = null;
        var next = null;

        var tipText = null;
        var tipHeight = 0;
        var tipResizer = null;
        var slideHeight = 100;

        if (this.props.current < this.props.slides.length - 1) {
            next = (
                <SlideButton 
                    key="cmd-next"
                    src={this.props.slides[this.props.current+1]}  
                    action="next" 
                    useTouch={this.props.useTouch}
                    />
                );
        }

        if (this.props.current > 0) {
            prev = (
                <SlideButton 
                    key="cmd-prev"
                    src={this.props.slides[this.props.current-1]}  
                    action="prev" 
                    useTouch={this.props.useTouch}
                    />
            );
        }

        if (this.props.tips[this.props.current]) {
            tipText = this.props.tips[this.props.current];
            tipHeight = this.props.tipHeight;
            slideHeight -= tipHeight;

            tipResizer = (
                <SlideTipResizer 
                    height={tipHeight} 
                    useTouch={this.props.useTouch}
                    onStart={this._onResizeStart}
                    />
            );
        }

        var remote = (
            <ReactCSSTransitionGroup transitionName="fade">
                <Slide 
                    key={currentSrc} 
                    src={currentSrc} 
                    onClick={this._onClick} 
                    height={slideHeight} 
                    useTouch={this.props.useTouch}
                    />
                <SlideTip 
                    text={tipText} 
                    height={tipHeight} 
                    isResizing={this.props.tipIsResizing}
                    />
                {tipResizer}
                {prev}
                {next}
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
