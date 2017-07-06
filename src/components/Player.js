import React, {Component} from "react";
import Round from './Round'

export default class Player extends Component{
    render () {
        const rounds = this.props.data.rounds.map((r, i) => <Round key={i} data={ r } />)
        console.log("className1: " + this.props.paramClassName1)
        var className = "score " + this.props.paramClassName3;
        var sum = this.props.data.score;
        if (sum == 0) {
            sum = "WIN!";
        }

        return <div className={this.props.paramClassName2}>
            <div className={className}>
                <div className="header">{ this.props.data.name}</div>
                <div className="sum">{ sum }</div>
                <div className="table-container">
                    {rounds}
                </div>
            </div>
        </div>

    }
}