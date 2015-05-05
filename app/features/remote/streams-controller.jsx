/**
 * FireSlide - Streams Controller
 *
 */

var React = require('react');
var TouchClick = require('elements/touch-click');
var firebaseService = require('../app/firebase-service');

module.exports = React.createClass({

    getDefaultProps() {
        return {
            streams: [],
            position: null
        };
    },

    _onClick(stream) {
        if (stream.publish) {
            firebaseService.disableStream(stream.id);
        } else {
            firebaseService.enableStream(stream.id);
        }
    },

    render() {

        var style = {};
        if (this.props.position) {
            style.top = this.props.position + '%';
        }

        var streamsObj = this.props.streams;
        var streamsId = Object.keys(streamsObj);

        var streams = streamsId.filter(function(streamId) {
            return streamsObj[streamId].active === true;
        }).map(function(streamId) {
            var stream = streamsObj[streamId];
            stream.id = streamId;

            var className = 'stream-btn';
            if (stream.publish) {
                className += ' streaming-btn';
            }

            return (
                <TouchClick 
                    key={streamId} 
                    className={className}
                    onAction={this._onClick.bind(this, stream)}
                    >{streamId}</TouchClick>
            );
        }.bind(this));

        if (!streams.length) {
            return null;
        }

        return (
            <div className="streams-controller" style={style}>
                {streams}
            </div>
            // <TouchClick className={className} style={style} onAction={this._onClick}>
            //     <span>
            //         {this.props.value}
            //     </span>
            // </TouchClick>
        );
    }

});
