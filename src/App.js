import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect} from "react-redux";
import {showTest} from "./actions/Actions";

class App extends Component {
    buttonClick() {
        this.props.dispatch(showTest("szoveg App.js-ben"));
    }
    render() {
        var storeValue = this.props.myApp.user.name || "ures a store";
        console.log(this.props);
        console.log("render lefutott");
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Helló Világ!</h2>
                </div>
                <p className="App-intro">
                    <label>{storeValue}</label>
                    <button onClick={this.buttonClick.bind(this)}>Gomb</button>
                </p>
            </div>
        );
    }
}

App = connect((store) => {
    return store
    // {
    //     myApp: store
    // }
})(App);


export default App;
