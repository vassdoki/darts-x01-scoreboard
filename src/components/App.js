import React, { Component } from 'react';
import '../assets/App.css';

import {connect} from "react-redux";
import {insertScore, startGame} from "../actions/Actions";

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
        // var storeValue = this.props.darts.user.name || "ures a store";
        return (
            <div className="App">
                <p className="App-intro">
                    Num: <input name="num" id="num"/>
                    Mod: <input name="mod" id="mod"/>
                    <button onClick={this.addThrow.bind(this)}>Add Throw</button><br />
                    <button onClick={this.startGame.bind(this)}>Start Game</button><br />

                </p>
            </div>
        );
    }
}

App = connect((store) => {
    return store
})(App);


export default App;
