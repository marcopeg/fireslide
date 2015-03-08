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

    getDefaultProps() {
        return {
            useTouch: false
        };
    },

    _onClick() {
        if (true !== this.touched) {
            this.props.onClick();
        }
    },

    _onTouchStart() {
        this.props.onClick();
        this.touched = true;

        clearTimeout(this._touched);
        this._touched = setTimeout(function() {
            this.touched = false;
        }.bind(this), 301);
    },

    render() {
        
        var style = {
            backgroundImage: 'url(' + this.props.src + ')',
            height: this.props.height + '%'
        };

        if (this.props.useTouch) {
            return <div className="slide" style={style} onTouchStart={this.props.onClick} />;
        } else {
            return <div className="slide" style={style} onClick={this.props.onClick} />;
        }

    }
});
