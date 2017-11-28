import React, { Component } from 'react';
import Websocket from 'react-websocket';

import {connect} from "react-redux";
import {insertScore, startGame, winGame} from "../actions/Actions";
import Player from "./Player";

class App extends Component {
    constructor() {
        super();

        const boardIdMatcher = new RegExp("/game/501/(.*)");
        const res = boardIdMatcher.exec(document.location.href);
        let boardId = null;
        if (res) {
            boardId = res[1];
        }

        let proxyPort = window.location.port;
        if (proxyPort === "3000") {
            proxyPort = "9000";
        }

        this.state = {
            boardId: boardId,
            proxyPort: proxyPort
        }
    }

    onMessage = (message) => {
        let parsedMessage = JSON.parse(message);
        if (parsedMessage.command === 'start' || parsedMessage.command === 'started' || parsedMessage.command === 'refresh_game') {
            if (parsedMessage.game.gameType === "x01") {
                this.props.dispatch(startGame(parsedMessage));
            } else {
                document.location.href="/game/scoreboard/" + this.state.boardId;
            }
        } else if (parsedMessage.command === 'restart') {
            document.location.href="/game/scoreboard" + this.state.boardId;
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
            var row3class = "one_person";
            if (i === sv.game.currentPlayer && sv.players.length > 1) {
                row3class = "one_person active_person";
            }
            var id = "player" + i
            return <Player paramClassName2={row2class} paramClassName3={row3class} data={p} key={id} onWin={this.onWinGame.bind(this)} winner={sv.game.winner} roundCount={sv.players[0].rounds.length}/>
        });
        var stat = 0;
        if (sv.game.throwCount > 0) {
            stat = (sv.game.throwCount - sv.game.editedCount) / sv.game.throwCount;
            stat = "" + (Math.round(stat * 100)) + "% (" + sv.game.throwCount + "/" + sv.game.editedCount + ")";
        }

        let proxyPort = window.location.port;
        if (proxyPort === "3000") {
            proxyPort = "9000";
        }

        return (
            <div id="scoreboard" className="container-fluid">
                <div className="row title">{ sv.game.name }</div>

                <div className="row no-gutter">
                {players}
                </div>
                <div id="stat">{ stat }</div>
                {/*<div id="imind"><img src={require('../assets/iMind.png')} alt="iMind" /></div>*/}

                <Websocket url={'ws://'+window.location.hostname+':' + this.state.proxyPort + '/ws/' + this.state.boardId} onMessage={this.onMessage}/>
            </div>
        );
    }
}

App = connect((store) => {
    return store
})(App);


export default App;
