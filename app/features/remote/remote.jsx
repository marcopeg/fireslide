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
var InfoBar = require('./info-bar');
var Hands = require('./hands');
var StreamsController = require('./streams-controller');
var Poll = require('./poll');

// store is a singletone so you get the very same object
// everywehere you reference it!
var store = require('app/store');

module.exports = React.createClass({
    
    // propTypes: {
    //     slides: React.PropTypes.array.isRequired,
    //     tips: React.PropTypes.array.isRequired,
    //     current: React.PropTypes.number.isRequired,
    //     useTouch: React.PropTypes.bool.isRequired
    // },
    
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

        // still doesn't work perfectly!
        pos += this.props.infoBarHeight;

        height = (pos - this.props.infoBarHeight) * 100 / window.innerHeight;
        store.trigger('set-tip-height', height);
    },

    render() {

        var currentSrc = this.props.slides[this.props.current];
        var prev = null;
        var next = null;
        var hands = null;
        var poll = null;

        var tipText = null;
        var tipHeight = 0;
        var tipResizer = null;
        var slideHeight = 100;

        var infoBarHeight = this.props.infoBarHeight;
        if (this.props.voteGood + this.props.voteBored + this.props.votePanic === 0) {
            infoBarHeight = 0;
        }

        if (this.props.current < this.props.slides.length - 1) {
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

        if (this.props.tips[this.props.current]) {
            tipText = this.props.tips[this.props.current];
            tipHeight = this.props.tipHeight;
            slideHeight -= tipHeight;

            tipResizer = (
                <SlideTipResizer 
                    position={tipHeight} 
                    offset={infoBarHeight}
                    useTouch={this.props.useTouch}
                    onStart={this._onResizeStart}
                    />
            );
        }

        if (this.props.raisedHands) {
            hands = (
                <Hands key="raised-hands">
                    <i>{this.props.raisedHands}</i>
                </Hands>
            );
        }

        if (this.props.polls[this.props.current]) {
            poll = <Poll started={store.getState('showPoll')} data={this.props.polls[this.props.current]} />;
        }

        var remote = (
            <ReactCSSTransitionGroup transitionName="fade">
                <Slide 
                    key={currentSrc} 
                    src={currentSrc} 
                    onClick={this._onClick} 
                    height={slideHeight} 
                    offset={infoBarHeight}
                    isAnimated={!this.props.tipIsResizing}
                    />
                <SlideTip 
                    text={tipText} 
                    height={tipHeight}
                    offset={infoBarHeight}
                    isResizing={this.props.tipIsResizing}
                    />
                <InfoBar 
                    height={infoBarHeight} 
                    voteGood={this.props.voteGood}
                    voteBored={this.props.voteBored}
                    votePanic={this.props.votePanic}
                    />
                <StreamsController 
                    streams={this.props.streams} 
                    position={tipHeight} 
                    />
                {hands}
                {tipResizer}
                {prev}
                {poll}
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
