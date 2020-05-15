import React from 'react';
import './css/LoginPage.css';
import MainNavBar from './MainNavBar';
import Button from 'react-bootstrap/Button'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.username = null;
        this.password = null;
    }

    render() {
        return (
            <div>
                <MainNavBar/>
                <div className="mainContainer">
                    <form className="loginForm" onSubmit={event => this.props.handleLogin(this.username, this.password, event)}>
                        {this.props.isLoggedIn === false ? <div className="loginError">Login Error</div> : null}
                        <input className="usernameInput" id="username_input"type="text" placeholder="Username" onChange={(event) => this.username = event.target.value}/>
                        <input className="passwordInput" id="password_input" placeholder="Password" type="password" onChange={(event) => this.password = event.target.value}/>
                        <button className="loginButton">Login</button>
                        <a id="registerButton" href="/register">Register</a>
                    </form>
                </div>
            </div>
           )
    }
}




