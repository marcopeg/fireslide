/**
 * FireSlide
 * Poll component
 *
 */

var React = require('react');
var TouchClick = require('elements/touch-click');
var store = require('app/store');

module.exports = React.createClass({

    propTypes: {
    },
    getInitialState() {
        return {
            voted: false,
            answerChosen: false
        };
    },
    _onSubmit(e) {
        var value = getSelectedValue.call(this);
        if(value) {
            store.trigger('update-poll', value);
            //this.setState({voted: true});
        }
    },
    _onClick(e) {
        this.setState({answerChosen: true});
    },
    render() {
        if(this.state.voted) {
            return <div/>;
        }

        this.radioRefs = [];
        var ref;
        var answers = this.props.data.answers.map(function(answer, i) {
            ref = 'answer-' + i;
            this.radioRefs.push(ref);
            return (<li className="poll-answer">
                    <input type="radio" name="poll" id={ref} ref={ref} value={answer.answer} />
                    <label key={i} htmlFor={ref} onClick={this._onClick}>{answer.answer}</label>
                </li>);
        }.bind(this));

        var submitClass = 'poll-submit ' + (this.state.answerChosen ? 'is-visible' : '');
        return (
            <div className="poll-overlay">
                <div className="poll">
                    <h2 className="poll-title">{this.props.data.question}</h2>
                    <ol className="poll-answers">{answers}</ol>
                    <a className={submitClass} onClick={this._onSubmit}>Yes! Submit my answer</a>
                </div>
            </div>
        );

    }
});

function getSelectedValue() {
    var value = null;
    this.radioRefs.map(function(ref, i) {
        if(this.refs[ref].getDOMNode().checked) {
            value = {id: i, value: this.refs[ref].getDOMNode().value};
        }
    }.bind(this));
    return value;
}