/**
 * FireSlide
 * Poll component
 *
 */

var React = require('react');
var store = require('app/store');

module.exports = React.createClass({

    propTypes: {
    },
    render() {

        if(!this.props.data) {
            return <div/>;
        }

        this.barRefs = [];
        var bars = [];
        var barTitles = [];
        var ref, barStyle, percentage, opacity, votes;
        var maxVotes = 0;
        this.props.data.answers.map(function(answer) {
            if(answer.votes > maxVotes) {
                maxVotes = answer.votes;
            }
        });
        var barMax = maxVotes; //this.props.data.total;
        this.props.data.answers.map(function(answer, i) {
            ref = 'bar-' + i;
            this.barRefs.push(ref);
            percentage = barMax > 0 ? answer.votes / barMax * 100 : 0;
            opacity = ((percentage / 2 / 100) + 0.5);
            barStyle = {
                width: percentage + '%',
                opacity: opacity
            };
            votes = percentage > 0 ? '(' + answer.votes + ')' : '';
            bars.push(
                <div className="poll-bar">
                    <div className="poll-bar-progress" ref={ref} key={ref} style={barStyle}></div>
                    <div className="poll-bar-title">{answer.answer}</div>
                </div>
            );
        }.bind(this));

        return (
            <div className="poll-overlay">
                <div className="poll-result">
                    <h2 className="poll-title">{this.props.data.question}</h2>
                    <ol className="poll-chart">{bars}</ol>
                </div>
            </div>
        );

    }
});

