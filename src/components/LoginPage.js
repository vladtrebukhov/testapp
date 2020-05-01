import React from 'react';
import './css/LoginPage.css';

let username;
let password;

export default function LoginPage() {
    function handleSubmit(event) {
        event.preventDefault();
        checkRegisteredUser(event).then(response => console.log(response));
    }

    async function checkRegisteredUser(event) {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        });

        return response.json();
    }

    return (
        <div className="mainContainer">
            <form className="loginForm" onSubmit={event => handleSubmit(event)}>
                <label className="usernameLabel" htmlFor="username_input">Username:</label>
                <input className="usernameInput" id="username_input"type="text" onChange={(event) => username = event.target.value}/>
                <label className="passwordLabel" htmlFor="password_input">Password:</label>
                <input className="passwordInput" id="password_input" type="password" onChange={(event) => password = event.target.value}/>
                <button className="loginButton">Login</button>
                {/*<button type="button" onClick={() => window.location = "/register"}>Register</button>*/}
                <a id="registerLink" href="/register">Register</a>
            </form>
        </div>)
}




