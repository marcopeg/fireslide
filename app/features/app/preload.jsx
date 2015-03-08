/**
 * Visual aid that shows the progress in preloading the slides.
 */

var React = require('react');
var ProgressBar = require('elements/progress-bar');

module.exports = React.createClass({
    propTypes: {
        cached: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired
    },
    render() {
        var progress = Math.round(this.props.cached / this.props.total * 100);
        return (
            <div className="slides-preloader">
                {this.props.cached} / {this.props.total}
                <ProgressBar value={progress} />
            </div>
        );
    }
});


