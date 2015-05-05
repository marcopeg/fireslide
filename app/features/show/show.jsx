/**
 * FireSlide - Show
 *
 */

var router = require('jqb-router');
var store = require('app/store');

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Slide = require('elements/slide');
var Loading = require('elements/loading');
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
        console.log(e);
        switch (e.which) {
            case 102:   // space
            case 32:    // f
                return this._fullScreen();
            case 97:    // a
                return router.navigate('/attend');
        }
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
        //console.log('show render()');
        var slide = null;
        var src = this.props.slides[this.props.current];

        if (this.props.syncing) {
            slide = <Slide key={src} src={src} />;
            if (this.props.transition) {
                slide = <ReactCSSTransitionGroup transitionName={this.props.transition} children={slide} />;
            }
        }

        var poll;
        if(store.getState('showPoll') && this.props.currentPoll) {
            poll = (<Poll data={this.props.currentPoll}/>);
        }

        return (
            <div ref="slideshow" onClick={this._fullScreen}>
                {slide}
                {poll}
                <Loading visible={!this.props.syncing} />
            </div>
        );
    }

});
