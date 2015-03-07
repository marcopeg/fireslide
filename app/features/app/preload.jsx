
var React = require('react');
var store = require('app-store');
var preloadImage = require('utils/preload-image');

module.exports = React.createClass({
    
    propTypes: {
        slides: React.PropTypes.array.isRequired
    },

    getInitialState() {
        return {
            done: 0
        };
    },

    componentWillMount() {
        var self = this;
        this.props.slides.forEach(function(src) {
            preloadImage(src, function(err) {
                if (err) {
                    console.error(err, src);
                    return;
                }
                self.preloadProgress();
            });
        });
    },

    preloadProgress() {
        this.setState({
            done: (this.state.done + 1)
        });
        
        if (this.state.done === this.props.slides.length) {
            setTimeout(function() {
                store.trigger('ready');
            }, 300);
        }
    },

    render() {
        return <p>{this.state.done} / {this.props.slides.length}</p>;
    }

});


