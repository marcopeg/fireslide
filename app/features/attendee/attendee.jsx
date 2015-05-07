/**
 * FireSlide - AttendeeUI
 *
 */

var router = require('jqb-router');
var store = require('app/store');

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TouchClick = require('elements/touch-click');
var Slide = require('elements/slide');
var Loading = require('elements/loading');
var Vote = require('./vote');
var Poll = require('./poll');

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

    componentDidMount() {
        document.body.addEventListener('keypress', this._onKeyPress);
    },

    componentWillUnmount() {
        document.body.removeEventListener('keypress', this._onKeyPress);
    },

    _onKeyPress(e) {
        switch (e.which) {
            case 112:
            case 32:
                return router.navigate('/show');
        }
    },

    _raiseHand() {
        // store.trigger('hand', true);
        // store.trigger('request-session', true);
    },

    _toggleRaisedHand() {
        store.trigger('toggle-hand');
    },

    render() {

        var slide = null;
        var hand = null;
        var poll = null;
        var src = this.props.slides[this.props.current];

        if (this.props.syncing) {
            slide = <Slide key={src} src={src} />;
            if (this.props.transition) {
                slide = <ReactCSSTransitionGroup transitionName={this.props.transition} children={slide} />;
            }
        }

        // raised hand placeholder
        var handClass = 'raise-hand';
        if (store.getState('handIsUp')) {
            handClass += ' raise-hand-pending';
        }

        hand = <span key="hadsup" className={handClass} />;
        
        if (store.getState('showPoll') && this.props.currentPoll) {
            poll = <Poll data={this.props.currentPoll} />;
        }

        var streamingClassName = '';
        if (this.props.isStreaming) {
            streamingClassName = 'active';
        }

        return (
            <div key="attendeeUi">
                <div key="streamingUi" id="streamingUi" className={streamingClassName}>
                    <div id="attendeeStreamingTarget"></div>
                    <button className="end-streaming" onClick={this._toggleRaisedHand}>Stop Streaming</button>
                </div>
                <TouchClick onAction={this._toggleRaisedHand} >
                    {slide}
                    {hand}
                </TouchClick>
                <div className="vote-panel">
                    <Vote value="panic" />
                    <Vote value="bored" />
                    <Vote value="good" />
                </div>
                {poll}
                <Loading visible={!this.props.syncing} />
            </div>
        );
    }

});
