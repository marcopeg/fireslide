/**
 * FireSlide - MainUI
 * define which UI to display based on the "mode" property.
 * forward other properties as they're needed by the sub-components.
 */

var React = require('react');
var Show = require('show');
var Remote = require('remote');
var Attendee = require('attendee');

module.exports = React.createClass({
    render() {
        switch (this.props.mode) {
            case 'show':
                return (
                    <Show 
                        syncing={this.props.syncing}
                        slides={this.props.slides} 
                        current={this.props.current} 
                        transition={this.props.transition}
                        />
                );

            case 'remote':
                return (
                    <Remote 
                        slides={this.props.slides} 
                        tips={this.props.tips} 
                        current={this.props.current} 
                        useTouch={this.props.useTouch}
                        tipHeight={this.props.tipHeight}
                        tipIsResizing={this.props.tipIsResizing}
                        voteGood={this.props.voteGood}
                        voteBored={this.props.voteBored}
                        votePanic={this.props.votePanic}
                        />
                );

            case 'attendee':
                return (
                    <Attendee 
                        syncing={this.props.syncing}
                        slides={this.props.slides} 
                        current={this.props.current} 
                        transition={this.props.transition}
                        />
                );
        }

        return null;
    }
});
