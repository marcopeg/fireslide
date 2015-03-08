/**
 * FireSlide
 * single slide component
 *
 */

var React = require('react');

module.exports = React.createClass({

    // this is a development helper attribute
    // use it extensively to improve implicit props documentation!
    propTypes: {
        onClick: React.PropTypes.func
    },

    render() {
        
        var style = {
            backgroundImage: 'url(' + this.props.src + ')',
            cursor: this.props.onClick ? 'pointer' : 'auto',     // iOS bug!
            height: this.props.height + '%'
        };

        // sometimes good old plain Javascript is way more readable than JSX!
        return React.DOM.div({
            className: 'slide',
            style: style,

            // you can give in a null value here and React will just
            // skip the event binding. yes, it is that simple.
            onClick: this.props.onClick
        });

    }
});
