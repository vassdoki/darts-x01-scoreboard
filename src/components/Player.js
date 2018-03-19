import React, {Component} from "react";
import Round from './Round'
import {getFinish} from "../utils/DartseeUtils";
import strings from '../utils/localization'

export default class Player extends Component{
    constructor(props) {
        super(props);
        this.state = {gameFinished: false, lastSum: -1, winner: ""}
    }
    componentDidMount () {
    }
    componentWillReceiveProps(newProps) {
        if (newProps.winner === "needs save" && this.props.winner !== "needs save") {
            this.props.onWin(this.props.data)
        }
    }

    render () {
        const round = this.props.data.rounds[this.props.data.rounds.length - 1];
        const rounds = this.props.data.rounds.map((r, i) => <Round key={i} data={ this.props.data.rounds[this.props.data.rounds.length - i - 1] }/>)
        var sum = this.props.data.score;
        if (sum === 0) {
            sum = "WIN!";
        }

        var emptyRound = ""
        if (this.props.roundCount > this.props.data.rounds.length) {
            emptyRound = <Round key={this.props.roundCount -1} data={ {throws:[]} }/>
        }

        let finish = getFinish(sum);
        let msgClass = "score_msg";
        if (finish === "") {
            finish = <span>&nbsp;</span>
        } else {
            // console.log((finish.match(/ /g) || []).length);
            if (round.throws.length > 0 && round.throws.length < 3 && (finish.match(/ /g) || []).length + 1 > 3 - round.throws.length) {
                finish = " - ";
            }
        }
        if (round.throws.length > 0 && round.throws.length < 3 && !round.valid) {
            finish = strings.bust;
            msgClass = msgClass + " score_msg_bust";
        }

        return <div className={this.props.paramClassName2 + " " + this.props.paramClassName3}>
            <h2 className="name">{ this.props.data.name}</h2>
            <div className="overall_score">{ sum }</div>
            <div className={msgClass}>{ finish }</div>
            <div className="details">
                <table className="table">
                    <thead><tr><th></th><th></th><th></th><th></th></tr></thead>
                    {emptyRound}
                    {rounds}
                </table>
            </div>
        </div>

    }
}