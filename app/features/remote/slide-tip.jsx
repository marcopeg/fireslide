/**
 * FireSlide - Remote Slide Button
 *
 */

var React = require('react');

module.exports = React.createClass({
    render() {
        var style = {
            height: this.props.height + '%'
        };
        return (
            <div className="slide-tip" style={style}>
                <div className="inner" dangerouslySetInnerHTML={{__html:this.props.text}} />
            </div>
        );
    }

});
