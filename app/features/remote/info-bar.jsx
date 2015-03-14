/**
 * FireSlide - Remote Info Bar
 *
 */

var React = require('react');
var Vote = require('./vote');

module.exports = React.createClass({

    getDefaultProps() {
        return {
            useTouch: false,
            height: 80
        };
    },

    render() {

        var style = {
            height: this.props.height + 'px'
        };

        var tot = this.props.voteGood + this.props.voteBored + this.props.votePanic;
        var widthGood = this.props.voteGood / tot * 100;
        var widthBored = this.props.voteBored / tot * 100;
        var widthPanic = this.props.votePanic / tot * 100;

        if (tot === 0) {
            widthGood = 0;
            widthBored = 0;
            widthPanic = 0;
        }

        return (
            <div className="remote-info" style={style}>
                <Vote type="good" width={widthGood} height={this.props.height} value={this.props.voteGood} />
                <Vote type="bored" width={widthBored} height={this.props.height} value={this.props.voteBored} />
                <Vote type="panic" width={widthPanic} height={this.props.height} value={this.props.votePanic} />
            </div>
        );
    }

});
