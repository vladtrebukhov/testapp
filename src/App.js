import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        loginData: null,
        userLoggedIn: null,
        username: null,
        password: null
    };

    componentDidMount() {
        this.getLoginData()
            .then(response => this.setState({loginData: response.loginData}))
            .catch(error => console.log(error));
    }

    getLoginData = async () => {
        const response = await fetch('/test');
        const body = response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    checkRegisteredUser = async event => {
        event.preventDefault();
        let loginCredentials = {
            username: this.state.username,
            password: this.state.password
        };

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(loginCredentials)
        });

        return response.json();
    };

    checkStatus = (res) => {
        if (res.ok) {
            return res.text();
        } else {
            throw Error(res.statusText);
        }
    };

    handleSubmit(event) {
        this.checkRegisteredUser(event).then(response => this.setState({
            userLoggedIn: response
        })).then(() => console.log(this.state.userLoggedIn));
    }

    render() {
        return (
            <div className="App">
                <p>{this.state.loginData}</p>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <p>
                        <strong>Login with your username and password:</strong>
                    </p>
                    <label htmlFor="username_input"></label>
                    <input id="username_input"type="text" onChange={event => this.setState({username: event.target.value})}
                    />
                    <label htmlFor="password_input"></label>
                    <input id="password_input" type="password" onChange={event => this.setState({password: event.target.value})}></input>
                    <button type="submit">Submit</button>
                </form>
                <p></p>
            </div>
        );
    }
}

export default App;
