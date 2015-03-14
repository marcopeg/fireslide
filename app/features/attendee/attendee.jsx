/**
 * FireSlide - AttendeeUI
 *
 */

var router = require('jqb-router');

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Slide = require('elements/slide');
var Loading = require('elements/loading');
var Vote = require('./vote');

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
            <div>
                {slide}
                <div className="vote-panel">
                    <Vote value="good" />
                    <Vote value="bored" />
                    <Vote value="panic" />
                </div>
                <Loading visible={!this.props.syncing} />
            </div>
        );
    }

});
