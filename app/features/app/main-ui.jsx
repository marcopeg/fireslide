/**
 * FireSlide - MainUI
 * define which UI to display based on the "mode" property.
 * forward other properties as they're needed by the sub-components.
 */

var React = require('react');
var Show = require('show');
var Remote = require('remote');

module.exports = React.createClass({
    render() {
        switch (this.props.mode) {
            case 'show':
                return (
                    <Show 
                        syncing={this.props.syncing}
                        slides={this.props.slides} 
                        current={this.props.current} 
                        />
                );

            case 'remote':
                return (
                    <Remote 
                        slides={this.props.slides} 
                        current={this.props.current} 
                        />
                );

            case 'attendee':
                return (
                    <div>[attendee module needs yet to build]</div>
                );
        }

        return null;
    }
});
