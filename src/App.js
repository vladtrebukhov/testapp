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
            username: null,
            password: null
        };
    }

    componentDidMount() {
        this.getUserDataOnLogin()
            .then(response => this.setState({loginData: response.loginData}))
            .catch(error => console.log(error));
    }

    getUserDataOnLogin = async () => {
        const response = await fetch('/test');
        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    };

    render() {
        return (
            <div className="App">
                {!this.state.isLoggedIn ? <LoginPage loginError={this.state.loginError} isLoggedIn={this.state.isLoggedIn}/> : <Homepage />}
            </div>
        );
    }
}

export default App;
