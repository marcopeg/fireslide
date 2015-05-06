/**
 * FireSlide - Remote Slide Button
 *
 */

var React = require('react');

module.exports = React.createClass({
    getDefaultProps() {
        return {
            height: 0,
            offset: 0
        };
    },
    render() {
        var className = 'slide-tip';
        var style = {
            top: this.props.offset + 'px',
            height: this.props.height + '%'
        };

        if (this.props.isResizing) {
            className += ' resizing';
        }

        return (
            <div className={className} style={style}>
                <div className="inner" dangerouslySetInnerHTML={{__html:this.props.text}} />
            </div>
        );
    }

});
