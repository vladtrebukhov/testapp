import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/LoginPage.js';
import Homepage from "./components/Homepage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: null,
            loginData: null,
            userLoggedIn: null,
            email: null,
            password: null
        };
    }
    render() {
        return (
            <div className="App">
                {!this.state.isLoggedIn ? <LoginPage loginError={this.state.loginError} isLoggedIn={this.state.isLoggedIn}/> : <Homepage />}
            </div>
        );
    }
}

export default App;
