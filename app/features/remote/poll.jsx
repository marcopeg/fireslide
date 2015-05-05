/**
 * FireSlide - Remote Info Bar
 *
 */

var React = require('react');
var TouchClick = require('elements/touch-click');
var store = require('app/store');

module.exports = React.createClass({

    propTypes: {
        started: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            started: false
        };
    },

    getInitialState() {
        return {
            started: this.props.started,
            data: this.props.data
        };
    },

    componentWillReceiveProps(props) {
        if(props.data.question !== this.state.data.question) {
            this.setState({data: props.data});
        }
        if(props.started !== this.state.started) {
            this.setState({started: props.started});
        }
    },

    _onClick() {
        if(!this.state.started) {
            store.trigger('init-poll', this.state.data);
            this.setState({started: true});
        }
        else {
            store.trigger('reset-poll');
            this.setState({started: false});            
        }
    },

    render() {

        var className = 'poll-button';
        if(this.state.started) {
            className += ' is-running';
        }

        return (

            <TouchClick className={className} onAction={this._onClick}>
                <span>{this.state.started ? '!' : '?'}</span>
            </TouchClick>
        );
    }

});
