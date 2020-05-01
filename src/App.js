import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/LoginPage.js';

class App extends Component {
    state = {
        isLoggedIn: false,
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

    //
    //
    // checkStatus = (res) => {
    //     if (res.ok) {
    //         return res.text();
    //     } else {
    //         throw Error(res.statusText);
    //     }
    // };

    render() {
        return (
            <div className="App">
                <LoginPage />
                {/*<p>{this.state.loginData}</p>*/}
                {/*{!this.state.isLoggedIn ?  <LoginPage /> : null}*/}
            </div>
        );
    }
}

export default App;
