/**
 * FireSlide
 * slide-header component
 *
 */

var React = require('react');
var TouchClick = require('./touch-click');

module.exports = React.createClass({

    // this is a development helper attribute
    // use it extensively to improve implicit props documentation!
    propTypes: {
        conference: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        speaker: React.PropTypes.string.isRequired,
        twitter: React.PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            conference: '',
            title: '',
            speaker: '',
            twitter: ''
        };
    },
    render() {

        return (
            <div className="slide-header">
                <h2>{this.props.conference}</h2>
                <h1>{this.props.title}</h1>
                <div className="slide-header-speaker">{this.props.speaker}</div>
                <div className="slide-header-twitter">
                    <a href={'http://twitter.com/' + this.props.twitter}>@{this.props.twitter}</a>
                </div>
            </div>
        );

    }
});
