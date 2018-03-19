import React, { Component } from 'react';
import Websocket from 'react-websocket';

import {connect} from "react-redux";
import {insertScore, startGame, winGame} from "../actions/Actions";
import Player from "./Player";
import strings from '../utils/localization'
import {parseQueryString} from "../utils/DartseeUtils"


class App extends Component {
    constructor() {
        super();

        const urlPart = "501";
        /***********************************************************/
        /*  this is copied to every project, until a nice solution */
        const boardIdMatcher = new RegExp(`/game/${urlPart}/(.*)`);
        const res = boardIdMatcher.exec(document.location.href);
        // TODO: boardId gets the GET parameter also, not very nice
        let boardId = null;
        if (res) {
            boardId = res[1];
        }

        const urlp = parseQueryString(window.location.search);
        let lang = "en";
        if (urlp["lang"] !== undefined) {
            lang = urlp["lang"];
            strings.setLanguage(urlp["lang"]);
        }

        let proxyHost = "";
        let wsUrl = "";
        if (window.location.port === "3000") {
            // running on localhost development environment, connect directly to the local play app
            proxyHost = "http://localhost:9000";
            wsUrl = `ws://localhost:9000/ws/${boardId}`;
        } else {
            if (window.location.port === 80) {
                proxyHost = `http://${window.location.hostname}`;
                wsUrl = `ws://${window.location.hostname}/ws/${boardId}`;
            } else {
                proxyHost = `http://${window.location.hostname}:${window.location.port}`;
                wsUrl = `ws://${window.location.hostname}:${window.location.port}/ws/${boardId}`;
            }
        }
        /* Don't forget to update the state with these variables:
         boardId: boardId,
         proxyHost: proxyHost,
         wsUrl: wsUrl,
         lang: lang
         */
        /***********************************************************/

        this.state = {
            boardId: boardId,
            proxyHost: proxyHost,
            wsUrl: wsUrl,
            lang: lang
        }
    }

    onMessage = (message) => {
        let parsedMessage = JSON.parse(message);
        if (parsedMessage.command === 'start' || parsedMessage.command === 'started' || parsedMessage.command === 'refresh_game') {
            if (parsedMessage.game.gameType === "x01") {
                this.props.dispatch(startGame(parsedMessage));
            } else {
                if (window.location.port !== "3000") {
                    document.location.href = "/game/scoreboard/" + this.state.boardId;
                }
            }
        } else if (parsedMessage.command === 'restart') {
            if (window.location.port !== "3000") {
                document.location.href = "/game/scoreboard" + this.state.boardId;
            }
        } else if (parsedMessage.command === 'insert_throw') {
            this.props.dispatch(insertScore(parsedMessage.throw.score, parsedMessage.throw.modifier, parsedMessage.throw.id, parsedMessage.currentPlayer, parsedMessage.round));
        } else {
            console.log("Unknown message from server");
            console.log(parsedMessage);
        }
    }

    onWinGame = function(player) {
        console.log("on win game")
        this.props.dispatch(winGame(player, this.props.darts, this.state.boardId));
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

        let roundNum = 1;
        if (sv.players !== undefined && sv.players.length > 0 &&  sv.players[0].rounds !== undefined) {
            roundNum = sv.players[0].rounds.length
        }
        return (
            <div id="scoreboard" className="container-fluid">
                <div className="roundNum title">{strings.roundNum}: { roundNum }</div>
                <div className="row title">{ sv.game.name }</div>

                <div className="row no-gutter">
                {players}
                </div>
                <div id="stat">{ stat }</div>
                {/*<div id="imind"><img src={require('../assets/iMind.png')} alt="iMind" /></div>*/}

                <Websocket url={this.state.wsUrl} onMessage={this.onMessage}/>
            </div>
        );
    }
}

App = connect((store) => {
    return store
})(App);


export default App;
