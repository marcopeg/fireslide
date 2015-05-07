/**
 * FireSlide - Live Feedback Button
 *
 */

var React = require('react');

module.exports = React.createClass({
    
    propTypes: {
        image: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            animating: false
        };
    },

    startAnimation() {
        this.setState({animating: true});
    },

    stopAnimation() {
        this.setState({animating: false});
    },

    render() {
        var className = 'action-avatar ' + (this.state.animating ? 'is-animating' : '');
        if(this.state.animating) {
            return (
                <span className={className}>
                    <img className="action-avatar-live" src={'assets/images/' + this.props.image + '_anim.gif'} />
                </span>
            );
        }
        else {
            return (
                <span className={className}>
                    <img className="action-avatar-still" src={'assets/images/' + this.props.image + '_still.png'} />
                </span>
            );
        }
    }

});
