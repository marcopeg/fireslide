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
var SlideHeader = require('elements/slide-header');
var Loading = require('elements/loading');
var Vote = require('./vote');
var Poll = require('./poll');

module.exports = React.createClass({

    propTypes: {
        meta: React.PropTypes.object.isRequired,
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

        if (this.props.isStreaming) {
            return (
                <div key="streamingUi">streaming!
                    <div id="attendeeStreamingTarget"></div>
                </div>
            );
        }

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

        return (
            <div key="attendeeUi" className="attendee-ui">
                <SlideHeader 
                    conference={this.props.meta.conference} 
                    title={this.props.meta.title}
                    speaker={this.props.meta.speaker}
                    twitter={this.props.meta.twitter} />
                <div className="attendee-actions">
                    <ul>
                        <li className="attendee-action attendee-confused">
                            <span className="action-avatar"></span>
                            <span className="action-avatar-bg"></span>
                            <span className="action-text">Please, elaborate</span>
                        </li>
                        <li className="attendee-action attendee-sleepy">
                            <span className="action-avatar">
                                <img className="action-avatar-still" src="assets/images/MoveOn_still.png" />
                                <img className="action-avatar-live" src="assets/images/MoveOn_anim.gif" />
                            </span>
                            <span className="action-avatar-bg"></span>
                            <span className="action-text">Move on... zZzZz</span>
                        </li>
                        <li className="attendee-action attendee-excited">
                            <span className="action-avatar"></span>
                            <span className="action-avatar-bg"></span>
                            <span className="action-text">Yes! I love it!</span>
                        </li>
                        <li className="attendee-action attendee-question">
                            <span className="action-avatar">
                                <img className="action-avatar-still" src="assets/images/PickMe_still.png" />
                                <img className="action-avatar-live" src="assets/images/PickMe2.gif" />
                            </span>
                            <span className="action-avatar-bg"></span>
                            <span className="action-text">Oh! Pick me, pick me</span>
                        </li>
                    </ul>
                </div>
            </div>
        );

        /*return (
            <div key="attendeeUi">
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
        );*/
    }

});
