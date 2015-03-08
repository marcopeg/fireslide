/**
 * Simple pure UI related component to show a progress bar.
 */

var React = require('react');

module.exports = React.createClass({
    propTypes: {
        width: React.PropTypes.string.isRequired,
        value: React.PropTypes.number.isRequired
    },
    getDefaultProps() {
        return {
            width: '100%',
            value: 0
        };
    },
    render() {
        var styles = {
            outer: {
                width: this.props.width
            },
            inner: {
                width: this.props.value + '%'
            }
        };
        return (
            <span className="progress-bar" style={styles.outer}>
                <span className="progress" style={styles.inner} />
            </span>
        );
    }
});
