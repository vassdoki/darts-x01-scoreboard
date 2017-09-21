import React, { Component } from 'react';
import Websocket from 'react-websocket';

import {connect} from "react-redux";
import {insertScore, startGame, winGame} from "../actions/Actions";
import Player from "./Player";

class App extends Component {
    onMessage = (message) => {
        let parsedMessage = JSON.parse(message);
        if (parsedMessage.command === 'start' || parsedMessage.command === 'started' || parsedMessage.command === 'refresh_game') {
            if (parsedMessage.game.gameType === "x01") {
                this.props.dispatch(startGame(parsedMessage));
            } else {
                document.location.href="/game/scoreboard";
            }
        } else if (parsedMessage.command === 'restart') {
            document.location.href="/game/scoreboard";
        } else if (parsedMessage.command === 'insert_throw') {
            this.props.dispatch(insertScore(parsedMessage.throw.score, parsedMessage.throw.modifier, parsedMessage.throw.id, parsedMessage.currentPlayer, parsedMessage.round));
        } else {
            console.log("Unknown message from server");
            console.log(parsedMessage);
        }
    }

    onWinGame = function(player) {
        console.log("on win game")
        this.props.dispatch(winGame(player));
    }

    render() {
        var sv = this.props.darts;

        var rowClass = "row ";
        if (sv.players.length < 3) {
            rowClass += " lessThan3Player";
        } else if (sv.players.length > 4) {
            rowClass += " moreThan4Player";
        }
        var row2class = "col-xs-6 ";
        switch(sv.players.length) {
            case 1: row2class += "col-xs-offset-3"; break;
            case 3: row2class += "col-sm-4"; break;
            case 4: row2class += "col-sm-3"; break;
            case 5: row2class += "col-sm-4"; break;
            case 6: row2class += "col-sm-4"; break;
            default: break;
        }
        const players = sv.players.map((p, i) => {
            var row3class = "";
            if (i === sv.game.currentPlayer && sv.players.length > 1) {
                row3class = "active";
            }
            var id = "player" + i
            return <Player paramClassName2={row2class} paramClassName3={row3class} data={p} key={id} onWin={this.onWinGame.bind(this)} winner={sv.game.winner} roundCount={sv.players[0].rounds.length}/>
        });
        var stat = 0;
        if (sv.game.throwCount > 0) {
            stat = (sv.game.throwCount - sv.game.editedCount) / sv.game.throwCount;
            stat = "" + (Math.round(stat * 100)) + "% (" + sv.game.throwCount + "/" + sv.game.editedCount + ")";
        }
        // TODO board id not implemented yet!
        return (
            <div id="scoreboard" className="container-fluid">
                <div className="row title">
                    <h1>{ sv.game.name }</h1>
                </div>

                <div className={rowClass}>
                {players}
                </div>
                <div id="stat">{ stat }</div>
                <div id="imind"><img src={require('../assets/iMind.png')} alt="iMind" /></div>

                <Websocket url={'ws://'+window.location.hostname+':9000/ws/1'} onMessage={this.onMessage}/>
            </div>
        );
    }
}

App = connect((store) => {
    return store
})(App);


export default App;
