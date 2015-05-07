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
var Action = require('./action');

module.exports = React.createClass({

    // propTypes: {
    //     slides: React.PropTypes.array.isRequired,
    //     current: React.PropTypes.number.isRequired,
    //     syncing: React.PropTypes.bool.isRequired,
    //     transition: React.PropTypes.oneOf([null, 'fade', 'h-slide', 'v-slide'])
    // },

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
        initAnimations.call(this);
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

    _toggleRaisedHand(e) {
        store.trigger('toggle-hand');
    },

    _vote(voteType) {
        console.log(voteType);
        store.trigger('vote', voteType);
    },

    _action(type) {
        if(type === 'question') {
            store.trigger('toggle-hand');
        }
        else {
            store.trigger('vote', type);
        }
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
        
        if (store.getState('showPoll') && this.props.currentPoll) {
            poll = <Poll data={this.props.currentPoll} />;
        }

        var raisedHandClass = 'attendee-action attendee-question';
        if (store.getState('handIsUp')) {
            raisedHandClass += ' is-active';
        }

        var actions = {
            'bored': {
                image: 'Elaborate',
                text: 'Please, elaborate',
                duration: 3000 - 1000,
            },
            'panic': {
                image: 'MoveOn',
                text: 'Move on... zZzZz',
                duration: 5660 - 500,
            },
            'good': {
                image: 'Like',
                text: 'Yes! I love it!',
                duration: 2000 - 300,
            },
            'question': {
                image: 'PickMe',
                text: 'Oh! Pick me, pick me',
                duration: 2000
            }
        };
        var actionItems = [];
        var action, actionRef;
        this.actionRefs = [];
        for(var name in actions) {
            action = actions[name];
            this.actionRefs.push({name: 'attendee-action-' + name, duration: action.duration});
            actionItems.push(
            <TouchClick 
                key={'attendee-action-' + name} 
                className={'attendee-action attendee-' + name} 
                onAction={this._action.bind(this, name)}>
                <Action image={action.image} ref={'attendee-action-' + name} /> 
                <span className="action-avatar-bg"></span>
                <span className="action-text">{action.text}</span>
            </TouchClick>
            );
        }

        var streamingClassName = '';
        if (this.props.isStreaming) {
            streamingClassName = 'active';
        }

        return (
            <div key="attendeeUi" className="attendee-ui">
                <div key="streamingUi" id="streamingUi" className={streamingClassName}>
                    <div id="attendeeStreamingTarget"></div>
                    <button className="end-streaming" onClick={this._toggleRaisedHand}>Stop Streaming</button>
                </div>
                <SlideHeader 
                    conference={this.props.meta.conference} 
                    title={this.props.meta.title}
                    speaker={this.props.meta.speaker}
                    twitter={this.props.meta.twitter} />
                <div className="attendee-actions">{actionItems}</div>
                {poll}
                <Loading visible={!this.props.syncing} />
            </div>
        );
    }

});

var lastIndex;
var animatingAction;
var timeBetweenAnimations = 3000;
var initAnimations = function() {
    window.setTimeout(function() {
        startAnimation.call(this);
    }.bind(this), timeBetweenAnimations);
};

var getRandomItem = function(arr) {
    var index;
    do {
        index = Math.floor(Math.random()*arr.length);
    } while(index == lastIndex);
    lastIndex = index;
    return arr[index];
};

var startAnimation = function() {
    stopAnimation();

    var ref = getRandomItem(this.actionRefs);
    animatingAction = ref.name;
    if(this.refs[animatingAction]) {
        this.refs[animatingAction].startAnimation();
    }

    window.setTimeout(function() {
        stopAnimation.call(this);
    }.bind(this), ref.duration);

    window.setTimeout(function() {
        startAnimation.call(this);
    }.bind(this), (ref.duration + timeBetweenAnimations));
};

var stopAnimation = function() {
    if(animatingAction && this.refs[animatingAction]) {
        this.refs[animatingAction].stopAnimation();
        animatingAction = null;
    }
};
