import React, {Component} from "react";
import Round from './Round'

export default class Player extends Component{
    constructor(props) {
        super(props);
        this.state = {gameFinished: false, lastSum: -1}
    }
    render () {
        const rounds = this.props.data.rounds.map((r, i) => <Round key={i} data={ r }/>)
        var className = "score " + this.props.paramClassName3;
        var sum = this.props.data.score;
        if (sum === 0) {
            sum = "WIN!";
            if (this.props.winner === "") {
                this.props.onWin(this.props.data)
            }
        }

        var emptyRound = ""
        console.log("roundCount param: " + this.props.roundCount + " sajat count: " + this.props.data.rounds.length)
        if (this.props.roundCount > this.props.data.rounds.length) {
            console.log("van empty round")
            emptyRound = <Round key={this.props.roundCount -1} data={ {throws:[]} }/>
        }

        return <div className={this.props.paramClassName2}>
            <div className={className}>
                <div className="header">{ this.props.data.name}</div>
                <div className="sum">{ sum }</div>
                <div className="table-container">
                    {rounds}
                    {emptyRound}
                </div>
            </div>
        </div>

    }
}