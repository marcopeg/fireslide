/**
 * FireSlide
 * single slide component
 *
 */

var React = require('react');
var TouchClick = require('./touch-click');

module.exports = React.createClass({

    // this is a development helper attribute
    // use it extensively to improve implicit props documentation!
    propTypes: {
        onClick: React.PropTypes.func,
        height: React.PropTypes.number,
        offset: React.PropTypes.number,
        isAnimated: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            height: 100,
            offset: 0,
            isAnimated: false
        };
    },
    render() {

        var className = 'slide';
        if (this.props.isAnimated) {
            className += ' animate';
        }

        var style = {
            backgroundImage: 'url(' + this.props.src + ')',
            height: 'calc(' + this.props.height + '% - ' + this.props.offset +  'px)'
        };

        return <TouchClick className={className} style={style} onAction={this.props.onClick} />;

    }
});
