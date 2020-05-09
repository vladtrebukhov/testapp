import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/LoginPage.js';
import Homepage from "./components/Homepage";

class App extends Component {
    state = {
        isLoggedIn: null,
        loginData: null,
        userLoggedIn: null,
        username: null,
        password: null
    };

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

    handleLogin = (username, password, event) => {
        event.preventDefault();
        this.checkRegisteredUser(username, password).then(response => {
            console.log(response)
            response === true ? this.setState({isLoggedIn: true}) : this.setState({isLoggedIn: false});
            });
    };

    checkRegisteredUser = async (username, password) => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    };

    render() {
        return (
            <div className="App">
                {!this.state.isLoggedIn ? <LoginPage isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/> : <Homepage />}
            </div>
        );
    }
}

export default App;
