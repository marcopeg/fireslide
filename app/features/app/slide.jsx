/**
 * FireSlide
 * single slide component
 *
 */

var React = require('react');

module.exports = React.createClass({
    render() {
        
        var style = {
            backgroundImage: 'url(' + this.props.src + ')'
        };
        
        return <div className="slide" style={style} />;

    }
});
