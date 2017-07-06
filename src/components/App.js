import React, { Component } from 'react';
import '../assets/App.css';

import {connect} from "react-redux";
import {insertScore, startGame} from "../actions/Actions";
import Player from "./Player";

class App extends Component {
    addThrow() {
        this.props.dispatch(insertScore(document.getElementById("num").value, document.getElementById("mod").value));
    }
    startGame() {
        var config = {
            "game":
                {"id":"df161532-240b-4d55-9929-145c1ffe53b6",
                    "name":"501",
                    "players":
                        [
                            {"id":"9c344c61-b026-4c5e-a517-058c193c8f17",
                                "name":"Klári",
                                "rounds":[
                                    {"id":"c2f151fa-e6eb-46f7-baad-1a7c39de2335",
                                        "throws":[
                                            {"id":"84aed4d3-e50e-4b4f-b2d0-119cbd6ed163",
                                                "score":20,
                                                "modifier":1,
                                                "time":"2017-07-06T17:13:42.530855383Z"},
                                            {"id":"84aed4d3-e50e-4b4f-b2d0-119cbd6ed163",
                                                "score":20,
                                                "modifier":2,
                                                "time":"2017-07-06T17:13:42.530855383Z"},
                                            {"id":"84aed4d3-e50e-4b4f-b2d0-119cbd6ed163",
                                                "score":20,
                                                "modifier":0,
                                                "time":"2017-07-06T17:13:42.530855383Z"}
                                        ]
                                    }
                                ]
                            },
                            {"id":"fbacd9ba-864d-4da6-8a9f-defd297325d7",
                                "name":"Péter",
                                "rounds":[]
                            },
                            {"id":"238387bd-ee8d-4ef6-9270-6bafa5a9414c",
                                "name":"Doki",
                                "rounds":[]
                            },
                        ],
                },
            "status":1
        };
        this.props.dispatch(startGame(config));
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
        }
        const players = sv.players.map((p, i) => {
            var row3class = ""
            if (i == sv.game.currentPlayerCount && sv.players.length > 1) {
                row3class = "active";
            }
            return <Player paramClassName2={row2class} paramClassName3={row3class} data={p} key={Math.random()}/>
        })
        return (
            <div id="scoreboard" className="container-fluid">
                <div className="row title">
                    <h1>{ sv.game.name }</h1>
                </div>

                <div className={rowClass}>
                {players}
                </div>



                <div className="row">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <p className="App-intro">
                    Num: <input name="num" id="num"/>
                    Mod: <input name="mod" id="mod"/>
                    <button onClick={this.addThrow.bind(this)}>Add Throw</button><br />
                    <button onClick={this.startGame.bind(this)}>Start Game</button><br />

                </p>
                </div>
            </div>
        );
    }
}

App = connect((store) => {
    return store
})(App);


export default App;
