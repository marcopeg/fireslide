/**
 * Simple loading overlay
 * is is capable of fading in/out thanks to the CSSTransitionGroup
 */

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
    propTypes: {
        visible: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            visible: true
        };
    },
    render() {
        var content = null;

        if (this.props.visible) {
            content = <div key="loading" className="loading" />;
        }

        return <ReactCSSTransitionGroup transitionName="fade" children={content} />;
    }
});
